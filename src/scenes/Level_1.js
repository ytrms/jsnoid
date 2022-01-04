import Level from './Level'
import Phaser from 'phaser'

export default class Level_1 extends Level {
  init(data) {
    if (data) {
      this.newScore = data.score
      this.newExtraShips = data.extraShips
    }
  }

  create() {
    this.currentLevelNumber = 1
    this.bgTileFrame = 'bg-lv4.png'
    super.create()
    this.nextLevel = 'Level_2'

    // add bricks
    this.yellowBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickYellow.png',
      frameQuantity: 22,
      gridAlign: { width: 11, height: 2, cellWidth: 16, cellHeight: 16, x: 32, y: 50 }
    })

    this.yellowBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'yellow', points: 120, vitality: 1 })
    });

    this.redBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickRed.png',
      frameQuantity: 12,
      gridAlign: { width: 12, height: 1, cellWidth: 16, cellHeight: 8, x: 24, y: 54 }
    })

    this.redBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'red', points: 90, vitality: 1 })
    });

    this.silverBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickSilver.png',
      frameQuantity: 6,
      gridAlign: { width: 6, height: 1, cellWidth: 16, cellHeight: 8, x: 72, y: 70 }
    })

    this.silverBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'silver', points: 50 * this.currentLevelNumber, vitality: this.currentLevelNumber + 1 })
    });

    this.goldBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickGold.png',
      frameQuantity: 1,
      gridAlign: { width: 1, height: 1, cellWidth: 16, cellHeight: 8, x: 72, y: 82 }
    })

    this.goldBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: false, color: 'gold', points: 0, vitality: 0 })
    });

    /**
     * At the end of every level, you have to have a 
     * this.destructibleBricks and a this.bricks group.
     * Then, add the collider between the ball and the bricks.
     */

    this.destructibleBricks = new Phaser.GameObjects.Group(this, this.yellowBricks.getChildren())
    this.destructibleBricks.addMultiple(this.redBricks.getChildren())
    this.destructibleBricks.addMultiple(this.silverBricks.getChildren())

    this.bricks = new Phaser.GameObjects.Group(this, this.destructibleBricks.getChildren())
    this.bricks.addMultiple(this.goldBricks.getChildren())

    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this)
  }
}