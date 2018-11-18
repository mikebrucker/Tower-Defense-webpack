import Cursor from '../assets/images/cursor.cur'
import RedCursor from '../assets/images/redcursor.cur'

class HUDisplay extends Phaser.Scene {
    
    constructor() {
        super('HUDisplay');
    }

    create() {
        let titleCard = this.add.text(496, 300, 'Tower Defense', {fontSize: '120px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 6 }).setOrigin(0.5);
        this.add.tween({
            targets: titleCard,
            ease: 'Sine.easeInOut',
            duration: 4000,
            alpha: {
                getStart: () => 1,
                getEnd: () => 0
            }
        });

        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000).fillRect(0, 542, 992, 100).setAlpha(0.5);
        let line = this.add.graphics();
        line.fillStyle(0xB22222, 1).fillRect(0, 542, 992, 4);
        let topline = this.add.graphics();
        topline.fillStyle(0xFF4848, 1).fillRect(0, 541, 992, 1);
        topline.fillStyle(0xFF4848, 1).fillRect(0, 546, 992, 1);

        towerDamageDisplay = this.add.text(4, 0, `Tower Damage: ${towerDamage}`, {fontSize: '20px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 3 }).setOrigin(0);
        numberOfTowersDisplay = this.add.text(4, 24, `Towers: ${numberOfTowers}`, {fontSize: '20px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 3 }).setOrigin(0);
        waveNumberDisplay = this.add.text(4, 48, `Wave: 1`, {fontSize: '20px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 3 }).setOrigin(0);

        resourcesDisplay = this.add.text(324, 0, `Resources: ${resources}`, {fontSize: '20px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 3 }).setOrigin(0.5, 0);
        timerDisplay = this.add.text(496, 0, '', {fontSize: '20px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 3 }).setOrigin(0.5, 0);
        killsDisplay = this.add.text(648, 0, `Kills: ${kills}`, {fontSize: '20px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 3 }).setOrigin(0.5, 0);

        hydralisksEscapedDisplay = this.add.text(988, 0, `Hydralisks Escaped: ${hydralisksEscaped}`, {fontSize: '20px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 3 }).setOrigin(1, 0);
        hydraliskSpeedDisplay = this.add.text(988, 24, `Hydralisk Speed: ${hydraliskSpeed}`, {fontSize: '20px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 3 }).setOrigin(1, 0);
        hydraliskHPDisplay = this.add.text(988, 48, `Hydralisk HP: ${hydraliskHP}`, {fontSize: '20px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 3 }).setOrigin(1, 0);
        
        buildInfoText = this.add.text(496, 500, '', {fontSize: '40px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3  }).setOrigin(0.5);
        waveInfoText = this.add.text(496, 300, '', {fontSize: '60px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3  }).setOrigin(0.5);
        countDownText = this.add.text(496, 300, '', {fontSize: '160px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3  }).setOrigin(0.5);
        hydralisksEscapedInfoText = this.add.text(496, 500, '', {fontSize: '50px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3  }).setOrigin(0.5);
        pauseText = this.add.text(496, 300, '', {fontSize: '60px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3 }).setOrigin(0.5).setScrollFactor(0);

        demolishButton = this.add.text(4, 573, 'Demolish', {fontSize: '40px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 6 })
        .setInteractive().on('pointerdown', function() {
            build = false;
            demolish = !demolish;
            buildButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            if (demolish) {
                demolishButton.setFill('gold').setStroke('firebrick').setAlpha(1);
                this.input.setDefaultCursor(`url(${RedCursor}), pointer`);
            } else {
                demolishButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                this.input.setDefaultCursor(`url(${Cursor}), pointer`);
            }
        }, this).setAlpha(0.33).setOrigin(0, 0.5);
        
        this.add.text(316, 575, '1', {fontSize: '30px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 6 }).setOrigin(0.5);
        
        buildButton = this.add.text(252, 573, 'Build', {fontSize: '40px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 6 })
        .setInteractive().on('pointerdown', function() {
            if (resources > 0) {
                build = !build;
                demolish = false;
                this.input.setDefaultCursor(`url(${Cursor}), pointer`);
                demolishButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                if (build) {
                    buildButton.setFill('gold').setStroke('firebrick').setAlpha(1);
                } else {
                    buildButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                }
            }
        }, this).setAlpha(0.33).setOrigin(0.5);
        
        upgradeCostDisplay = this.add.text(524, 575, upgradeCost, {fontSize: '30px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 6 }).setOrigin(0.5);
        
        upgradeButton = this.add.text(424, 573, 'Upgrade', {fontSize: '40px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 6 })
        .setInteractive().on('pointerdown', function() {
            if (resources >= upgradeCost) {
                towerDamage++;
                for (let tower of headtowers.getChildren()) {
                    tower.damage = towerDamage;
                }
                this.sound.play('upgrade', sfx_config);
                resources -= upgradeCost;
                upgradeCost++;
                upgradeCostDisplay.setText(upgradeCost)
                upgradeButton.setFill('firebrick').setStroke('gold');
                resourcesDisplay.setText(`Resources: ${resources}`);
                towerDamageDisplay.setText(`Tower Damage: ${towerDamage}`);
                if (resources === 0) {
                    build = false;
                    buildButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                }
            }
        }, this)
        .setInteractive().on('pointerup', function() {
            if (resources >= upgradeCost) {
                upgradeButton.setFill('gold').setStroke('firebrick').setAlpha(1);
            } else {
                upgradeButton.setFill('firebrick').setStroke('gold').setAlpha(0.33)
            }
        }, this).setOrigin(0.5);
        
        pauseButton = this.add.text(712, 582, 'Pause', {fontSize: '18px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3 })
        .setInteractive().on('pointerdown', function() {
            pauseOn = !pauseOn;
            if (pauseOn) {
                this.scene.pause('GameScene');
    
                gameFocus = false;
    
                pauseButton.setFill('gold').setStroke('firebrick').setAlpha(1);
                pauseText.setText('Game Paused')
            } else {              
                this.scene.resume('GameScene');
    
                gameFocus = true;
    
                pauseButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                pauseText.setText('')
            }
        }, this).setOrigin(0.5).setAlpha(0.33);

        musicButton = this.add.text(628, 562, 'Music', {fontSize: '18px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 3})
        .setInteractive().on('pointerdown', function() {
            musicOn = !musicOn;
            if (musicOn) {
                game_track.resume();
                musicButton.setFill('gold').setStroke('firebrick').setAlpha(1);
            } else {
                musicButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                game_track.pause();
            }
        }, this).setOrigin(0.5);

        sfxButton = this.add.text(628, 582, 'Sound FX', {fontSize: '18px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 3})
        .setInteractive().on('pointerdown', function() {
            sfxOn = !sfxOn;
            if (sfxOn) {
                sfx_config.mute = false;
                sfxButton.setFill('gold').setStroke('firebrick').setAlpha(1);
            } else {
                this.sound.pauseAll();
                if (musicOn) {
                    game_track.resume();
                }
                sfx_config.mute = true;
                sfxButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            }
        }, this).setOrigin(0.5);

        nextWaveButton = this.add.text(988, 573, 'Next Wave', {fontSize: '40px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 6})
        .setInteractive().on('pointerdown', function() {
            if (clickNextWave) {
                min = 0;
                sec = 4;
                nextWaveButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            }
            clickNextWave = false;
        }, this).setOrigin(1, 0.5);

        min = 1;
        sec = 16;
        timer = setInterval( () => {
            if (gameFocus) {
                sec--;
                if (sec < 5 || hydralisks.countActive(true) > 6 || sec > 40) {
                    nextWaveButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                    clickNextWave = false;
                } else if (hydralisks.countActive(true) < 7) {
                    nextWaveButton.setFill('gold').setStroke('firebrick').setAlpha(1);
                    clickNextWave = true;
                }
                if (sec < 0) {
                    min--;
                    sec = 59;
                }
                if (min < 0) {
                    waveNumber++;
                    timerDisplay.setText('');
                    min = 0;
                    sec = 46;
                    if (waveNumber < 31) {
                        if (waveNumber > 1) {
                            if (waveNumber % 2 === 0) {
                                hydraliskHPIncrease++;
                            }
                            hydraliskHP += hydraliskHPIncrease;
                            if (waveNumber > 15) {
                                hydraliskSpeed += 2;
                            } else {
                                hydraliskSpeed++;
                            }
                        }
                        if (waveNumber % 5 === 0 && waveNumber > 5) {
                            lurkerHP += lurkerHPIncrease;
                            lurkerSpeed += 2;
                            lurkerHPIncrease += lurkerHPIncrease / 2
                        }
                        this.nextWave();
                        waveInfoText.setText(`Wave ${waveNumber}`);
                        waveNumberDisplay.setText(`Wave: ${waveNumber}`);
                        hydraliskHPDisplay.setText(`Hydralisk HP: ${hydraliskHP}`);
                        hydraliskSpeedDisplay.setText(`Hydralisk Speed: ${hydraliskSpeed}`);    
                    }
                    this.add.tween({
                        targets: waveInfoText,
                        ease: 'Sine.easeInOut',
                        duration: 5000,
                        alpha: {
                            getStart: () => 1,
                            getEnd: () => 0
                        }
                    });
                } else if (sec < 10) {
                    timerDisplay.setText(`${min}:0${sec}`);
                } else {
                    timerDisplay.setText(`${min}:${sec}`);
                }
                if (sec > 0 && sec < 4) {
                    this.sound.play('beep', sfx_config);
                    countDownText.setText(sec)
                    this.add.tween({
                        targets: countDownText,
                        ease: 'Sine.easeInOut',
                        duration: 1500,
                        alpha: {
                            getStart: () => 1,
                            getEnd: () => 0
                        }
                    });
                }
            }
        }, 1000);
    }

    nextWave() {
        let birthTime = 0;
        game.sound.play('egg', sfx_config);
        if (waveNumber % 5 === 0) {
            birthTime = 2500;
            let lurkerbirth = births.create(-100, 332, 'lurker');
            lurkerbirth.anims.play('lurker_birth').on('animationcomplete', () => {
                game.sound.play('lurker_birth', sfx_config);
                lurkerbirth.destroy;
            }, this);
    
            let bossWave = waveNumber / 5;
            let j = 0;
            let k = 0;
            for (let i = 0; i < bossWave; i++) {
                if (i === 3) {
                    k = 90;
                }
                let lurkerbirth = births.create(151 - k, (j * 90) + 512, 'lurker');
                lurkerbirth.anims.play('lurker_birth').on('animationcomplete', () => {
                    let lurker = lurkers.get(lurkerbirth.x, lurkerbirth.y, 'lurker');
                    // lurker.follower.t = (450 - (i * 90)) / lurkerpath.getLength();
                    lurker.body.setCircle(16, 19, 17)
                    lurkerbirth.destroy();
                }, this);
                if (i < 2) {
                    j--;
                } else if (i > 2) {
                    j++;
                }
            }
        }
        setTimeout( () => {
            let j = 0;
            let k = 0;
            let birth = births.create(-100, 512, 'hydralisk');
            birth.anims.play('hydra_birth').on('animationcomplete', () => {
                game.sound.play('hydra_birth', sfx_config);
                birth.destroy();
            }, this);
            for (let i = 0; i < 24; i++) {
                if (i % 4 === 0 && i > 0) {
                    j = 0;
                }
                if (i % 4 === 0 && i > 0) {
                    k++;
                }
                let birth = births.create((j * 36) + 52, (k * 36) + 332, 'hydralisk');
                birth.anims.play('hydra_birth').on('animationcomplete', () => {
                    let hydra = hydralisks.get(birth.x, birth.y, 'hydralisk');
                    board.addChess(hydra, Math.round(hydra.body.x/16), Math.round(hydra.body.y/16) -10, i, false);
                    // hydra.follower.t = (i * 36) / path.getLength();
                    hydra.body.setCircle(16, 6, 13);
                    hydra.moveToEnd();
                    birth.destroy();
                }, this);
                j++;
            }
        }, birthTime)
    }
}

export default HUDisplay;