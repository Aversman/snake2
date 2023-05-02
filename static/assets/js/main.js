const playButtonElem = document.querySelector('#play-ai')
const previewElem = document.querySelector('.preview')

document.addEventListener("DOMContentLoaded", () => {
  playButtonElem.addEventListener('click', (event) => {
    event.preventDefault()
    previewElem.style.visibility = 'hidden'
    previewElem.style.opacity = '0'
    main()
  })
})

function getDirection(event) {
  if (event.code == 'KeyW') {
    return 'top'
  }else if (event.code == 'KeyA') {
    return 'left'
  }else if (event.code == 'KeyS') {
    return 'bottom'
  }else if (event.code == 'KeyD') {
    return 'right'
  }
}

function main() {
  const userControllerMode = false
  const game = new GamePolling()
  //game.showHamiltonianPoints()
  //console.log(game.ai.hamiltonianPoints);
  //game.renderPoint(20, 580)
  game.startGamePolling()
  //game.stopPollong()
  if (userControllerMode) {
    document.addEventListener('keydown', (event) => {
      game.snakeChangeDirection(getDirection(event))
    })
  }
}