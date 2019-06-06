// Import stylesheets
import './style.css';
import { moveDisksRecursively } from './recursiveSolution.js';
import { moveDisks } from './hanoiSolution.js';
import { getDisksCount } from './hanoiPlay.js'
import { check } from './hanoiSolutionCheck.js'

function solve() {
  moveDisks(getDisksCount(), 0, 2, 1);
  check();
}

document.solve = solve;

