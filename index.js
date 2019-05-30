// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Hanoi Tower</h1>`;
const allDisks = [0,1,2,3,4]
var diskCount = allDisks.length;
var rods = [allDisks, [], []];
var diskRods = allDisks.map((diskIndex) => 0);
var previousSelectedDisk = null;

function selectDisk(disk) {
  var diskSize = itemIndex(disk);
  var diskRod = diskRods[diskSize];
  console.log("selection", disk, disk.id, diskSize);

  if (previousSelectedDisk !== disk && rods[diskRod].indexOf(diskSize) === rods[diskRod].length - 1) {
    deselectPreviouslySelectedDisk();
    disk.style.opacity = 0.5;
    previousSelectedDisk = disk;
  } else {
    deselectPreviouslySelectedDisk();
  }
}
function itemIndex(item) {
  return parseInt(item.attributes['x-data'].value);
}
function putOnRod(rod) {
  var rodIndex = itemIndex(rod);
  if (previousSelectedDisk) {
    var newRod = rods[rodIndex];
    var diskIndex = itemIndex(previousSelectedDisk);
    if (newRod.length === 0 || newRod[newRod.length - 1] < diskIndex) {
      var previousSelectedDiskIndex = itemIndex(previousSelectedDisk);
      var previousRod = rods[diskRods[previousSelectedDiskIndex]];
      newRod.push(previousRod.pop());
      diskRods[previousSelectedDiskIndex] = rodIndex;
      displayDisksOnRod(rodIndex);
      deselectPreviouslySelectedDisk();
      addStepToSteps(JSON.stringify(rods) + "\n")
    }
  }
}
function deselectPreviouslySelectedDisk() {
  if (previousSelectedDisk) {
    previousSelectedDisk.style.opacity = 1
    previousSelectedDisk = null;
  }
}
function playStep(stepIndex) {
  rods = gameSteps[stepIndex];
  displayDisksOnRod(0);
  displayDisksOnRod(1);
  displayDisksOnRod(2);
  stepIndex++;
  if (stepIndex < gameSteps.length) {
    setTimeout(() => {
      playStep(stepIndex);
    }, 500);
  }
}
var gameSteps
function replay() {
  var scenario = getStepsValue();
  gameSteps = JSON.parse("[" + scenario.replace(/\n/g, ',') + "]");
  playStep(0);
}

function reset() {
  var visibleDisks = allDisks.filter((diskIndex)=> diskIndex<diskCount)
  rods = [visibleDisks, [], []];
  diskRods = rods[0].map((disk) => 0);
  displayDisksOnRod(0);
  allDisks.forEach((diskIndex) => {
    var disk = getDisk(diskIndex);
    disk.setAttribute("visibility","hidden")
  });
  visibleDisks.forEach((diskIndex) => {
    var disk = getDisk(diskIndex);
    disk.setAttribute("visibility","visible")
  });
  deselectPreviouslySelectedDisk();
  changeStepsValue('[[' + visibleDisks.join(',') + '],[],[]]\n');
}

function displayDisksOnRod(rodIndex) {
  var rodConfiguration = rods[rodIndex];
  var diskPosition = 0;
  rodConfiguration.forEach((diskIndex) => {
    var translationX = 169 * rodIndex;
    var translationY = -16 * diskPosition;
    var disk = getDisk(diskIndex);
    disk.setAttribute('transform', `translate(${translationX},${translationY})`);
    diskPosition++;
  })
}

function getDisk(diskIndex) {
  return document.getElementById("disk_" + diskIndex)
}

function changeStepsValue(value) {
  document.getElementById("steps").value = value;
}

function addStepToSteps(valueToAdd) {
  changeStepsValue(getStepsValue() + valueToAdd)
}

function getStepsValue() {
  return document.getElementById("steps").value
}

function solve() {
  alert('solve to implement');
}

function initHanoi(diskCountSelector) {
    diskCount = diskCountSelector.selectedIndex+1;
    reset();
}

document.initHanoi = initHanoi;
document.selectDisk = selectDisk;
document.putOnRod = putOnRod;
document.replay = replay;
document.reset = reset;
document.solve = solve;
