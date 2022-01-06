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
    this.greenBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickGreen.png',
      frameQuantity: 13,
      gridAlign: { width: 13, height: 1, cellWidth: 16, cellHeight: 8, x: 8, y: 32 }
    }).setOrigin(0)

    this.greenBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'green', points: 120, vitality: 1 })
    });

    this.whiteBricks1 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickWhite.png',
      frameQuantity: 3,
      gridAlign: { width: 3, height: 1, cellWidth: 16, cellHeight: 8, x: 8, y: 48 }
    }).setOrigin(0)

    this.whiteBricks1.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'green', points: 120, vitality: 1 })
    });

    this.goldBricks1 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickGold.png',
      frameQuantity: 10,
      gridAlign: { width: 10, height: 1, cellWidth: 16, cellHeight: 8, x: 56, y: 48 }
    }).setOrigin(0)

    this.goldBricks1.getChildren().forEach(brick => {
      brick.setData({ isDestructible: false, color: 'gold', points: 0, vitality: 0 })
    });

    this.redBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickRed.png',
      frameQuantity: 13,
      gridAlign: { width: 13, height: 1, cellWidth: 16, cellHeight: 8, x: 8, y: 64 }
    }).setOrigin(0)

    this.redBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'red', points: 120, vitality: 1 })
    });

    this.goldBricks2 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickGold.png',
      frameQuantity: 10,
      gridAlign: { width: 10, height: 1, cellWidth: 16, cellHeight: 8, x: 8, y: 80 }
    }).setOrigin(0)

    this.goldBricks2.getChildren().forEach(brick => {
      brick.setData({ isDestructible: false, color: 'gold', points: 0, vitality: 0 })
    });

    this.whiteBricks2 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickWhite.png',
      frameQuantity: 3,
      gridAlign: { width: 3, height: 1, cellWidth: 16, cellHeight: 8, x: 168, y: 80 }
    }).setOrigin(0)

    this.whiteBricks2.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'white', points: 0, vitality: 1 })
    });

    this.pinkBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickPink.png',
      frameQuantity: 13,
      gridAlign: { width: 13, height: 1, cellWidth: 16, cellHeight: 8, x: 8, y: 96 }
    }).setOrigin(0)

    this.pinkBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'pink', points: 0, vitality: 1 })
    });

    this.blueBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickBlue.png',
      frameQuantity: 3,
      gridAlign: { width: 3, height: 1, cellWidth: 16, cellHeight: 8, x: 8, y: 112 }
    }).setOrigin(0)

    this.blueBricks.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'blue', points: 0, vitality: 1 })
    });

    this.goldBricks3 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickGold.png',
      frameQuantity: 10,
      gridAlign: { width: 10, height: 1, cellWidth: 16, cellHeight: 8, x: 56, y: 112 }
    }).setOrigin(0)

    this.goldBricks3.getChildren().forEach(brick => {
      brick.setData({ isDestructible: false, color: 'gold', points: 0, vitality: 0 })
    });

    this.brownBricks1 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickBrown.png',
      frameQuantity: 13,
      gridAlign: { width: 13, height: 1, cellWidth: 16, cellHeight: 8, x: 8, y: 128 }
    }).setOrigin(0)

    this.brownBricks1.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'brown', points: 0, vitality: 1 })
    });

    this.goldBricks4 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickGold.png',
      frameQuantity: 10,
      gridAlign: { width: 10, height: 1, cellWidth: 16, cellHeight: 8, x: 8, y: 144 }
    }).setOrigin(0)

    this.goldBricks4.getChildren().forEach(brick => {
      brick.setData({ isDestructible: false, color: 'gold', points: 0, vitality: 0 })
    });

    this.brownBricks2 = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickBrown.png',
      frameQuantity: 3,
      gridAlign: { width: 3, height: 1, cellWidth: 16, cellHeight: 8, x: 168, y: 144 }
    }).setOrigin(0)

    this.brownBricks2.getChildren().forEach(brick => {
      brick.setData({ isDestructible: true, color: 'brown', points: 0, vitality: 1 })
    });

    /**
     * At the end of every level, you have to have a 
     * this.destructibleBricks and a this.bricks group.
     * Then, add the collider between the ball and the bricks.
     */

    this.destructibleBricks = new Phaser.GameObjects.Group(this, this.greenBricks.getChildren())
    this.destructibleBricks.addMultiple(this.whiteBricks1.getChildren())
    this.destructibleBricks.addMultiple(this.redBricks.getChildren())
    this.destructibleBricks.addMultiple(this.whiteBricks2.getChildren())
    this.destructibleBricks.addMultiple(this.pinkBricks.getChildren())
    this.destructibleBricks.addMultiple(this.blueBricks.getChildren())
    this.destructibleBricks.addMultiple(this.brownBricks1.getChildren())
    this.destructibleBricks.addMultiple(this.brownBricks2.getChildren())


    this.bricks = new Phaser.GameObjects.Group(this, this.destructibleBricks.getChildren())
    this.bricks.addMultiple(this.goldBricks1.getChildren())
    this.bricks.addMultiple(this.goldBricks2.getChildren())
    this.bricks.addMultiple(this.goldBricks3.getChildren())
    this.bricks.addMultiple(this.goldBricks4.getChildren())

    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this)
  }
}