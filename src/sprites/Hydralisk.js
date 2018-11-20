import BoardPlugin from '../plugins/rexboardplugin.min';

class Hydralisk extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.hp = hydraliskHP;
        this.damage = 100;
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.pathFinder = scene.rexBoard.add.pathFinder(this, {
            occupiedTest: true,
            pathMode: 'A*',
        });
    }

    moveToEnd() {
        let pathToEnd = this.pathFinder.findPath({
            x: 119,
            y: Math.round(this.body.y/16) - 10
        });
        this.path = this.scene.add.path(
            (this.body.x),
            (this.body.y)
        );
        for (let tile of pathToEnd) {
            this.path.lineTo(
                (tile.x * 16),
                (tile.y * 16) + 160    
            )
        }
        if (pathToEnd[pathToEnd.length-1].x != 119) {
            this.path = this.scene.add.path(
                (this.body.x),
                (this.body.y)
            )
            this.path.lineTo(
                1904,
                (this.body.y)
            )
        }
    }
    
    update(time, delta) {
        let prevX = this.follower.vec.x,
        prevY = this.follower.vec.y;

        this.follower.t += (hydraliskSpeed / (this.path.getLength() * 60));
        this.path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
        if (this.follower.vec.x > prevX) {
            if (this.follower.vec.y > prevY) {
                // if (Math.abs(this.follower.vec.x) < Math.abs(this.follower.vec.y)) {
                //     this.anims.play('hydra_dldiag', true).setFlipX(false);
                // } else if (Math.abs(this.follower.vec.x) > Math.abs(this.follower.vec.y)) {
                //     this.anims.play('hydra_dhdiag', true).setFlipX(false);
                // } else {
                    this.anims.play('hydra_ddiag', true).setFlipX(false);
                // }
            } else if (this.follower.vec.y < prevY) {
                // if (Math.abs(this.follower.vec.x) < Math.abs(this.follower.vec.y)) {
                //     this.anims.play('hydra_uhdiag', true).setFlipX(false);
                // } else if (Math.abs(this.follower.vec.x) > Math.abs(this.follower.vec.y)) {
                //     this.anims.play('hydra_uldiag', true).setFlipX(false);
                // } else {
                    this.anims.play('hydra_udiag', true).setFlipX(false);
                // }
            } else {
                this.anims.play('hydra_side', true).setFlipX(false);
            }
        } else if (this.follower.vec.x < prevX) {
            if (this.follower.vec.y > prevY) {
            //     if (Math.abs(this.follower.vec.x) < Math.abs(this.follower.vec.y)) {
            //         this.anims.play('hydra_dldiag', true).setFlipX(true);
            //     } else if (Math.abs(this.follower.vec.x) > Math.abs(this.follower.vec.y)) {
            //         this.anims.play('hydra_dhdiag', true).setFlipX(true);
            //     } else {
                    this.anims.play('hydra_ddiag', true).setFlipX(true);
            //     }
            } else if (this.follower.vec.y < prevY) {
            //     if (Math.abs(this.follower.vec.x) < Math.abs(this.follower.vec.y)) {
            //         this.anims.play('hydra_uhdiag', true).setFlipX(true);
            //     } else if (Math.abs(this.follower.vec.x) > Math.abs(this.follower.vec.y)) {
            //         this.anims.play('hydra_uldiag', true).setFlipX(true);
            //     } else {
                    this.anims.play('hydra_udiag', true).setFlipX(true);
            //     }
            } else {
                this.anims.play('hydra_side', true).setFlipX(true);
            }
        } else {
            if (this.follower.vec.y > prevY) {
                this.anims.play('hydra_down', true);
            } else if (this.follower.vec.y < prevY) {
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
            let corpse = deaths.create(x, y, 'hydralisk').anims.play('hydra_corpse').on('animationcomplete', () => {
                corpse.destroy();
            });
            Phaser.Actions.Call(headtowers.getChildren(), tower => {
                death.scene.children.bringToTop(tower);
            }, this);
            Phaser.Actions.Call(lurkers.getChildren(), lurker => {
                death.scene.children.bringToTop(lurker);
            }, this);
            Phaser.Actions.Call(hydralisks.getChildren(), hydralisk => {
                death.scene.children.bringToTop(hydralisk);
            }, this);
            Phaser.Actions.Call(bullets.getChildren(), bullet => {
                death.scene.children.bringToTop(bullet);
            }, this);
            death.destroy();
        }, this);
        Phaser.Actions.Call(headtowers.getChildren(), tower => {
            this.scene.children.bringToTop(tower);
        }, this);
        Phaser.Actions.Call(lurkers.getChildren(), lurker => {
            this.scene.children.bringToTop(lurker);
        }, this);
        Phaser.Actions.Call(hydralisks.getChildren(), hydralisk => {
            this.scene.children.bringToTop(hydralisk);
        }, this);
        Phaser.Actions.Call(bullets.getChildren(), bullet => {
            this.scene.children.bringToTop(bullet);
        }, this);
    }
}

export default Hydralisk;