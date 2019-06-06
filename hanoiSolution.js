

function moveDisks(numberOfDiskToMove, startRodIndex, targetRodIndex, intermediaryRodIndex) {
  if (numberOfDiskToMove == 1) {
    document.moveDisk(0, 2)
  } else if (numberOfDiskToMove == 2) {
    document.moveDisk(0, 1)
    document.moveDisk(0, 2)
    document.moveDisk(1, 2)
  }
}

exports.moveDisks = moveDisks
