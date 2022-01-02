import Phaser from 'phaser'
import assetspng from './../assets/sprites.png'
import assetsjson from './../assets/sprites.json'
import fontpng from './../assets/IBM_VGA_9x8_0.png'
import fontxml from './../assets/IBM_VGA_9x8.xml'
import brickHitSound from './../assets/brick-hit.wav'
import paddleHitSound from './../assets/paddleHit.wav'
import ballLostSound from './../assets/ballLost.wav'
import winSound from './../assets/win.wav'
import loseSound from './../assets/lose.wav'

export default class Game extends Phaser.Scene {
  preload() {
    this.load.atlas('assets', assetspng, assetsjson)
    this.load.bitmapFont('ibm_vga', fontpng, fontxml)
    this.load.audio("brickHitSound", brickHitSound)
    this.load.audio("paddleHitSound", paddleHitSound)
    this.load.audio("ballLostSound", ballLostSound)
    this.load.audio("winSound", winSound)
    this.load.audio("loseSound", loseSound)
  }

  create() {
    // add audio files
    const brickHitSound = this.sound.add("brickHitSound", { loop: false })
    const paddleHitSound = this.sound.add("paddleHitSound", { loop: false })
    this.ballLostSound = this.sound.add("ballLostSound", { loop: false })
    this.winSound = this.sound.add("winSound", { loop: false })
    this.loseSound = this.sound.add("loseSound", { loop: false })

    // set background
    this.bgtile = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.cameras.main.width, this.cameras.main.height, 'assets', 'bg-tile.png')

    // add black bar at the top for scoring
    this.blackBar = this.add.rectangle(this.cameras.main.width / 2, 0, this.cameras.main.width, 21, 0x000000, 1)

    // add borders
    console.log('black bar height', this.blackBar.height);
    let topBorder = this.physics.add.image(this.cameras.main.centerX, this.blackBar.height - 8, 'assets', 'top-border.png').setImmovable(true)
    let leftBorder = this.physics.add.image(4, this.cameras.main.centerY + 8, 'assets', 'left-border.png').setImmovable(true)
    let rightBorder = this.physics.add.image(this.cameras.main.width - 4, this.cameras.main.centerY + 8, 'assets', 'left-border.png').setFlipX(true).setImmovable(true)
    console.log('topBorder X', topBorder.y);

