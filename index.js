// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Hanoi Tower</h1>`;

var rods = [[0, 1, 2, 3, 4], [], []];
var diskRods = [0, 0, 0, 0, 0];
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
      var translationX = 169 * rodIndex;
      var translationY = -16 * (newRod.length - 1);
      previousSelectedDisk.setAttribute('transform', `translate(${translationX},${translationY})`);
      deselectPreviouslySelectedDisk();
    }
  }
}
function deselectPreviouslySelectedDisk() {
  if (previousSelectedDisk) {
    previousSelectedDisk.style.opacity = 1
    previousSelectedDisk = null;
  }
}

document.selectDisk = selectDisk
document.putOnRod = putOnRod
