import Phaser from 'phaser'
import Game from './scenes/Game'

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
  }
}

const game = new Phaser.Game(config)

game.scene.add('game', Game)

game.scene.start('game')