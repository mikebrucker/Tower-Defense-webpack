import BoardPlugin from '../plugins/rexboardplugin.min';

class Hydralisk extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.hp = hydraliskHP;
        this.damage = 100;
        this.lastTile = null;
        // this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.moveTo = scene.rexBoard.add.moveTo(this, {
            speed: hydraliskSpeed,
            // blockerTest: true
        });
        this.pathFinder = scene.rexBoard.add.pathFinder(this, {
            occupiedTest: true,
            pathMode: 'A*',
        });
    }

    moveToEnd() {
        if (this.moveTo.isRunning) {
            return false;
        }
        let pathToEnd = this.pathFinder.findPath({
            x: 119,
            y: Math.round(this.body.y/16) - 10
        })
        this.moveAlongPath(pathToEnd);
        return true;
    }

    moveAlongPath(path) {
        if (path.length === 0) {
            return;
        }

        this.moveTo.once('complete', function () {
            this.moveAlongPath(path);
        }, this);
        this.lastTile = path[0];
        this.moveTo.moveTo(path.shift());
        return this;
    }
    
    update(time, delta) {
        let prevX = this.lastTile.x,
        prevY = this.lastTile.y;

        // this.follower.t += (hydraliskSpeed / (path.getLength() * 60));
    
        // path.getPoint(this.follower.t, this.follower.vec);
        
        // this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
        if (this.body.x > prevX) {
            if (this.body.y > prevY) {
                // if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
                //     this.anims.play('hydra_dldiag', true).setFlipX(false);
                // } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                //     this.anims.play('hydra_dhdiag', true).setFlipX(false);
                // } else {
                    this.anims.play('hydra_ddiag', true).setFlipX(false);
                // }
            } else if (this.body.y < prevY) {
                // if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
                //     this.anims.play('hydra_uhdiag', true).setFlipX(false);
                // } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                //     this.anims.play('hydra_uldiag', true).setFlipX(false);
                // } else {
                    this.anims.play('hydra_udiag', true).setFlipX(false);
                // }
            } else {
                this.anims.play('hydra_side', true).setFlipX(false);
            }
        } else if (this.body.x < prevX) {
            if (this.body.y > prevY) {
            //     if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
            //         this.anims.play('hydra_dldiag', true).setFlipX(true);
            //     } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
            //         this.anims.play('hydra_dhdiag', true).setFlipX(true);
            //     } else {
                    this.anims.play('hydra_ddiag', true).setFlipX(true);
            //     }
            } else if (this.body.y < prevY) {
            //     if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
            //         this.anims.play('hydra_uhdiag', true).setFlipX(true);
            //     } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
            //         this.anims.play('hydra_uldiag', true).setFlipX(true);
            //     } else {
                    this.anims.play('hydra_udiag', true).setFlipX(true);
            //     }
            } else {
                this.anims.play('hydra_side', true).setFlipX(true);
            }
        } else {
            if (this.body.y > prevY) {
                this.anims.play('hydra_down', true);
            } else if (this.body.y < prevY) {
                this.anims.play('hydra_up', true);
            } else {
                this.anims.play('hydra_stop');
            }
        }
        
        if (this.body.x > 1808) {
            hydralisksEscaped++; 
            if (hydralisksEscaped === 1) {
                hydralisksEscapedInfoText.setText(`A Hydralisk Has Escaped`)
            } else {
                hydralisksEscapedInfoText.setText(`${hydralisksEscaped} Hydralisks Have Escaped`)
            }
            hydralisksEscapedDisplay.setText(`Hydralisks Escaped: ${hydralisksEscaped}`)
            this.scene.add.tween({
                targets: hydralisksEscapedInfoText,
                ease: 'Sine.easeInOut',
                duration: 4000,
                alpha: {
                    getStart: () => 1,
                    getEnd: () => 0
                }
            });
            game.sound.play('escape', sfx_config);
            this.destroy();
        }
    }
    
    receiveDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.deathAnimation(this.x, this.y);
            game.sound.play('hydra_death', sfx_config);
            this.destroy();
            kills++;
            killsDisplay.setText(`Kills: ${kills}`)
            if (kills % 8 === 0) {
                resources += 1;
                resourcesDisplay.setText(`Resources: ${resources}`)
                if (resources >= upgradeCost) {
                    upgradeButton.setFill('gold').setStroke('firebrick').setAlpha(1);
                } else {
                    upgradeButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                }
            }
        }
    }
    
    deathAnimation(x, y) {
        let death = deaths.create(x, y, 'hydralisk').anims.play('hydra_death').on('animationcomplete', () => {
            death.destroy();
            let corpse = deaths.create(x, y, 'hydralisk').anims.play('hydra_corpse').on('animationcomplete', () => {
                corpse.destroy();
            });
        });
    }
}

export default Hydralisk;