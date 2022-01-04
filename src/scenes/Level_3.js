import Level from './Level'
import Phaser from 'phaser'

export default class Level_2 extends Level {
  init(data) {
    if (data) {
      this.newScore = data.score
      this.newExtraShips = data.extraShips
    }
  }

  create() {
    this.currentLevelNumber = 3
    this.bgTileFrame = 'bg-lv3.png'
    super.create()

    this.nextLevel = 'GameOver'

    console.log("I'm in Level_3!");

    // add bricks
    this.yellowBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: ['brickRed.png', 'brickRed.png', 'brickYellow.png', 'brickYellow.png', 'brickYellow.png'],
      frameQuantity: 1,
      gridAlign: { width: 1, height: 5, cellWidth: 16, cellHeight: 8, x: 32, y: 50 }
    })

    this.yellowBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'yellow', points: 120, vitality: 1 })
    });

    /**
     * At the end of every level, you have to have a 
     * this.destructibleBricks and a this.bricks group.
     * Then, add the collider between the ball and the bricks.
     */

    this.destructibleBricks = new Phaser.GameObjects.Group(this, this.yellowBricks.getChildren())
    this.bricks = new Phaser.GameObjects.Group(this, this.destructibleBricks.getChildren())

    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this)
  }
}