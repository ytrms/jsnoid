import Phaser from 'phaser'
import assetsPNG from './../assets/sprites.png'
import assetsJSON from './../assets/sprites.json'
import fontPNG from './../assets/IBM_VGA_9x8_0.png'
import fontXML from './../assets/IBM_VGA_9x8.xml'
import brickDestroyedSound from './../assets/brickDestroyed.wav'
import paddleHitSound from './../assets/paddleHit.wav'
import ballLostSound from './../assets/ballLost.wav'
import winSound from './../assets/win.wav'
import loseSound from './../assets/lose.wav'

export default class Level extends Phaser.Scene {

  preload() {
    this.load.atlas('assets', assetsPNG, assetsJSON)
    this.load.bitmapFont('ibm_vga', fontPNG, fontXML)
    this.load.audio("brickDestroyedSound", brickDestroyedSound)
    this.load.audio("paddleHitSound", paddleHitSound)
    this.load.audio("ballLostSound", ballLostSound)
    this.load.audio("winSound", winSound)
    this.load.audio("loseSound", loseSound)
  }

  create(bgTileFrame) {
    // initialization for later levels (inheritors)
    if (this.newScore) {
      this.score = this.newScore
      this.extraShips = this.newExtraShips
      console.log('this.extraShips', this.extraShips);
    } else {
      this.score = 0
      this.extraShips = 3
    }

    // add audio files
    this.brickDestroyedSound = this.sound.add("brickDestroyedSound", { loop: false })
    this.paddleHitSound = this.sound.add("paddleHitSound", { loop: false })
    this.ballLostSound = this.sound.add("ballLostSound", { loop: false })
    this.winSound = this.sound.add("winSound", { loop: false })
    this.loseSound = this.sound.add("loseSound", { loop: false })

    // set background
    this.bgtile = this.add.tileSprite(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.cameras.main.width,
      this.cameras.main.height,
      'assets',
      bgTileFrame)

    // create shadows
    this.paddleShadow = this.add.image(
      this.cameras.main.centerX + 4,
      244,
      'assets',
      'paddle.png')
      .setTintFill(0x000000)

    this.ballShadow = this.add.image(
      this.cameras.main.centerX + 4,
      214,
      'assets',
      'ball.png')
      .setTintFill(0x000000)

    this.leftBorderShadow = this.add.rectangle(
      8,
      17,
      8,
      this.cameras.main.height - 17,
      0x000000,
      0.25)
      .setOrigin(0)

    this.topBorderShadow = this.add.rectangle(
      16,
      17,
      this.cameras.main.width - 17,
      8,
      0x000000,
      0.25)
      .setOrigin(0)

    // add black bar at the top for scoring
    this.blackBar = this.add.rectangle(
      this.cameras.main.width / 2,
      0, this.cameras.main.width,
      21,
      0x000000,
      1)

    // add borders
    let topBorder = this.physics.add.image(
      this.cameras.main.centerX,
      this.blackBar.height - 8,
      'assets',
      'top-border.png')
      .setImmovable(true)

    let leftBorder = this.physics.add.image(
      4,
      this.cameras.main.centerY + 8,
      'assets',
      'left-border.png')
      .setImmovable(true)

    let rightBorder = this.physics.add.image(
      this.cameras.main.width - 4,
      this.cameras.main.centerY + 8,
      'assets',
      'left-border.png')
      .setFlipX(true)
      .setImmovable(true)

    // add lives
    this.updateExtraShips = function (counter) {
      if (this.shipGroup) {
        this.shipGroup.destroy(true)
        this.shipGroupShadow.destroy(true)
        if (counter === 0) {
          return
        }
      }

      /** @type Phaser.GameObjects.Group */
      this.shipGroupShadow = this.add.group({
        key: 'assets',
        frame: 'lifeIndicatorShadow.png',
        quantity: counter,
        gridAlign: { height: 1, cellWidth: 16, cellHeight: 5, x: 18, y: 251 }
      })

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
    this.paddle = this.physics.add.staticImage(
      this.cameras.main.centerX,
      240,
      'assets',
      'paddle.png')

    // create ball
    this.ball = this.physics.add.image(
      this.paddle.x,
      this.paddle.y - 30,
      'assets',
      'ball.png')
      .setBounce(1)

    // Game routines
    // CURRENTLY UNUSED
    this.resetLevel = function () {
      this.gameState = this.states.WAITING
      this.score = 0
      this.scoreBoard.setText(`PRESS UP TO LAUNCH.`)
      this.yellowBricks.children.each(brick => {
        brick.enableBody(false, 0, 0, true, true)
      })
    }

    /**
     * Runs whenever a life needs to be deducted.
     * @param {string} nextScene
     * @param {object} data
     */
    this.lifeLostRoutine = () => {
      this.gameState = this.states.WAITING
      this.extraShips--
      if (this.extraShips < 0) {
        this.scene.start('GameOver', { score: this.score, status: "LOST" })
        return
      }
      this.updateExtraShips(this.extraShips)
      this.ballLostSound.play()
    }

    /**
     * Runs whenever the ball hits a brick.
     * @param {Phaser.Physics.Arcade.Image} ball
     * @param {Phaser.Physics.Arcade.Image} brick
     */
    this.hitBrick = (ball, brick) => {
      if (brick.getData('isDestructible')) {
        brick.disableBody(true, true)
        this.brickDestroyedSound.play()
      }
      this.score += brick.getData('points')
      this.scoreBoard.setText(`SCORE:${this.score}`)

      if (this.destructibleBricks.countActive() === 0) {
        console.log('Score', this.score);
        this.scene.start(this.nextLevel, { score: this.score, status: "WON", extraShips: this.extraShips })
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

        this.paddleHitSound.play()
      }
    }

    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this)
    this.physics.add.collider(this.ball, topBorder, () => this.paddleHitSound.play(), null, this)
    this.physics.add.collider(this.ball, leftBorder, () => this.paddleHitSound.play(), null, this)
    this.physics.add.collider(this.ball, rightBorder, () => this.paddleHitSound.play(), null, this)

    this.scoreBoard = this.add.bitmapText(2, 2, 'ibm_vga', "PRESS UP TO LAUNCH", 8)

    this.cursors = this.input.keyboard.createCursorKeys()

    // handle pause
    this.input.keyboard.on('keydown-P', () => {
      if (this.gameState === this.states.PLAYING) {
        this.previousGameState = this.gameState

        this.previousBallVelocityX = this.ball.body.velocity.x
        this.previousBallVelocityY = this.ball.body.velocity.y

        this.ball.setVelocity(0)
        this.previousText = this.scoreBoard.text
        this.scoreBoard.setText("PAUSED")
        this.gameState = this.states.PAUSED
      } else if (this.gameState === this.states.PAUSED) {
        this.gameState = this.previousGameState
        this.scoreBoard.setText(this.previousText)
        this.ball.setVelocity(this.previousBallVelocityX, this.previousBallVelocityY)
      }
    })
  }

