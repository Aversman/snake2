class Arena {
  constructor() {
    this.canvas = document.querySelector('#canvas')
    this.ctx = canvas.getContext("2d")
    this.arenaWidth = Number(this.canvas.width)
    this.arenaHeight = Number(this.canvas.height)
    this.objectsWeight = 20
    this.allArenaPoints = []

    for (let i = 0; i < (this.arenaWidth / this.objectsWeight); i++) {
      for (let j = 0; j < (this.arenaHeight / this.objectsWeight); j++) {
        this.allArenaPoints.push([i * this.objectsWeight, j * this.objectsWeight]);
      }
    }
    this.gridInit()
  }
  gridInit() {
    const grid = document.querySelector('#game-grid')
    grid.style.width = `${this.arenaWidth}px`
    grid.style.height = `${this.arenaHeight}px`
    grid.style.gridTemplateColumns = `repeat(${this.arenaWidth / this.objectsWeight}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${this.arenaHeight / this.objectsWeight}, 1fr)`
    for (let i = 0; i < ((this.arenaWidth / this.objectsWeight) * (this.arenaHeight / this.objectsWeight)); i++) {
      const div = document.createElement('div')
      grid.append(div)
    }
  }
}

class Food extends Arena {
  constructor(...args) {
    super(...args)
    this.foodColor = '#bf323b'
    this.foodX = 0
    this.foodY = 0
    this.scoreElement = document.querySelector('#game-toolbar-score-counter')
    this.snakeScore = 0
  }
  foodRender() {
    this.ctx.fillStyle = this.foodColor
    this.ctx.fillRect(this.foodX + (this.objectsWeight / 4), this.foodY + (this.objectsWeight / 4), this.objectsWeight / 2, this.objectsWeight / 2)
  }
  foodSpawn(snakeTail) {
    const foodX = Math.floor(Math.random() * (this.arenaWidth / this.objectsWeight)) * this.objectsWeight
    const foodY = Math.floor(Math.random() * (this.arenaHeight / this.objectsWeight)) * this.objectsWeight
    let flag = false
    for (let i = 0; i < snakeTail.length; i++) {
      if (foodX === snakeTail[i][0] && foodY === snakeTail[i][1]) {
        flag = true
        break
      }
    }
    if (flag) {
      this.foodSpawn(snakeTail)
    }else {
      this.foodX = foodX
      this.foodY = foodY
    }
  }
}

