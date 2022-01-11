import Phaser from 'phaser'
import Level from './scenes/Level'
import Intro from './scenes/Intro'
import GameOver from './scenes/GameOver'
import Level_1 from './scenes/Level_1'
import Level_2 from './scenes/Level_2'
import Level_3 from './scenes/Level_3'
import Level_T from './scenes/Level_T'
import Cutscene_1 from './scenes/Cutscene_1'

const config = {
  pixelArt: true,
  width: 224,
  height: 256,
  zoom: 2,
  type: Phaser.AUTO,
  banner: { text: 'white', background: ['#847e87', '#696a6a', '#595652', '#222034', '#000000'] },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  title: 'Breakoid: Between Worlds',
  url: 'https://github.com/ytrms/jsnoid',
}

const game = new Phaser.Game(config)

game.scene.add('Intro', Intro)
game.scene.add('Level', Level)
game.scene.add('Level_T', Level_T)

game.scene.add('Level_1', Level_1)
game.scene.add('Level_2', Level_2)
game.scene.add('Level_3', Level_3)

game.scene.add('Cutscene_1', Cutscene_1)

game.scene.add('GameOver', GameOver)

game.scene.start('Level_1')