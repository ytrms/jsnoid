import Game from './Game'
import Phaser from 'phaser'

export default class Level_1 extends Game {
  create() {
    super.create()
    console.log("I'm in Level_1!");
  }
}