    this.yellowBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: ['brick-yellow.png', 'brick-yellow.png', 'brick-yellow.png', 'brick-yellow.png', 'brick-yellow.png'],
      frameQuantity: 11,
      gridAlign: { width: 11, height: 5, cellWidth: 16, cellHeight: 8, x: 32, y: 50 }
    })

    this.extraShips = 3
    this.updateExtraShips = function (counter) {
      console.log('extra ships', this.extraShips);
      if (this.shipGroup) {
        this.shipGroup.destroy(true)
        if (counter === 0) {
          return
        }
      }
      /** @type Phaser.GameObjects.Group */
      this.shipGroup = this.add.group({
        key: 'assets',
        frame: "lifeIndicator.png",
        quantity: counter,
        gridAlign: { height: 1, cellWidth: 16, cellHeight: 5, x: 17, y: 248 }
      })
    }

    this.updateExtraShips(this.extraShips)

    this.states = {
      WAITING: "waiting",
      PLAYING: "playing",
      PAUSED: "paused"
    }

    this.gameState = this.states.WAITING

    // create paddle
    this.paddle = this.physics.add.staticImage(this.cameras.main.centerX, 240, 'assets', 'paddle.png')

    // create ball 
    this.ball = this.physics.add.image(this.paddle.x, this.paddle.y - 30, 'assets', 'ball.png').setBounce(1)

    this.resetLevel = function () {
      this.gameState = this.states.WAITING
      this.score = 0
      this.scoreBoard.setText(`PRESS UP TO LAUNCH.`)
      this.yellowBricks.children.each(brick => {
        brick.enableBody(false, 0, 0, true, true)
      })
    }

    /**
     * @param {Phaser.Physics.Arcade.Image} ball 
     * @param {Phaser.Physics.Arcade.Image} brick 
     */
    this.hitYellowBrick = function (ball, brick) {
      brick.disableBody(true, true)
      brickHitSound.play()
      this.score += 120
      this.scoreBoard.setText(`SCORE:${this.score}`)

      if (this.yellowBricks.countActive() === 0) {
        this.scene.start('GameOver', { score: this.score, status: "WON" })
      }
    }

    this.hitPaddle = function (ball, paddle) {
      let delta = 0
      if (ball.x < paddle.x) {
        // The ball hit the left side of the paddle
        delta = paddle.x - ball.x
        ball.setVelocityX(-8 * delta)
      } else if (ball.x > paddle.x) {
        // The ball hit the right side of the paddle
        delta = ball.x - paddle.x
        ball.setVelocityX(8 * delta)
      }
      if (this.gameState !== this.states.WAITING) {

        paddleHitSound.play()
      }
    }

    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this)
    this.physics.add.collider(this.ball, this.yellowBricks, this.hitYellowBrick, null, this)
    this.physics.add.collider(this.ball, topBorder)
    this.physics.add.collider(this.ball, leftBorder)
    this.physics.add.collider(this.ball, rightBorder)

    this.score = 0
    this.scoreBoard = this.add.bitmapText(2, 2, 'ibm_vga', "PRESS UP TO LAUNCH", 8)

    this.cursors = this.input.keyboard.createCursorKeys()

    // handle pause
    this.input.keyboard.on('keydown-P', () => {
      if (this.gameState !== this.states.PAUSED) {
        this.previousGameState = this.gameState

        this.previousBallVelocityX = this.ball.body.velocity.x
        this.previousBallVelocityY = this.ball.body.velocity.y

        this.ball.setVelocity(0)
        this.previousText = this.scoreBoard.text
        this.scoreBoard.setText("PAUSED")
        // this.pausedText = this.add.bitmapText(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ibm_vga', "PAUSED", 24).setOrigin(0.5)
        this.gameState = this.states.PAUSED
      } else if (this.gameState === this.states.PAUSED) {
        this.gameState = this.previousGameState
        this.scoreBoard.setText(this.previousText)
        this.ball.setVelocity(this.previousBallVelocityX, this.previousBallVelocityY)
        // this.pausedText.destroy()
      }
    })
  }

  update() {
    // Handle input
    // move paddle
    if (this.gameState !== this.states.PAUSED) {
      if (this.cursors.left.isDown) {
        if (this.paddle.x - this.paddle.width / 2 > 9) {
          this.paddle.x -= 3
          this.paddle.body.updateFromGameObject()
        }
      } else if (this.cursors.right.isDown) {
        if (this.paddle.x + this.paddle.width / 2 < this.cameras.main.width - 9) {
          this.paddle.x += 3
          this.paddle.body.updateFromGameObject()
        }
      }
      // release ball when player presses up
      if (this.gameState == this.states.WAITING && this.cursors.up.isDown && this.ball.getData('isReady')) {
        this.gameState = this.states.PLAYING
        this.ball.setVelocity(60, -200)
        this.ball.setData({ isReady: false })
      }

    }
    // Stick ball to paddle if game is waiting for player input
    if (this.gameState == this.states.WAITING) {
      this.ball.x = this.paddle.x
      this.ball.y = this.paddle.y - this.ball.height * 2
      this.ball.setVelocity(0, 0)
      this.ball.setData({ isReady: true })
    }

    if (this.ball.y > this.paddle.y) {
      this.gameState = this.states.WAITING
      this.extraShips--
      if (this.extraShips < 0) {
        this.scene.start('GameOver', { score: this.score, status: 'LOST' })
        return
      }
      this.updateExtraShips(this.extraShips)
      this.ballLostSound.play()
    }
  }
}