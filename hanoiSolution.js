

function moveDisks(numberOfDiskToMove, startRodIndex, targetRodIndex, intermediaryRodIndex) {
 if (numberOfDiskToMove == 1) {
   document.moveDisk(startRodIndex, targetRodIndex)
 } else if (numberOfDiskToMove == 2) {
   document.moveDisk(startRodIndex, intermediaryRodIndex)
   document.moveDisk(startRodIndex, targetRodIndex)
   document.moveDisk(intermediaryRodIndex, targetRodIndex)
 } else if (numberOfDiskToMove == 3) {
   moveDisks(2,0,1,2)
   document.moveDisk(startRodIndex, targetRodIndex)
   moveDisks(2,1,2,0)
 }
}

exports.moveDisks = moveDisks
