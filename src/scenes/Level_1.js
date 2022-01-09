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
    this.silverBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickSilver.png',
      frameQuantity: 13,
      gridAlign: { width: 13, height: 1, cellWidth: 16, cellHeight: 8, x: 16, y: 50 }
    })

    this.silverBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'silver', points: 50 * this.currentLevelNumber, vitality: this.currentLevelNumber + 1 })
    });

    this.redBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickRed.png',
      frameQuantity: 13,
      gridAlign: { width: 13, height: 1, cellWidth: 16, cellHeight: 8, x: 16, y: 58 }
    })

    this.redBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'red', points: 90, vitality: 1 })
    });

    this.yellowBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickYellow.png',
      frameQuantity: 13,
      gridAlign: { width: 13, height: 1, cellWidth: 16, cellHeight: 8, x: 16, y: 66 }
    })

    this.yellowBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'yellow', points: 120, vitality: 1 })
    });

    this.blueBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickBlue.png',
      frameQuantity: 13,
      gridAlign: { width: 13, height: 1, cellWidth: 16, cellHeight: 8, x: 16, y: 74 }
    })

    this.blueBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'blue', points: 100, vitality: 1 })
    });

    this.pinkBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickPink.png',
      frameQuantity: 13,
      gridAlign: { width: 13, height: 1, cellWidth: 16, cellHeight: 8, x: 16, y: 82 }
    })

    this.pinkBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'pink', points: 110, vitality: 1 })
    });

    this.greenBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickGreen.png',
      frameQuantity: 13,
      gridAlign: { width: 13, height: 1, cellWidth: 16, cellHeight: 8, x: 16, y: 90 }
    })

    this.greenBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'green', points: 80, vitality: 1 })
    });

    // this.goldBricks = this.physics.add.staticGroup({
    //   key: 'assets',
    //   frame: 'brickGold.png',
    //   frameQuantity: 1,
    //   gridAlign: { width: 1, height: 1, cellWidth: 16, cellHeight: 8, x: 72, y: 82 }
    // })

    // this.goldBricks.getChildren().forEach(brick => {
    //   brick.setData({ isDestructible: false, color: 'gold', points: 0, vitality: 0 })
    // });

    /**
     * At the end of every level, you have to have a 
     * this.destructibleBricks and a this.bricks group.
     * Then, add the collider between the ball and the bricks.
     */

    this.destructibleBricks = new Phaser.GameObjects.Group(this, this.silverBricks.getChildren())
    this.destructibleBricks.addMultiple(this.redBricks.getChildren())
    this.destructibleBricks.addMultiple(this.yellowBricks.getChildren())
    this.destructibleBricks.addMultiple(this.blueBricks.getChildren())
    this.destructibleBricks.addMultiple(this.pinkBricks.getChildren())
    this.destructibleBricks.addMultiple(this.greenBricks.getChildren())

    this.bricks = new Phaser.GameObjects.Group(this, this.destructibleBricks.getChildren())
    // this.bricks.addMultiple(this.goldBricks.getChildren())

    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this)
  }
}