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
    this.bgTileFrame = 'bg-lv1.png'
    super.create()
    this.nextLevel = 'Cutscene_1'

    // add bricks
    this.silverBricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: 'brickSilver.png',
      frameQuantity: 1,
      gridAlign: { width: 1, height: 1, cellWidth: 16, cellHeight: 8, x: 16, y: 50 }
    })

    this.silverBricks.getChildren().forEach(brick => {
      brick.setData({
        isDestructible: true,
        color: 'silver',
        points: 50 * this.currentLevelNumber,
        vitality: this.currentLevelNumber + 1
      })
    });

    /**
     * At the end of every level, you have to have a
     * this.destructibleBricks and a this.bricks group.
     * Then, add the collider between the ball and the bricks.
     */

    this.destructibleBricks = new Phaser.GameObjects.Group(this, this.silverBricks.getChildren())

    this.bricks = new Phaser.GameObjects.Group(this, this.destructibleBricks.getChildren())
    // this.bricks.addMultiple(this.goldBricks.getChildren())

    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this)
  }
}