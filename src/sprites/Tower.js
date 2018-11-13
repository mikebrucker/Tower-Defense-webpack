class Tower extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.hp = 10;
        this.damage = towerDamage;  
        this.name = 'tower';
        this.timeToShoot = 60;
        this.range = 200;
        this.target = false;
    }
    
    update(time, delta) {
        this.timeToShoot++;
        if (this.timeToShoot > 59 && this.target.active) {      
            this.fire();          
            this.timeToShoot = 0;
            let angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
            if (angle > .875 * Math.PI || angle <= -.875 * Math.PI) {
                this.anims.play('headtower_le', true);
            } else if (angle > .625 * Math.PI && angle <= .875 * Math.PI) {
                this.anims.play('headtower_dl', true);
            } else if (angle > .375 * Math.PI && angle <= .625 * Math.PI) {
                this.anims.play('headtower_do', true);
            } else if (angle > .125 * Math.PI && angle <= .375 * Math.PI) {
                this.anims.play('headtower_dr', true);
            } else if (angle <= .125 * Math.PI && angle > -.125 * Math.PI) {
                this.anims.play('headtower_ri', true);
            } else if (angle <= -.125 * Math.PI && angle > -.375 * Math.PI) {
                this.anims.play('headtower_ur', true);
            } else if (angle <= -.375 * Math.PI && angle > -.625 * Math.PI) {
                this.anims.play('headtower_up', true);
            } else if (angle <= -.625 * Math.PI && angle > -.875 * Math.PI) {
                this.anims.play('headtower_ul', true);
            }
        }

        if (!this.target || !this.target.active || Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) >= this.range) {
            this.target = this.getEnemy(this.range);
        }
    }
    
    fire() {
        if (this.target.active) {
            if (bulletSoundsPlayed < 16) {
                bulletSoundsPlayed++;
                let bulletSound = game.sound.add('bullet', sfx_config);
                bulletSound.play();
                bulletSound.once('ended', () => {
                    bulletSoundsPlayed--;
                });
                bulletSound.once('pause', () => {
                    bulletSoundsPlayed--;
                    bulletSound.destroy()
                });
            }
            let bullet = bullets.get(this.x, this.y, 'bullet_single', 0);
            bullet.body.setCircle(2);
            bullet.target = this.target;
            bullet.damage = this.damage;
        }
    }

    getEnemy() {
        let enemyHydras = hydralisks.getChildren();
        let enemyLurkers = lurkers.getChildren();
        let enemiesInRange = [];
        for (let hydra of enemyHydras) {
            if (hydra.x > 223) {
                if (hydra.active && Phaser.Math.Distance.Between(this.x, this.y, hydra.x, hydra.y) <= this.range) {
                    enemiesInRange.push([Phaser.Math.Distance.Between(this.x, this.y, hydra.x, hydra.y), hydra]);
                }
            }
        }
        for (let lurker of enemyLurkers) {
            if (lurker.x > 223) {
                if (lurker.active && Phaser.Math.Distance.Between(this.x, this.y, lurker.x, lurker.y) <= this.range) {
                    enemiesInRange.push([Phaser.Math.Distance.Between(this.x, this.y, lurker.x, lurker.y), lurker]);
                }
            }
        }
        enemiesInRange.sort(function([a], [b]) { return a - b });
        if (enemiesInRange.length > 0) {
            return enemiesInRange[0][1];
        } else {
            return false;
        }
    }
}

export default Tower;