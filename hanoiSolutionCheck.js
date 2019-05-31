import { getSolutionSteps } from './hanoiPlay';
import { getDisksCount } from './hanoiPlay';

function check() {
  try {
    changeCheckMessages('');
    let steps = getSolutionSteps();
    if (checkSteps(steps) &&
      checkNumberOfSteps(steps) &&
      checkAllDiskOnThirdRodInLastStep(steps)) {
      indicateCheckedRule('you found a solution');
    } else {
      indicateError('try again')
    }
  } catch (error) {
    indicateError(`syntax error in your solution : ${error}`);
  }
}

function checkNumberOfSteps(steps) {
  const minimalNumberOfSteps = Math.pow(2, getDisksCount())-1;
  const numberOfSteps = steps.length-1; // the first position is not a step
  if (numberOfSteps == minimalNumberOfSteps) {
    indicateCheckedRule(`number of steps is minimal : ${minimalNumberOfSteps}`);
    return true;
  } else if (numberOfSteps > minimalNumberOfSteps) {
    indicateError(`number of steps ${numberOfSteps} greater than ${minimalNumberOfSteps}`);
    return false;
  } else {
    indicateError(`number of steps ${numberOfSteps} lower than ${minimalNumberOfSteps}`);
    return false;
  }
}

function checkAllDiskOnThirdRodInLastStep(steps) {
  let lastRodsConf = steps[steps.length - 1];
  if (lastRodsConf[0].length == 0 && lastRodsConf[1].length == 0 && lastRodsConf[2].length == getDisksCount()) {
    indicateCheckedRule('all disks are on the last rod');
    return true;
  } else {
    indicateError('you should have all disks on the last rod');
    return false;
  }
}

function checkSteps(steps) {
  let stepBefore = steps[0];
  let allStepAreOK = true;
  steps.forEach((step) => {
    let rodsPreviousConf = stepBefore;
    let rodsConf = step;
    if (checkDiffWithPreviousStep(rodsPreviousConf, rodsConf) && checkCorrectOrder(rodsConf)) {
      indicateCheckedRule('only one move and above no or bigger disk')
    } else {
      allStepAreOK = false
    }
    stepBefore = step;
  });
  return allStepAreOK;
}

function checkDiffWithPreviousStep(rodsPreviousConf, rodsConf) {
  let numberOfDiffs = getNumberOfDiffs(rodsConf[0], rodsPreviousConf[0]) +
    getNumberOfDiffs(rodsConf[1], rodsPreviousConf[1]) + getNumberOfDiffs(rodsConf[2], rodsPreviousConf[2]);
  if (numberOfDiffs > 1) {
    indicateError("there's more than one move for this step")
    return false;
  }
  return true;
}

function checkCorrectOrder(rodsConf) {
  let wrongOrderRods = rodsConf.filter((rodConf) => {
    if (rodConf.length == 0) {
      return false;
    } else {
      let previousDisk = -1; // this value is below any disk at the begining
      let isInCorrectOrder = rodConf.reduce((isInCorrectOrder, disk) => {
        return isInCorrectOrder && disk > previousDisk
      }, true); // second value is the first isInCorrectOrder value
      return !isInCorrectOrder;
    }
  });
  if (wrongOrderRods.length > 0) {
    indicateError(`the disks of rods ${wrongOrderRods.join(',')} are not in the correct order`);
    return false;
  } else {
    return true;
  }
}

function getNumberOfDiffs(rod1, rod2) {
  let rod1Length = rod1.length;
  let rod2Length = rod2.length;
  let minLength = Math.min(rod1Length, rod2Length);
  let maxLength = Math.max(rod1Length, rod2Length);
  let nbDiff = maxLength - minLength;
  for (let i = 0; i < minLength; i++) {
    nbDiff += (rod1[i] == rod2[i]) ? 0 : 1;
  }
}

function indicateCheckedRule(rule) {
  addCheckMessage('OK : ' + rule);
}

function indicateError(error) {
  addCheckMessage('Error : ' + error);
}

function initCheckMessages() {
  changeCheckMessages('OK');
}

function addCheckMessage(msg) {
  changeCheckMessages(getCheckMessages() + msg + '\n')
}

function getCheckMessages() {
  return getStepsCheckElement().value;
}

function changeCheckMessages(msg) {
  getStepsCheckElement().value = msg;
}

function getStepsCheckElement() {
  return document.getElementById("stepsCheck");
}

exports.check = check;
document.check = check;