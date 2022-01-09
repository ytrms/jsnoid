import Phaser from 'phaser'
import fontpng from './../assets/IBM_VGA_9x8_0.png'
import fontxml from './../assets/IBM_VGA_9x8.xml'
import assetsPNG from './../assets/sprites.png'
import assetsJSON from '../assets/sprites.json'
import cutsceneBG from '../../cutscene_bg_1.png'
import cutsceneBGM from '../assets/cutscene1BGM.mp3'

export default class Intro extends Phaser.Scene {
  preload() {
    this.load.bitmapFont('ibm_vga', fontpng, fontxml)
    this.load.image('cutsceneBG', cutsceneBG)
    this.load.audio('cutscene1BGM', cutsceneBGM)
  }

  create() {
    this.cutsceneBGM = this.sound.add("cutscene1BGM", { loop: true, volume: 0.5 })
    this.cutsceneBGM.play()
    this.add.image(0, 0, 'cutsceneBG').setOrigin(0)

    this.input.keyboard.on('keydown-SPACE', () => {
      this.cutsceneBGM.stop()
      this.scene.start('Level_2')
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
      "Finally, out of that\nstinking dungeon cell!\n\nGood to have my portal\ngun back. I hope the\nGonderians didn't mess\nwith it...\n\nNow, let's go home.\n(PRESS SPACE)"
    )
  }
}