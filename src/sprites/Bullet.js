class Bullet extends Phaser.GameObjects.Image {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.dx = 0;
        this.dy = 0;
        this.speed = Phaser.Math.GetSpeed(600, 1);
        this.startX = x;
        this.startY = y;
        this.range = 220;
    }

    update(time, delta) {
        this.scene.physics.add.overlap(this.target, this, this.damageHydralisks);
        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);
        let angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);
        if (!this.target.active || Phaser.Math.Distance.Between(this.startX, this.startY, this.target.x, this.target.y) >= this.range || this.x < 0 || this.y < 0 || this.x > 1919 || this.y > 799) {
            this.destroy();
        }
    }

    damageHydralisks(hydralisk, bullet) {
        hydralisk.receiveDamage(bullet.damage);
        bullet.destroy();
    }
}

export default Bullet;