  update(time, delta) {
    // Handle input
    // move paddle
    if (this.gameState !== this.states.PAUSED) {
      if (this.cursors.left.isDown) {
        if (this.paddle.x - this.paddle.width / 2 > 9) {
          this.paddle.x -= 3
          this.paddleShadow.x = this.paddle.x + 4
          this.paddle.body.updateFromGameObject()
        }
      } else if (this.cursors.right.isDown) {
        if (this.paddle.x + this.paddle.width / 2 < this.cameras.main.width - 9) {
          this.paddle.x += 3
          this.paddleShadow.x = this.paddle.x + 4
          this.paddle.body.updateFromGameObject()
        }
      }
      // release ball when player presses up
      if (this.gameState === this.states.WAITING && this.cursors.up.isDown && this.ball.getData('isReady')) {
        this.gameState = this.states.PLAYING
        this.ball.setVelocity(60, -200)
        this.ball.setData({ isReady: false })
      }
    }

    // Stick ball to paddle if game is waiting for player input
    if (this.gameState === this.states.WAITING) {
      this.ball.x = this.paddle.x
      this.ball.y = this.paddle.y - this.ball.height * 2
      this.ball.setVelocity(0, 0)
      this.ball.setData({ isReady: true })
    }


    if (this.ball.y > this.paddle.y) {
      this.lifeLostRoutine()
    }

    // have shadow follow the ball
    this.ballShadow.x = this.ball.x + 4
    this.ballShadow.y = this.ball.y + 4
  }
}