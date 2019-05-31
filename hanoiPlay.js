const allDisks = [0, 1, 2, 3, 4]
var disksCount = allDisks.length;
var rods = [allDisks, [], []];
var diskRods = allDisks.map((diskIndex) => 0);
var previousSelectedDisk = null;
var solutionSteps

function initConfiguration(rodsConf) {
  rods = rodsConf;
  var rodIndex = 0;
  rods.forEach((rodConfiguration) => {
    rodConfiguration.forEach((diskIndex) => {
      diskRods[diskIndex] = rodIndex;
    });
    rodIndex++;
  })
}

function initHanoi(disksCountSelector) {
  disksCount = disksCountSelector.selectedIndex + 1;
  reset();
}

function getDisksCount() {
  return disksCount;
}

function reset() {
  var visibleDisks = allDisks.filter((diskIndex) => diskIndex < disksCount)
  rods = [visibleDisks, [], []];
  diskRods = rods[0].map((disk) => 0);
  displayDisksOnRod(0);
  allDisks.forEach((diskIndex) => {
    var disk = getDisk(diskIndex);
    disk.setAttribute("visibility", "hidden")
  });
  visibleDisks.forEach((diskIndex) => {
    var disk = getDisk(diskIndex);
    disk.setAttribute("visibility", "visible")
  });
  deselectPreviouslySelectedDisk();
  changeStepsValue('[[' + visibleDisks.join(',') + '],[],[]]');
}

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
  putOnRodWithIndex(rodIndex)
}

function putOnRodWithIndex(rodIndex) {
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
      addStepToSteps('\n' + JSON.stringify(rods))
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
  initConfiguration(solutionSteps[stepIndex]);
  displayDisksOnRod(0);
  displayDisksOnRod(1);
  displayDisksOnRod(2);
  stepIndex++;
  if (stepIndex < solutionSteps.length) {
    setTimeout(() => {
      playStep(stepIndex);
    }, 500);
  }
}

function replay() {
  solutionSteps = getSolutionSteps();
  playStep(0);
}

function getSolutionSteps() {
  return JSON.parse("[" + getStepsValue().replace(/\n/g, ',') + "]");
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

function moveDisk(startRodIndex, targetRodIndex) {
  selectDiskOnTopOfRod(startRodIndex);
  putOnRodWithIndex(targetRodIndex);
}

function selectDiskOnTopOfRod(rodIndex) {
  var rod = rods[rodIndex];
  var diskIndex = rod[rod.length - 1];
  var disk = getDisk(diskIndex);
  selectDisk(disk);
}

exports.getDisksCount = getDisksCount
exports.getSolutionSteps = getSolutionSteps;

document.initHanoi = initHanoi;
document.selectDisk = selectDisk;
document.putOnRod = putOnRod;
document.replay = replay;
document.reset = reset;
document.moveDisk = moveDisk
