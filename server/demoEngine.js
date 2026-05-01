import SimulationEngine from './simulationEngine.js';
import path from 'path';

const engine = new SimulationEngine(path.resolve('../shared/simulationEngineConfig.json'));

console.log("--- Election Simulation Engine Demo ---");

// 1. Initial Step
const start = engine.getInitialStep();
console.log(`Starting Step: ${start}`);

// 2. Validate Eligibility (Invalid)
const invalidInput = { age: 16, citizenship: 'Foreign' };
const result1 = engine.validateStep('eligibility_check', invalidInput);
console.log("\nTesting Eligibility (Invalid):", result1.errors);

// 3. Validate Eligibility (Valid)
const validInput = { age: 25, citizenship: 'Indian' };
const result2 = engine.validateStep('eligibility_check', validInput);
console.log("Testing Eligibility (Valid):", result2.isValid ? "Success" : "Failed");

// 4. Branching Logic (Not Registered)
const notRegisteredInput = { isRegistered: false };
const nextStepNotReg = engine.getNextStep('voter_registration', notRegisteredInput);
console.log("\nBranching (Not Registered): Next step is", nextStepNotReg);

// 5. Branching Logic (Registered)
const registeredInput = { isRegistered: true };
const nextStepReg = engine.getNextStep('voter_registration', registeredInput);
console.log("Branching (Registered): Next step is", nextStepReg);
