import BoardPlugin from '../plugins/rexboardplugin.min';
import Hydralisk from './Hydralisk';

class Lurker extends Hydralisk {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.hp = lurkerHP
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
    
        this.follower.t += (lurkerSpeed / (this.path.getLength() * 60));
    
        this.path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
        if (this.follower.vec.x > prevX) {
            if (this.follower.vec.y > prevY + 2) {
                // if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
                //     this.anims.play('lurker_dldiag', true).setFlipX(false);
                // } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                //     this.anims.play('lurker_dhdiag', true).setFlipX(false);
                // } else {
                    this.anims.play('lurker_ddiag', true).setFlipX(false);
                // }
            } else if (this.follower.vec.y < prevY - 2) {
                // if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
                //     this.anims.play('lurker_uhdiag', true).setFlipX(false);
                // } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                //     this.anims.play('lurker_uldiag', true).setFlipX(false);
                // } else {
                    this.anims.play('lurker_udiag', true).setFlipX(false);
                // }
            } else {
                this.anims.play('lurker_side', true).setFlipX(false);
            }
        } else if (this.follower.vec.x < prevX) {
            if (this.follower.vec.y > prevY + 2) {
            //     if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
            //         this.anims.play('lurker_dldiag', true).setFlipX(true);
            //     } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
            //         this.anims.play('lurker_dhdiag', true).setFlipX(true);
            //     } else {
                    this.anims.play('lurker_ddiag', true).setFlipX(true);
            //     }
            } else if (this.follower.vec.y < prevY - 2) {
            //     if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
            //         this.anims.play('lurker_uhdiag', true).setFlipX(true);
            //     } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
            //         this.anims.play('lurker_uldiag', true).setFlipX(true);
            //     } else {
                    this.anims.play('lurker_udiag', true).setFlipX(true);
            //     }
            } else {
                this.anims.play('lurker_side', true).setFlipX(true);
            }
        } else {
            if (this.follower.vec.y > prevY) {
                this.anims.play('lurker_down', true);
            } else if (this.follower.vec.y < prevY) {
                this.anims.play('lurker_up', true);
            } else {
                this.anims.play('lurker_stop');
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
            game.sound.play('lurker_death', sfx_config);
            this.destroy();
            resources += 2;
            kills++;
            killsDisplay.setText(`Kills: ${kills}`)
            if (kills % 8 === 0) {
                resources += 1;
            }
            resourcesDisplay.setText(`Resources: ${resources}`)
            if (resources >= upgradeCost) {
                upgradeButton.setFill('gold').setStroke('firebrick').setAlpha(1);
            } else {
                upgradeButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            }
        }
    }
    
    deathAnimation(x, y) {
        let death = deaths.create(x, y, 'lurker').anims.play('lurker_death').on('animationcomplete', () => {
            death.destroy();
        });
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

export default Lurker;