import Phaser from 'phaser'
import fontpng from './../assets/IBM_VGA_9x8_0.png'
import fontxml from './../assets/IBM_VGA_9x8.xml'
import gameWinSound from './../assets/gameWin.wav'
import gameLoseSound from './../assets/gameLose.wav'

export default class GameOver extends Phaser.Scene {
  init(data) {
    this.score = data.score
    this.status = data.status
  }


  preload() {
    this.load.audio("gameWinSound", gameWinSound)
    this.load.audio("gameLoseSound", gameLoseSound)
    this.load.bitmapFont('ibm_vga', fontpng, fontxml)
  }

  create() {
    this.gameWinSound = this.sound.add("gameWinSound", { loop: false })
    this.gameLoseSound = this.sound.add("gameLoseSound", { loop: false })

    this.status === "WON" ? this.statusText = "YOU WON!" : this.statusText = "GAME OVER"

    this.gameOverText = this.add.bitmapText(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'ibm_vga',
      `${this.statusText}`,
      16).setOrigin(0.5)

    this.pointsText = this.add.bitmapText(
      this.cameras.main.width / 2,
      this.gameOverText.y + 16,
      'ibm_vga',
      `${this.score} PTS`,
      8).setOrigin(0.5)

    this.add.bitmapText(
      this.cameras.main.width / 2,
      this.pointsText.y + 24,
      'ibm_vga',
      `PRESS SPACE TO RESTART`,
      8).setOrigin(0.5)

    this.status === "WON" ? this.gameWinSound.play() : this.gameLoseSound.play()

    this.add.bitmapText(
      35,
      this.cameras.main.height - 22,
      'ibm_vga',
      "Graves\nGames",
      8).setOrigin(0)

    this.add.image(18, 240, 'assets', 'logo.png')

    this.add.bitmapText(
      this.cameras.main.width - 3,
      this.cameras.main.height - 3,
      'ibm_vga',
      "(c)2022",
      8).setOrigin(1)

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('Level_1')
    })
  }
}