import Phaser from 'phaser'
import assetspng from './../assets/sprites.png'
import assetsjson from './../assets/sprites.json'

export default class Game extends Phaser.Scene {
  preload() {
    this.load.atlas('assets', assetspng, assetsjson)
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false)

    this.bricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: ['brick.png', 'brick.png', 'brick.png', 'brick.png', 'brick.png'],
      frameQuantity: 7,
      gridAlign: { width: 7, height: 5, cellWidth: 64, cellHeight: 32, x: 60, y: 50 }
    })

    this.states = {
      WAITING: "waiting",
      PLAYING: "playing"
    }

    this.gameState = this.states.WAITING

    // create paddle and give physics
    this.paddle = this.add.rectangle(this.cameras.main.centerX, 630, 100, 20, 0xffffff, 1)
    this.physics.add.existing(this.paddle, true)

    // create ball and give physics
    this.ball = this.physics.add.image(this.paddle.x, this.paddle.y - 20, 'assets', 'ball.png')
    // this.ball = this.add.circle(this.paddle.x, this.paddle.y - 20, 10, 0xffffff, 1)
    this.physics.add.existing(this.ball)
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
      console.log('brick hit!');
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

    this.ballsUsed = 0
    this.scoreBoard = this.add.text(0, 0, `Press UP to start.`)

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    // Handle input
    // move paddle
    if (this.cursors.left.isDown) {
      if (this.paddle.x - this.paddle.width / 2 > 0) {
        this.paddle.x -= 5
        this.paddle.body.updateFromGameObject()
      }
    } else if (this.cursors.right.isDown) {
      if (this.paddle.x + this.paddle.width / 2 < this.cameras.main.width) {
        this.paddle.x += 5
        this.paddle.body.updateFromGameObject()
      }
    }
    // release ball when player presses up
    if (this.gameState == this.states.WAITING && this.cursors.up.isDown) {
      this.gameState = this.states.PLAYING
      this.ball.setVelocity(60, -300)
      this.ballsUsed++
      this.scoreBoard.setText(`Balls used: ${this.ballsUsed}`)
    }

    // Stick ball to paddle if game is waiting for player input
    if (this.gameState == this.states.WAITING) {
      this.ball.x = this.paddle.x
      this.ball.y = this.paddle.y - this.ball.height
      this.ball.setVelocity(0, 0)
    }

    if (this.ball.y > this.paddle.y) {
      this.gameState = this.states.WAITING
    }
  }
}