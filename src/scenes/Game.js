import Phaser from 'phaser'
import assetspng from './../assets/sprites.png'
import assetsjson from './../assets/sprites.json'
import fontpng from './../assets/IBM_VGA_9x8_0.png'
import fontxml from './../assets/IBM_VGA_9x8.xml'

export default class Game extends Phaser.Scene {
  preload() {
    this.load.atlas('assets', assetspng, assetsjson)
    this.load.bitmapFont('ibm_vga', fontpng, fontxml)
  }

  create() {
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

    this.physics.world.setBoundsCollision(true, true, true, false)

    this.bricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: ['brick-yellow.png', 'brick-yellow.png', 'brick-yellow.png', 'brick-yellow.png', 'brick-yellow.png'],
      frameQuantity: 11,
      gridAlign: { width: 11, height: 5, cellWidth: 16, cellHeight: 8, x: 32, y: 50 }
    })

    this.states = {
      WAITING: "waiting",
      PLAYING: "playing",
      PAUSED: "paused"
    }

    this.gameState = this.states.WAITING

    this.paddle = this.physics.add.staticImage(this.cameras.main.centerX, 240, 'assets', 'paddle.png')

    // create ball and give physics
    this.ball = this.physics.add.image(this.paddle.x, this.paddle.y - 30, 'assets', 'ball.png')
    // this.ball = this.add.circle(this.paddle.x, this.paddle.y - 20, 10, 0xffffff, 1)
    //this.physics.add.existing(this.ball)
    this.ball.setBounce(1, 1)
    this.ball.setCollideWorldBounds(true, 1, 1, true)

    this.resetLevel = function () {
      this.gameState = this.states.WAITING
      this.ballsUsed = 0
      this.scoreBoard.setText(`Press UP to start.`)
      this.bricks.children.each(brick => {
        brick.enableBody(false, 0, 0, true, true)
      })
    }

    this.hitBrick = function (ball, brick) {
      brick.disableBody(true, true)

      if (this.bricks.countActive() === 0) {
        this.resetLevel()
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
    }

    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this)
    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this)
    this.physics.add.collider(this.ball, topBorder)
    this.physics.add.collider(this.ball, leftBorder)
    this.physics.add.collider(this.ball, rightBorder)

    this.ballsUsed = 0
    this.scoreBoard = this.add.bitmapText(2, 2, 'ibm_vga', "PRESS UP TO START", 8)

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
      if (this.gameState == this.states.WAITING && this.cursors.up.isDown) {
        this.gameState = this.states.PLAYING
        this.ball.setVelocity(60, -200)
        this.ballsUsed++
        this.scoreBoard.setText(`Balls used: ${this.ballsUsed}`)
      }

    }
    // Stick ball to paddle if game is waiting for player input
    if (this.gameState == this.states.WAITING) {
      this.ball.x = this.paddle.x
      this.ball.y = this.paddle.y - this.ball.height * 2
      this.ball.setVelocity(0, 0)
    }

    if (this.ball.y > this.paddle.y) {
      this.gameState = this.states.WAITING
    }
  }
}