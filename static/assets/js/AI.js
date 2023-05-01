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
  getDirection(foodCoords, headCoords, headDirection) {
    let coords = []
    const currentHamiltonianPoint = this.hamiltonianPoints.indexOf(`${headCoords[0]} ${headCoords[1]}`)
    if (headDirection === 'left') {
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0] - this.objectsWeight, 2) + Math.pow(foodCoords[1] - headCoords[1], 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0] - this.objectsWeight} ${headCoords[1]}`),
        direction: 'left'
      })
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0], 2) + Math.pow(foodCoords[1] - headCoords[1] - this.objectsWeight, 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0]} ${headCoords[1] - this.objectsWeight}`),
        direction: 'top'
      })
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0], 2) + Math.pow(foodCoords[1] - headCoords[1] + this.objectsWeight, 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0]} ${headCoords[1] + this.objectsWeight}`),
        direction: 'bottom'
      })
    }
    else if (headDirection === 'right') {
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0] + this.objectsWeight, 2) + Math.pow(foodCoords[1] - headCoords[1], 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0] + this.objectsWeight} ${headCoords[1]}`),
        direction: 'right'
      })
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0], 2) + Math.pow(foodCoords[1] - headCoords[1] - this.objectsWeight, 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0]} ${headCoords[1] - this.objectsWeight}`),
        direction: 'top'
      })
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0], 2) + Math.pow(foodCoords[1] - headCoords[1] + this.objectsWeight, 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0]} ${headCoords[1] + this.objectsWeight}`),
        direction: 'bottom'
      })
    }
    else if (headDirection === 'top') {
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0], 2) + Math.pow(foodCoords[1] - headCoords[1] - this.objectsWeight, 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0]} ${headCoords[1] - this.objectsWeight}`),
        direction: 'top'
      })
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0] - this.objectsWeight, 2) + Math.pow(foodCoords[1] - headCoords[1], 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0] - this.objectsWeight} ${headCoords[1]}`),
        direction: 'left'
      })
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0] + this.objectsWeight, 2) + Math.pow(foodCoords[1] - headCoords[1], 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0] + this.objectsWeight} ${headCoords[1]}`),
        direction: 'right'
      })
    }
    else if (headDirection === 'bottom') {
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0], 2) + Math.pow(foodCoords[1] - headCoords[1] + this.objectsWeight, 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0]} ${headCoords[1] + this.objectsWeight}`),
        direction: 'bottom'
      })
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0] - this.objectsWeight, 2) + Math.pow(foodCoords[1] - headCoords[1], 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0] - this.objectsWeight} ${headCoords[1]}`),
        direction: 'left'
      })
      coords.push({
        appleDistance: Math.floor(Math.sqrt(Math.pow(foodCoords[0] - headCoords[0] + this.objectsWeight, 2) + Math.pow(foodCoords[1] - headCoords[1], 2))),
        hamiltonianPoint: this.hamiltonianPoints.indexOf(`${headCoords[0] + this.objectsWeight} ${headCoords[1]}`),
        direction: 'right'
      })
    }
    let direction = null
    for (let i = 0; i < coords.length; i++) {
      if (coords[i].hamiltonianPoint - currentHamiltonianPoint === 1 || coords[i].hamiltonianPoint === 0) {
        direction = coords[i].direction
        break
      }
    }
    console.log(currentHamiltonianPoint, coords, direction);
    return direction
  }
}