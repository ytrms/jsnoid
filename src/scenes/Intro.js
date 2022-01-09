import Phaser from 'phaser'
import fontpng from './../assets/IBM_VGA_9x8_0.png'
import fontxml from './../assets/IBM_VGA_9x8.xml'
import introBGM from './../assets/introBGM.mp3'
import assetsPNG from './../assets/sprites.png'
import assetsJSON from './../assets/sprites.json'

export default class Intro extends Phaser.Scene {
  preload() {
    this.load.audio("introBGM", introBGM)
    this.load.bitmapFont('ibm_vga', fontpng, fontxml)
    this.load.atlas('assets', assetsPNG, assetsJSON)
  }

  create() {
    this.introBGM = this.sound.add("introBGM", {loop: true, volume: 0.5})
    this.introBGM.play()

    // create shadows
    this.titleCard = this.add.image(
      this.cameras.main.centerX,
      110,
      'assets',
      'titleCard.png').setOrigin(0.5)

    // this.titleText = this.add.bitmapText(
    //   this.cameras.main.width / 2,
    //   this.cameras.main.height / 2,
    //   'ibm_vga',
    //   `Breakoid`,
    //   16).setOrigin(0.5)

    // this.add.bitmapText(
    //     this.cameras.main.width / 2,
    //     this.gameOverText.y + 16,
    //     'ibm_vga',
    //     `by Graves Games`,
    //     8).setOrigin(0.5)

    // this.subTitle = this.add.bitmapText(
    //   this.cameras.main.width / 2,
    //   this.titleText.y + 18,
    //   'ibm_vga',
    //   `Between Worlds`,
    //   8).setOrigin(0.5)

    this.add.bitmapText(
      this.cameras.main.width / 2,
      this.titleCard.y + 84,
      'ibm_vga',
      'PRESS SPACE TO START',
      8)
      .setOrigin(0.5)

    this.add.bitmapText(
      this.cameras.main.width / 2,
      this.cameras.main.height - 8,
      'ibm_vga',
      "Graves Games (c) 2022",
      8).setOrigin(0.5)

    this.input.keyboard.on('keydown-SPACE', () => {
      this.introBGM.stop()
      this.scene.start('Level_1')
    })
  }
}