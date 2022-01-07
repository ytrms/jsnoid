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
    this.currentLevelNumber = 2
    this.bgTileFrame = 'bg-lv2.png'
    super.create()

    this.nextLevel = 'Level_3'

    console.log("I'm in Level_2!");

    // add bricks // TODO: Fix all points
    this.whiteBricks1 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickWhite.png',
      frameQuantity: 12,
      gridAlign: { width: 1, height: 12, cellWidth: 16, cellHeight: 8, x: 16, y: 34 }
    })

    this.whiteBricks1.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'white', points: 50, vitality: 1 })
    });

    this.orangeBricks1 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickOrange.png',
      frameQuantity: 11,
      gridAlign: { width: 1, height: 11, cellWidth: 16, cellHeight: 8, x: 32, y: 42 }
    })

    this.orangeBricks1.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'orange', points: 60, vitality: 1 })
    });

    this.brownBricks1 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickBrown.png',
      frameQuantity: 10,
      gridAlign: { width: 1, height: 10, cellWidth: 16, cellHeight: 8, x: 48, y: 50 }
    })

    this.brownBricks1.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'brown', points: 70, vitality: 1 })
    });

    this.greenBricks1 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickGreen.png',
      frameQuantity: 9,
      gridAlign: { width: 1, height: 9, cellWidth: 16, cellHeight: 8, x: 64, y: 58 }
    })

    this.greenBricks1.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'green', points: 80, vitality: 1 })
    });

    this.redBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickRed.png',
      frameQuantity: 8,
      gridAlign: { width: 1, height: 8, cellWidth: 16, cellHeight: 8, x: 80, y: 66 }
    })

    this.redBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'red', points: 90, vitality: 1 })
    });

    this.blueBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickBlue.png',
      frameQuantity: 7,
      gridAlign: { width: 1, height: 7, cellWidth: 16, cellHeight: 8, x: 96, y: 74 }
    })

    this.blueBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'blue', points: 100, vitality: 1 })
    });

    this.pinkBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickPink.png',
      frameQuantity: 6,
      gridAlign: { width: 1, height: 6, cellWidth: 16, cellHeight: 8, x: 112, y: 82 }
    })

    this.pinkBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'pink', points: 110, vitality: 1 })
    });

    this.yellowBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickYellow.png',
      frameQuantity: 5,
      gridAlign: { width: 1, height: 5, cellWidth: 16, cellHeight: 8, x: 128, y: 90 }
    })

    this.yellowBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'yellow', points: 120, vitality: 1 })
    });

    this.whiteBricks2 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickWhite.png',
      frameQuantity: 4,
      gridAlign: { width: 1, height: 4, cellWidth: 16, cellHeight: 8, x: 144, y: 98 }
    })

    this.whiteBricks2.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'white', points: 50, vitality: 1 })
    });

    this.orangeBricks2 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickOrange.png',
      frameQuantity: 3,
      gridAlign: { width: 1, height: 3, cellWidth: 16, cellHeight: 8, x: 160, y: 106 }
    })

    this.orangeBricks2.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'orange', points: 60, vitality: 1 })
    });

    this.brownBricks2 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickBrown.png',
      frameQuantity: 2,
      gridAlign: { width: 1, height: 2, cellWidth: 16, cellHeight: 8, x: 176, y: 114 }
    })

    this.brownBricks2.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'brown', points: 70, vitality: 1 })
    });

    this.greenBricks2 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickGreen.png',
      frameQuantity: 1,
      gridAlign: { width: 1, height: 1, cellWidth: 16, cellHeight: 8, x: 192, y: 122 }
    })

    this.greenBricks2.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'green', points: 80, vitality: 1 })
    });

    this.silverBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickSilver.png',
      frameQuantity: 12,
      gridAlign: { width: 12, height: 1, cellWidth: 16, cellHeight: 8, x: 16, y: 130 }
    })

    this.silverBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'silver', points: 50 * this.currentLevelNumber, vitality: 2 })
    });

    /**
     * At the end of every level, you have to have a 
     * this.destructibleBricks and a this.bricks group.
     * Then, add the collider between the ball and the bricks.
     */

    this.destructibleBricks = new Phaser.GameObjects.Group(this, this.whiteBricks1.getChildren())
    this.destructibleBricks.addMultiple(this.orangeBricks1.getChildren())
    this.destructibleBricks.addMultiple(this.brownBricks1.getChildren())
    this.destructibleBricks.addMultiple(this.greenBricks1.getChildren())
    this.destructibleBricks.addMultiple(this.redBricks.getChildren())
    this.destructibleBricks.addMultiple(this.blueBricks.getChildren())
    this.destructibleBricks.addMultiple(this.pinkBricks.getChildren())
    this.destructibleBricks.addMultiple(this.yellowBricks.getChildren())
    this.destructibleBricks.addMultiple(this.whiteBricks2.getChildren())
    this.destructibleBricks.addMultiple(this.orangeBricks2.getChildren())
    this.destructibleBricks.addMultiple(this.brownBricks2.getChildren())
    this.destructibleBricks.addMultiple(this.greenBricks2.getChildren())
    this.destructibleBricks.addMultiple(this.silverBricks.getChildren())

    this.bricks = new Phaser.GameObjects.Group(this, this.destructibleBricks.getChildren())

    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this)
  }
}