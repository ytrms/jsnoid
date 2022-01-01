import Phaser from 'phaser'
import Game from './scenes/Game'

const config = {
  width: 504,
  height: 672,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
}

const game = new Phaser.Game(config)

game.scene.add('game', Game)

game.scene.start('game')