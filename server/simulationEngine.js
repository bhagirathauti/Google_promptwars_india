import fs from 'fs';
import path from 'path';

/**
 * Election Simulation Engine
 * A JSON-driven state machine for election processes.
 */
class SimulationEngine {
  constructor(configPath) {
    const rawData = fs.readFileSync(configPath);
    this.config = JSON.parse(rawData);
  }

  /**
   * Get content for a specific step
   * @param {string} stepId 
   * @returns {Object}
   */
  getStepContent(stepId) {
    const step = this.config.steps[stepId];
    if (!step) return null;
    return {
      id: step.id,
      title: step.title,
      description: step.description,
      fields: step.fields
    };
  }

  /**
   * Validate user input for a specific step
   * @param {string} stepId 
   * @param {Object} input 
   * @returns {Object} { isValid: boolean, errors: Array }
   */
  validateStep(stepId, input) {
    const step = this.config.steps[stepId];
    if (!step) return { isValid: false, errors: ["Step not found"] };

    const errors = [];
    
    step.validation.forEach(v => {
      const value = input[v.field];
      
      switch (v.rule) {
        case 'min':
          if (value < v.value) errors.push(v.message);
          break;
        case 'equals':
          if (value !== v.value) errors.push(v.message);
          break;
        case 'required':
          if (!value) errors.push(v.message);
          break;
        case 'regex':
          const re = new RegExp(v.value);
          if (!re.test(value)) errors.push(v.message);
          break;
        case 'type':
          if (typeof value !== v.value) errors.push(v.message);
          break;
      }
    });

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Determine the next step based on input and current step logic
   * @param {string} currentStepId 
   * @param {Object} input 
   * @returns {string|null} The ID of the next step or null if end
   */
  getNextStep(currentStepId, input) {
    const step = this.config.steps[currentStepId];
    if (!step || !step.next) return null;

    const { next } = step;

    if (next.type === 'linear') {
      return next.target;
    }

    if (next.type === 'branch') {
      const conditionValue = input[next.conditionField];
      // Convert to string to match keys "true"/"false" in JSON
      const branchKey = String(conditionValue);
      return next.branches[branchKey] || null;
    }

    if (next.type === 'end') {
      return null;
    }

    return null;
  }

  /**
   * Get the initial step ID
   */
  getInitialStep() {
    return this.config.initialStep;
  }
}

export default SimulationEngine;
