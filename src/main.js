import Phaser from 'phaser'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'

const config = {
  pixelArt: true,
  width: 224,
  height: 256,
  zoom: 2,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  title: 'JSnoid',
  url: 'https://github.com/ytrms/jsnoid',
}

const game = new Phaser.Game(config)

game.scene.add('Game', Game)
game.scene.add('GameOver', GameOver)

game.scene.start('Game')