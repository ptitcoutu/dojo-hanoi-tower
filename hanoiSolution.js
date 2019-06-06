

function moveDisks(numberOfDiskToMove, startRodIndex, targetRodIndex, intermediaryRodIndex) {
  document.moveDisk(0, 1)
  document.moveDisk(0, 2)
  document.moveDisk(1, 2)
}

exports.moveDisks = moveDisks
