import Phaser from 'phaser'
import fontpng from './../assets/IBM_VGA_9x8_0.png'
import fontxml from './../assets/IBM_VGA_9x8.xml'
import introBGM from './../assets/introBGM2.mp3'
import assetsPNG from './../assets/sprites.png'
import assetsJSON from './../assets/sprites.json'
import astroAnim from './../assets/animSheets/astroAnim.png'

export default class Intro extends Phaser.Scene {
  preload() {
    this.load.audio("introBGM", introBGM)
    this.load.bitmapFont('ibm_vga', fontpng, fontxml)
    this.load.atlas('assets', assetsPNG, assetsJSON)
    this.load.spritesheet("astroAnim", astroAnim, { frameWidth: 103, frameHeight: 85 })
  }

  create() {
    this.introBGM = this.sound.add("introBGM", { loop: true, volume: 0.5 })
    this.introBGM.play()

    // create shadows
    // this.titleCard = this.add.image(
    //   this.cameras.main.centerX,
    //   110,
    //   'assets',
    //   'titleCard.png').setOrigin(0.5)
    this.astroAnim = this.anims.create({
      key: 'bob',
      frames: this.anims.generateFrameNumbers('astroAnim'),
      frameRate: 5
    })

    const astroImage = this.physics.add.sprite(this.cameras.main.centerX, 70, 'astroAnim')
    astroImage.play({ key: "bob", repeat: -1 })

    this.gameName = this.add.image(
      this.cameras.main.centerX,
      astroImage.y + 80,
      'assets',
      'gameName.png'
    )

    this.add.bitmapText(
      this.cameras.main.width / 2,
      this.gameName.y + 44,
      'ibm_vga',
      'PRESS SPACE TO START',
      8)
      .setOrigin(0.5)

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
      "Alpha",
      8).setOrigin(1)

    this.input.keyboard.on('keydown-SPACE', () => {
      this.introBGM.stop()
      this.scene.start('Level_1')
    })
  }
}