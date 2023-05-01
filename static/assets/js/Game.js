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
    this.precentElement = document.querySelector('#game-toolbar-precent-counter')
    this.maxScoreElement = document.querySelector('#game-toolbar-max_score-counter')
    this.snakeScore = 0
  }
  foodRender() {
    this.ctx.fillStyle = this.foodColor
    this.ctx.fillRect(this.foodX + (this.objectsWeight / 4), this.foodY + (this.objectsWeight / 4), this.objectsWeight / 2, this.objectsWeight / 2)
  }
  foodSpawn(snakeTail) {
    // реализовать оптимальный поиск места для спавна яблок
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
    /* let aviablePlaces = []
    this.allArenaPoints.forEach(point => {
      snakeTail.forEach(tail => {
        if (tail[0] !== point[0] || tail[1] !== point[1]) {
          aviablePlaces.push([point[0], point[1]])
        }
      })
    })
    const newPlace = Math.floor(Math.random() * aviablePlaces.length)
    this.foodX = aviablePlaces[newPlace][0]
    this.foodY = aviablePlaces[newPlace][1] */
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
    this.snakeTail = [[this.snakeHeadX, this.snakeHeadY]]
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
    }
  }
  snakeAddPoint() {
    if (this.snakeDirection === 'right') {
      this.snakeHeadX += this.objectsWeight
      this.snakeTail.unshift([this.snakeHeadX, this.snakeHeadY])
    }
    else if (this.snakeDirection === 'left') {
      this.snakeHeadX -= this.objectsWeight
      this.snakeTail.unshift([this.snakeHeadX, this.snakeHeadY])
    }
    else if (this.snakeDirection === 'top') {
      this.snakeHeadY -= this.objectsWeight
      this.snakeTail.unshift([this.snakeHeadX, this.snakeHeadY])
    }
    else if (this.snakeDirection === 'bottom') {
      this.snakeHeadY += this.objectsWeight
      this.snakeTail.unshift([this.snakeHeadX, this.snakeHeadY])
    }
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
  }
  startGamePolling() {
    this.polling = setInterval(() => {
      if (this.isSnakeHit()) {
        clearInterval(this.polling)
        return
      }
      this.snakeChangeDirection(this.ai.getDirection([this.foodX, this.foodY], [this.snakeHeadX, this.snakeHeadY], this.snakeDirection))
      this.ctx.clearRect(0, 0, this.arenaWidth, this.arenaHeight)
      this.isSnakeAteFood()
      this.foodRender()
      this.snakeMove()
    }, 10);
  }
  showHamiltonianPoints() {
    let counter = 0
    setInterval(() => {
      this.ctx.fillStyle = '#555'
      const points = this.ai.hamiltonianPoints[counter].split(' ')
      this.ctx.fillRect(Number(points[0]), Number(points[1]), this.objectsWeight, this.objectsWeight)
      console.log(counter, this.ai.hamiltonianPoints[counter])
      counter++
    }, 200)
  }
  renderPoint(x, y) {
    this.ctx.fillStyle = 'gold'
    this.ctx.fillRect(x, y, this.objectsWeight, this.objectsWeight)
  }
  stopPollong() {
    if (this.polling) {
      clearInterval(this.polling)
    }
  }
}