class Snake extends Food {
  constructor(...args) {
    super(...args)
    this.snakeColor = '#497174'
    this.snakeHeadColor = '#314647'
    this.snakeHeadX = Math.floor(this.arenaWidth / this.objectsWeight / 2) * this.objectsWeight
    this.snakeHeadY = Math.floor(this.arenaHeight / this.objectsWeight / 2) * this.objectsWeight
    this.snakeTail = [[this.snakeHeadX, this.snakeHeadY]]
    this.snakeDirection = 'left'
    this.snakeInit()
  }
  getSnakeStartPos() {
    this.snakeHeadX = Math.floor(this.arenaWidth / this.objectsWeight / 2) * this.objectsWeight
    this.snakeHeadY = Math.floor(this.arenaHeight / this.objectsWeight / 2) * this.objectsWeight
    this.snakeTail = [[this.snakeHeadX, this.snakeHeadY], [this.snakeHeadX + this.objectsWeight, this.snakeHeadY]]
    this.snakeDirection = 'left'
  }
  snakeRender() {
    this.snakeTail.forEach((elem, index) => {
      if (index === 0) {
        this.ctx.fillStyle = this.snakeHeadColor
        this.ctx.fillRect(elem[0] + (this.objectsWeight / 4), elem[1] + (this.objectsWeight / 4), this.objectsWeight / 2, this.objectsWeight / 2)
      }else {
        this.ctx.fillStyle = this.snakeColor
        this.ctx.fillRect(elem[0] + (this.objectsWeight / 4), elem[1] + (this.objectsWeight / 4), this.objectsWeight / 2, this.objectsWeight / 2)
      }
      if (index !== 0) {
        if (Math.abs(elem[1] - this.snakeTail[index - 1][1]) === 0) {
          if (elem[0] - this.snakeTail[index - 1][0] < 0) {
            this.ctx.fillStyle = this.snakeColor
            this.ctx.fillRect((elem[0] + this.objectsWeight / 2) + (this.objectsWeight / 4), (elem[1]) + (this.objectsWeight / 4), this.objectsWeight / 2, this.objectsWeight / 2)
          }else {
            this.ctx.fillStyle = this.snakeColor
            this.ctx.fillRect((elem[0] - this.objectsWeight / 2) + (this.objectsWeight / 4), (elem[1]) + (this.objectsWeight / 4), this.objectsWeight / 2, this.objectsWeight / 2)
          }
        }else if (Math.abs(elem[0] - this.snakeTail[index - 1][0]) === 0) {
          if (elem[1] - this.snakeTail[index - 1][1] < 0) {
            this.ctx.fillStyle = this.snakeColor
            this.ctx.fillRect((elem[0]) + (this.objectsWeight / 4), (elem[1] + this.objectsWeight / 2) + (this.objectsWeight / 4), this.objectsWeight / 2, this.objectsWeight / 2)
          }else {
            this.ctx.fillStyle = this.snakeColor
            this.ctx.fillRect((elem[0]) + (this.objectsWeight / 4), (elem[1] - this.objectsWeight / 2) + (this.objectsWeight / 4), this.objectsWeight / 2, this.objectsWeight / 2)
          }
        }
      }
    })
  }
  snakeMove() {
    if (this.snakeDirection === 'right') {
      this.snakeHeadX += this.objectsWeight
      this.snakeTail.pop()
      this.snakeTail.unshift([this.snakeHeadX, this.snakeHeadY])
    }
    else if (this.snakeDirection === 'left') {
      this.snakeHeadX -= this.objectsWeight
      this.snakeTail.pop()
      this.snakeTail.unshift([this.snakeHeadX, this.snakeHeadY])
    }
    else if (this.snakeDirection === 'top') {
      this.snakeHeadY -= this.objectsWeight
      this.snakeTail.pop()
      this.snakeTail.unshift([this.snakeHeadX, this.snakeHeadY])
    }
    else if (this.snakeDirection === 'bottom') {
      this.snakeHeadY += this.objectsWeight
      this.snakeTail.pop()
      this.snakeTail.unshift([this.snakeHeadX, this.snakeHeadY])
    }
    this.snakeRender()
  }
  isSnakeAteFood() {
    if (this.snakeHeadX === this.foodX && this.snakeHeadY === this.foodY) {
      this.snakeAddPoint()
      this.foodSpawn(this.snakeTail)
      this.snakeScore++
      this.scoreElement.innerHTML = this.snakeScore
      return true
    }
    return false
  }
  snakeAddPoint() {
    const lastSnakePoint = this.snakeTail[this.snakeTail.length - 1]
    const secondLastSnakePoint = this.snakeTail[this.snakeTail.length - 2]
    let x = lastSnakePoint[0]
    let y = lastSnakePoint[1]
    if (lastSnakePoint[0] === secondLastSnakePoint[0]) {
      y = lastSnakePoint[1] + (lastSnakePoint[1] - secondLastSnakePoint[1])
    }else if (lastSnakePoint[1] === secondLastSnakePoint[1]) {
      x = lastSnakePoint[0] + (lastSnakePoint[0] - secondLastSnakePoint[0])
    }
    this.snakeTail.push([x, y])
  }
  isSnakeHit() {
    if (this.snakeHeadX < 0 || this.snakeHeadX >= this.arenaWidth) {
      return true
    }
    if (this.snakeHeadY < 0 || this.snakeHeadY >= this.arenaHeight) {
      return true
    }
    for (let i = 1; i < this.snakeTail.length; i++) {
      if (this.snakeHeadX === this.snakeTail[i][0] && this.snakeHeadY === this.snakeTail[i][1]) {
        return true
      }
    }
    return false
  }
  snakeChangeDirection(direction) {
    if (this.snakeDirection === 'top' && direction === 'bottom') {
      return
    }
    if (this.snakeDirection === 'bottom' && direction === 'top') {
      return
    }
    if (this.snakeDirection === 'left' && direction === 'right') {
      return
    }
    if (this.snakeDirection === 'right' && direction === 'left') {
      return
    }
    this.snakeDirection = direction
  }
  snakeInit() {
    this.getSnakeStartPos()
    this.snakeAddPoint()
    this.foodSpawn(this.snakeTail)

    this.foodRender()
    this.snakeRender()
  }
}

class GamePolling extends Snake {
  constructor(...args) {
    super(...args)
    this.ai = new AI(this.arenaWidth, this.arenaHeight, this.objectsWeight)
    this.polling = null
    this.k = this.ai.parametrManager(this.snakeScore)
  }
  startGamePolling() {
    this.polling = setInterval(() => {
      if (
        this.isSnakeHit() ||
        this.snakeTail.length >= (((this.arenaWidth / this.objectsWeight) * (this.arenaHeight / this.objectsWeight)) - 1)
      ) {
        clearInterval(this.polling)
        return
      }

      this.isSnakeAteFood()
      this.k = this.ai.parametrManager(this.snakeScore)      
      this.snakeChangeDirection(this.ai.getDirectionByShortPath([this.snakeHeadX, this.snakeHeadY], this.ai.findShortPoint([this.snakeHeadX, this.snakeHeadY], [this.foodX, this.foodY], this.k), this.snakeDirection))

      this.ctx.clearRect(0, 0, this.arenaWidth, this.arenaHeight)
      this.foodRender()
      this.snakeMove()
    }, 5);
  }
  showHamiltonianPoints() {
    const path = this.ai.hamiltonianPoints
    let counter = 0
    const interval = setInterval(() => {
      if (counter === path.length - 1) {
        clearInterval(interval)
      }
      this.ctx.fillStyle = '#555'
      const points = path[counter].split(' ')
      this.ctx.fillRect(Number(points[0]), Number(points[1]), this.objectsWeight, this.objectsWeight)
      console.log(counter, path[counter])
      counter++
    }, 5)
  }
  renderPoints() {
    let currentPoint = [
      this.snakeHeadX,
      this.snakeHeadY
    ]
    setInterval(() => {
      const point = this.ai.findShortPoint(currentPoint, [this.foodX, this.foodY]).split(' ')
      currentPoint[0] = Number(point[0])
      currentPoint[1] = Number(point[1])
      this.ctx.fillStyle = 'gold'
      this.ctx.fillRect(currentPoint[0], currentPoint[1], this.objectsWeight, this.objectsWeight)
    }, 100)
  }
  stopPollong() {
    if (this.polling) {
      clearInterval(this.polling)
    }
  }
}