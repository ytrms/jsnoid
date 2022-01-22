import Phaser from 'phaser'
import fontpng from './../assets/IBM_VGA_9x8_0.png'
import fontxml from './../assets/IBM_VGA_9x8.xml'
import assetsPNG from './../assets/sprites.png'
import assetsJSON from '../assets/sprites.json'
import cutsceneBG from '../../cutscene_bg_2.png'
import cutsceneBGM from '../assets/cutscene2BGM.mp3'
import astroAnim from './../assets/animSheets/astroAnim.png'

export default class Intro extends Phaser.Scene {
  preload() {
    this.load.bitmapFont('ibm_vga', fontpng, fontxml)
    this.load.image('cutsceneBG', cutsceneBG)
    this.load.audio('cutsceneBGM', cutsceneBGM)
    this.load.spritesheet("astroAnim", astroAnim, { frameWidth: 103, frameHeight: 85 })
  }

  create() {
    this.cutsceneBGM = this.sound.add("cutsceneBGM", { loop: true, volume: 0.75 })
    this.cutsceneBGM.play()
    this.add.image(0, 0, 'cutsceneBG').setOrigin(0)

    this.astroAnim = this.anims.create({
      key: 'bob',
      frames: this.anims.generateFrameNumbers('astroAnim'),
      frameRate: 5
    })

    const astroImage = this.physics.add.sprite(this.cameras.main.centerX, 90, 'astroAnim')
    astroImage.play({ key: "bob", repeat: -1 })

    this.input.keyboard.on('keydown-SPACE', () => {
      this.cutsceneBGM.stop()
      this.scene.start('Level_3')
    })

    /**
     * Typewrites the given text
     * @param {string} text 
     */
    this.typewriteText = (text) => {
      const length = text.length
      let i = 0
      this.time.addEvent({
        callback: () => {
          this.storyText.text += text[i]
          ++i
        },
        repeat: length - 1,
        delay: 35
      })
    }

    this.dialogBox = this.add.rectangle(this.cameras.main.centerX, 200, this.cameras.main.width - 20, 100, 0x000000, 1)
    this.storyText = this.add.bitmapText(15, 155, 'ibm_vga', '', 8)
    this.typewriteText(
      "God, I'm still on this\nstinking planet!\n\nThe Gonderians messed\nup my gun... \nI'll try to fix it\nand teleport again. \n\nNext, please be home.\n(PRESS SPACE)"
    )
  }
}