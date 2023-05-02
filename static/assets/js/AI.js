class AI {
  constructor(arenaWidth, arenaHeight, objectsWeight) {
    this.arenaWidth = arenaWidth
    this.arenaHeight = arenaHeight
    this.objectsWeight = objectsWeight
    this.hamiltonianPoints = this.hamiltonianCycleInit()
  }
  hamiltonianCycleInit() {
    let currentPosX = 0
    let currentPosY = 0 
    let result = []
    for (let i = 0; i < this.arenaHeight / this.objectsWeight; i++) {
      for (let j = 0; j < this.arenaWidth / this.objectsWeight; j++) {
        result.push(`${currentPosX} ${currentPosY}`)
        if (currentPosX - this.objectsWeight === 0 && currentPosY + this.objectsWeight === this.arenaHeight) {
          currentPosX -= this.objectsWeight
          result.push(`${currentPosX} ${currentPosY}`)
          break
        }
        if (i % 2 === 0) {
          if (currentPosX + this.objectsWeight < this.arenaWidth) {
            currentPosX += this.objectsWeight
          }else {
            currentPosY += this.objectsWeight
            break
          }
        }else {
          if (currentPosX - this.objectsWeight > 0) {
            currentPosX -= this.objectsWeight
          }else {
            currentPosY += this.objectsWeight
            break
          }
        }
      }
    }
    for (let i = 0; i < this.arenaHeight / this.objectsWeight; i++) {
      if (currentPosX === 0 && currentPosY - this.objectsWeight > 0) {
        currentPosY -= this.objectsWeight
        result.push(`${currentPosX} ${currentPosY}`)
      }
    }
    return result
  }
  getDirection(headCoords) {
    const currentHamiltonianPoint = this.hamiltonianPoints.indexOf(`${headCoords[0]} ${headCoords[1]}`)
    const hamiltonianPointOnTheTop = this.hamiltonianPoints.indexOf(`${headCoords[0]} ${headCoords[1] - this.objectsWeight}`)
    const hamiltonianPointOnTheBottom = this.hamiltonianPoints.indexOf(`${headCoords[0]} ${headCoords[1] + this.objectsWeight}`)
    const hamiltonianPointOnTheLeft = this.hamiltonianPoints.indexOf(`${headCoords[0] - this.objectsWeight} ${headCoords[1]}`)
    const hamiltonianPointOnTheRight = this.hamiltonianPoints.indexOf(`${headCoords[0] + this.objectsWeight} ${headCoords[1]}`)
    if (hamiltonianPointOnTheTop === currentHamiltonianPoint + 1 || hamiltonianPointOnTheTop === 0) {
      return 'top'
    }
    if (hamiltonianPointOnTheBottom === currentHamiltonianPoint + 1 || hamiltonianPointOnTheTop === 0) {
      return 'bottom'
    }
    if (hamiltonianPointOnTheLeft === currentHamiltonianPoint + 1 || hamiltonianPointOnTheTop === 0) {
      return 'left'
    }
    if (hamiltonianPointOnTheRight === currentHamiltonianPoint + 1 || hamiltonianPointOnTheTop === 0) {
      return 'right'
    }
  }
}