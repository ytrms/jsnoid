import Level from './Level'
import Phaser from 'phaser'

export default class Level_1 extends Level {
  create() {
    super.create()
    console.log("I'm in Level_1!");
  }
}