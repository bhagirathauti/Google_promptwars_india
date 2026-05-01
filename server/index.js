import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { db } from './firebase.js';
import { getEducationalInsight, explainError, askElectionAssistant } from './gemini.js';
import { SIMULATION_STEPS, CANDIDATES, POLLING_BOOTHS } from '../shared/constants.js';
import SimulationEngine from './simulationEngine.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const engine = new SimulationEngine(path.join(__dirname, '../shared/simulationEngineConfig.json'));

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'", "https://maps.googleapis.com"],
      "img-src": ["'self'", "data:", "https://maps.gstatic.com", "https://*.googleapis.com"],
      "connect-src": ["'self'", "https://*.googleapis.com"]
    }
  },
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use('/api/', limiter);

// Restrict CORS in production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
  'https://votesmart-sim-1092621834519.us-central1.run.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many requests to the AI assistant, please try again later." }
});

// --- AI Assistant Routes ---

// Chatbot Endpoint (Simulated Streaming)
app.post('/api/ask-ai', aiRateLimiter, async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question is required" });

  try {
    const result = await askElectionAssistant(question);
    res.json({ answer: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Explain Error Endpoint
app.post('/api/explain-error', aiRateLimiter, async (req, res) => {
  const { step, error } = req.body;
  if (!step || !error) return res.status(400).json({ error: "Step and Error are required" });
  
  try {
    const explanation = await explainError(step, error);
    res.json({ explanation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Simulation Engine API Routes ---

app.get('/api/engine/step/:stepId', (req, res) => {
  const content = engine.getStepContent(req.params.stepId);
  if (!content) return res.status(404).json({ error: "Step not found" });
  res.json(content);
});

app.post('/api/engine/next', (req, res) => {
  const { currentStepId, input } = req.body;
  const validation = engine.validateStep(currentStepId, input);
  
  if (!validation.isValid) {
    return res.status(400).json({ errors: validation.errors });
  }

  const nextStepId = engine.getNextStep(currentStepId, input);
  res.json({ nextStepId, success: true });
});

app.get('/api/engine/start', (req, res) => {
  res.json({ initialStep: engine.getInitialStep() });
});

// --- Existing Simulation Routes ---

app.get('/api/config', (req, res) => {
  res.json({
    steps: SIMULATION_STEPS,
    candidates: CANDIDATES,
    booths: POLLING_BOOTHS
  });
});

app.get('/api/insight/:stepId', aiRateLimiter, async (req, res) => {
  const { stepId } = req.params;
  const insight = await getEducationalInsight(stepId);
  res.json({ insight });
});

app.post('/api/progress', async (req, res) => {
  const { sessionId, stepIndex, data } = req.body;
  
  // Sanitize sessionId to prevent path traversal (alphanumeric only)
  if (!sessionId || !/^[a-zA-Z0-9-]+$/.test(sessionId)) {
    return res.status(400).json({ error: "Invalid Session ID" });
  }

  if (!db) return res.status(200).json({ message: "Mock success" });

  const allowedData = {};
  if (data && typeof data === 'object') {
    const allowedKeys = ['voterId', 'boothId', 'selectedCandidate'];
    allowedKeys.forEach(key => {
      if (data[key] !== undefined) allowedData[key] = data[key];
    });
  }

  try {
    await db.collection('simulations').doc(sessionId).set({
      lastStep: stepIndex,
      updatedAt: new Date().toISOString(),
      ...allowedData
    }, { merge: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Polling Booth Lookup
app.get('/api/booth-lookup', (req, res) => {
  let { pincode } = req.query;
  if (!pincode) return res.status(400).json({ error: "Pincode is required" });

  // Ensure pincode is a string and alphanumeric
  pincode = String(pincode).replace(/[^a-zA-Z0-9]/g, '');

  const booth = POLLING_BOOTHS.find(b => b.pincodes.includes(pincode));
  if (booth) {
    res.json(booth);
  } else {
    res.status(404).json({ error: "No polling booth found for this pincode." });
  }
});

// Serve frontend static files in production
const frontendPath = path.join(__dirname, '../client/dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
