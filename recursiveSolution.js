function moveDisksRecursively(numberOfDiskToMove, startRodIndex, targetRodIndex, intermediaryRodIndex) {
  if (numberOfDiskToMove == 1) {
    document.moveDisk(startRodIndex, targetRodIndex)
  } else {
    moveDisksRecursively(numberOfDiskToMove-1, startRodIndex, intermediaryRodIndex, targetRodIndex);
    document.moveDisk(startRodIndex, targetRodIndex);
    moveDisksRecursively(numberOfDiskToMove-1, intermediaryRodIndex, targetRodIndex,startRodIndex);
  }
}

exports.moveDisksRecursively = moveDisksRecursively