import Phaser from 'phaser'
import fontpng from './../assets/IBM_VGA_9x8_0.png'
import fontxml from './../assets/IBM_VGA_9x8.xml'
import winSound from './../assets/win.wav'
import loseSound from './../assets/lose.wav'

export default class GameOver extends Phaser.Scene {
  init(data) {
    this.score = data.score
    this.status = data.status
  }


  preload() {
    this.load.audio("winSound", winSound)
    this.load.audio("loseSound", loseSound)
    this.load.bitmapFont('ibm_vga', fontpng, fontxml)
  }

  create() {
    this.winSound = this.sound.add("winSound", { loop: false })
    this.loseSound = this.sound.add("loseSound", { loop: false })

    this.status == "WON" ? this.statusText = "YOU WON!" : this.statusText = "GAME OVER"

    this.gameOverText = this.add.bitmapText(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ibm_vga', `${this.statusText}`, 16).setOrigin(0.5)
    this.pointsText = this.add.bitmapText(this.cameras.main.width / 2, this.gameOverText.y + 16, 'ibm_vga', `${this.score} PTS`, 8).setOrigin(0.5)
    this.add.bitmapText(this.cameras.main.width / 2, this.pointsText.y + 24, 'ibm_vga', `PRESS SPACE TO RESTART`, 8).setOrigin(0.5)

    this.status == "WON" ? this.winSound.play() : this.loseSound.play()

    this.add.bitmapText(1, this.cameras.main.height - 8, 'ibm_vga', "Rose Software (c) 2022", 8).setOrigin(0)

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('Level_1')
    })
  }
}