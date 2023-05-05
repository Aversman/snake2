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
  parametrManager(snakeScore) {
    if (snakeScore < 30) {
      return 1000
    }
    else if (snakeScore < 150) {
      return 50
    }
    else if (snakeScore < 335) {
      return 35
    }
    else if (snakeScore < 675) {
      return 25
    }
    else if (snakeScore < 700) {
      return 10
    }
    return 1
  }
  // Жадный алгоритм для поиска допустимого оптимальной точки.
  // Алгоритм придерживается Гамильтонова цикла, сокращая его
  // k - параметр сокращения.
  // Если k = 1, то змейка обходит полный гамильтонов цикл
  // Чем больше параметр, тем она сильнее сокращает
  findShortPoint(headCoords, foodCoords, k) {
    let currentPosition = `${headCoords[0]} ${headCoords[1]}`
    const currentPoint = currentPosition.split(' ')
    const currentPointHamiltonianNumber = this.hamiltonianPoints.indexOf(currentPosition)
    const ways = [
      `${1 * currentPoint[0] - this.objectsWeight} ${currentPoint[1]}`,
      `${1 * currentPoint[0] + this.objectsWeight} ${currentPoint[1]}`,
      `${currentPoint[0]} ${1 * currentPoint[1] - this.objectsWeight}`,
      `${currentPoint[0]} ${1 * currentPoint[1] + this.objectsWeight}`,
    ]
    const rightWays = []
    let answer = null
    ways.forEach(point => {
      const pointCoords = point.split(' ')
      if (
          (this.hamiltonianPoints.indexOf(point) > currentPointHamiltonianNumber) &&
          (Math.abs(this.hamiltonianPoints.indexOf(point) - currentPointHamiltonianNumber) <= k) ||
          (this.hamiltonianPoints.indexOf(point) === 0)
        ) {
          rightWays.push([
            point,
            Math.sqrt(Math.pow((1 * pointCoords[0] - foodCoords[0]), 2) + Math.pow((1 * pointCoords[1] - foodCoords[1]), 2))
          ])
      }
    })
    let minDistance = rightWays[0][1]
    answer = rightWays[0][0]
    for (let i = 0; i < rightWays.length; i++) {
      if (rightWays[i][1] < minDistance) {
        answer = rightWays[i][0]
        minDistance = rightWays[i][1]
      }
    }
    answer = answer.split(' ')
    return [Number(answer[0]), Number(answer[1])]
  }
  getDirectionByShortPath(headCoords, nextPoint, currentDirection) {
    if (currentDirection === 'right') {
      if (headCoords[1] - nextPoint[1] === 0) {
        return 'right'
      }
      else if (headCoords[1] - nextPoint[1] > 0) {
        return 'top'
      }
      else if (headCoords[1] - nextPoint[1] < 0) {
        return 'bottom'
      }
    }
    if (currentDirection === 'left') {
      if (headCoords[1] - nextPoint[1] === 0) {
        return 'left'
      }
      else if (headCoords[1] - nextPoint[1] > 0) {
        return 'top'
      }
      else if (headCoords[1] - nextPoint[1] < 0) {
        return 'bottom'
      }
    }
    if (currentDirection === 'top') {
      if (headCoords[0] === 0 && headCoords[1] === 0) {
        return 'right'
      }
      if (headCoords[0] - nextPoint[0] === 0) {
        return 'top'
      }
      else if (headCoords[0] - nextPoint[0] > 0) {
        return 'left'
      }
      else if (headCoords[0] - nextPoint[0] < 0) {
        return 'right'
      }
    }
    if (currentDirection === 'bottom') {
      if (headCoords[0] - nextPoint[0] === 0) {
        return 'bottom'
      }
      else if (headCoords[0] - nextPoint[0] > 0) {
        return 'left'
      }
      else if (headCoords[0] - nextPoint[0] < 0) {
        return 'right'
      }
    }
  }
}