# VoteSmart Simulation 🗳️

An interactive, step-by-step simulation of the Indian election voting process. Experience the journey from identity verification to the VVPAT confirmation.

## Features
- **Multi-step Flow**: Guided simulation through Registration, Ink Marking, Polling Booth, EVM, and VVPAT.
- **Interactive EVM**: Digital twin of the Electronic Voting Machine with candidate selection and feedback.
- **AI Educational Insights**: Real-time explanations for each step powered by Google Gemini AI.
- **Modern UI**: Sleek, Material Design-inspired interface with smooth Framer Motion animations.
- **Progress Tracking**: User state persisted via Node.js/Express and Firebase.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Zustand, Framer Motion
- **Backend**: Node.js, Express
- **Database**: Firebase Firestore
- **AI**: Google Gemini API

## Project Structure
```
├── client/          # Vite + React Frontend
├── server/          # Node.js + Express Backend
└── shared/          # Shared constants and configurations
```

## Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- Firebase Account (for Firestore)
- Google AI Studio Key (for Gemini)

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key
   FIREBASE_SERVICE_ACCOUNT={"your_firebase_json_content"}
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Dummy Data
The simulation uses pre-configured candidates and polling booths located in `shared/constants.js`. You can modify these to customize the simulation.

## Project Details

### 1. Chosen Vertical
**Civic Technology / Educational Tech**
The focus is on demystifying complex democratic processes. By simulating the Indian election voting process, this project aims to provide an accessible, hands-on educational experience that reduces voter anxiety and increases civic literacy.

### 2. Approach and Logic
- **Step-by-Step Simulation Flow**: The process is broken down into linear, digestible steps (Registration $\rightarrow$ Verification $\rightarrow$ Voting $\rightarrow$ VVPAT confirmation). This mirrors the physical reality of a polling booth.
- **State Machine Driven**: The flow is controlled by a structured state machine (`shared/simulationEngineConfig.json`) that dictates the transition rules and validations required to move from one step to the next.
- **AI Integration**: Instead of static tooltips, Google Gemini AI acts as a dynamic guide. It generates contextual educational insights for the current step and explains specific errors when the user tries to proceed without fulfilling requirements.

### 3. How the Solution Works
1. **Frontend (React/Zustand)**: The user interface is a single-page application. Zustand manages the global state (current step, user selections). Framer Motion handles the smooth transitions between steps to keep the user engaged.
2. **Backend (Node/Express)**: Acts as a bridge. It manages the `SimulationEngine` validating step transitions and communicates with the Google Gemini API to fetch dynamic text.
3. **The User Journey**:
   - The user selects a Voter ID and Polling Booth.
   - The system simulates the physical "Ink Marking" process.
   - The user enters a digital polling booth where privacy is emphasized.
   - They interact with a digital Electronic Voting Machine (EVM) replica.
   - Upon voting, a simulated VVPAT (Voter Verifiable Paper Audit Trail) slip is "printed" for 7 seconds, completing the loop of trust.

### 4. Assumptions Made
- **Simplified Verification**: In reality, verification involves polling agents checking physical documents against electoral rolls. We assume a simplified dropdown selection for the sake of the simulation.
- **Local State Persistance**: We assume that for a single session, managing state via Zustand and local storage is sufficient, though Firebase is configured for potential broader analytics or multi-device tracking.
- **Static Configuration**: The candidates, parties, and polling booths are assumed to be static datasets defined in the `shared/` constants, rather than being fetched dynamically from a live database for this specific demo.

## License
MIT
