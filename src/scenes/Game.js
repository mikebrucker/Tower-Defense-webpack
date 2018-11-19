import Cursor from '../assets/images/cursor.cur';
import Bullet from '../sprites/Bullet';
import Tower from '../sprites/Tower';
import Hydralisk from '../sprites/Hydralisk';
import Lurker from '../sprites/Lurker';
import BoardPlugin from '../plugins/rexboardplugin.min';

class Game extends Phaser.Scene {
    
    constructor() {
        super('Game');
    }

    create() {
        game_track = this.sound.add('game_track', music_config);
        game_track.play();

        this.scene.launch('HUDisplay');
        this.input.setDefaultCursor(`url(${Cursor}), pointer`)
        
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('ashlands', 'tiles');
        const worldLayer = map.createDynamicLayer('World', tileset, 0, 0);
        const aboveLayer = map.createStaticLayer('Above', tileset, 0, 0);
        logWorldLayer = worldLayer.layer.data;
        
        // worldLayer.setCollisionBetween(259, 268, true, 'World');
        // worldLayer.setCollisionBetween(519, 534, true, 'World');
        
        board = this.rexBoard.add.board({
            grid: {
                gridType: 'quadGrid',
                x: 8,
                y: 168,
                cellWidth: 16,
                cellHeight: 16,
                type: 'orthogonal',
                dir: 8
            },
            width: 120,
            height: 30
        });

        path = this.add.path(124, 440);
        path.lineTo(124, 368);
        path.lineTo(88, 368);
        path.lineTo(88, 476);
        path.lineTo(160, 476);
        path.lineTo(160, 332);
        path.lineTo(52, 332);
        path.lineTo(52, 512);
        path.lineTo(432, 512);
        path.lineTo(432, 288);
        path.lineTo(656, 288);
        path.lineTo(656, 512);
        path.lineTo(864, 512);
        path.lineTo(864, 224);
        path.lineTo(960, 224);
        path.lineTo(960, 576);
        path.lineTo(1056, 576);
        path.lineTo(1056, 288);
        path.lineTo(1264, 288);
        path.lineTo(1264, 512);
        path.lineTo(1488, 512);
        path.lineTo(1488, 288);
        path.lineTo(1920, 288);

        lurkerpath = this.add.path(61, 512);
        lurkerpath.lineTo(61, 332);
        lurkerpath.lineTo(151, 332);
        lurkerpath.lineTo(151, 512);
        lurkerpath.lineTo(432, 512);
        lurkerpath.lineTo(432, 288);
        lurkerpath.lineTo(656, 288);
        lurkerpath.lineTo(656, 512);
        lurkerpath.lineTo(864, 512);
        lurkerpath.lineTo(864, 224);
        lurkerpath.lineTo(960, 224);
        lurkerpath.lineTo(960, 576);
        lurkerpath.lineTo(1056, 576);
        lurkerpath.lineTo(1056, 288);
        lurkerpath.lineTo(1264, 288);
        lurkerpath.lineTo(1264, 512);
        lurkerpath.lineTo(1488, 512);
        lurkerpath.lineTo(1488, 288);
        lurkerpath.lineTo(1920, 288);
        
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.centerToBounds();
        
        let cursors = this.input.keyboard.createCursorKeys(),
        controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5,
            disableCull: true,
        };
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
        
        headtowers = this.physics.add.group({
            classType: Tower, runChildUpdate: true, immovable: true
        });
        hydralisks = this.physics.add.group({
            classType: Hydralisk, runChildUpdate: true
        });
        lurkers = this.physics.add.group({
            classType: Lurker, runChildUpdate: true
        });
        bullets = this.physics.add.group({
            classType: Bullet, runChildUpdate: true
        });
        births = this.physics.add.group();
        deaths = this.physics.add.group();

        buildGraphic = this.add.image(0, 0, 'tower_overlay').setAlpha(0);
        
        // this.physics.add.collider(hydralisks, worldLayer);
        // this.physics.add.collider(hydralisks, headtowers);

        this.input.on('pointerdown', function(pointer) {
            if (build && !pointerOnNav) {
                let x = Math.round(pointer.worldX/16),
                y = Math.round(pointer.worldY/16);
    
                if (logWorldLayer[y][x].properties.buildable && logWorldLayer[y-1][x].properties.buildable && logWorldLayer[y][x-1].properties.buildable && logWorldLayer[y-1][x-1].properties.buildable) {
                    if (resources > 0) {
                        let headtower = headtowers.get(x*16, y*16, 'headtower')
                        .setInteractive().anims.play('headtower_do').body.setCircle(16);
                        this.sound.play('build_tower', sfx_config);

                        numberOfTowers++;
                        numberOfTowersDisplay.setText(`Towers: ${numberOfTowers}`);
    
                        logWorldLayer[y][x].properties.buildable = false;
                        logWorldLayer[y-1][x].properties.buildable = false;
                        logWorldLayer[y][x-1].properties.buildable = false;
                        logWorldLayer[y-1][x-1].properties.buildable = false;

                        this.rexBoard.add.shape(board, x-1, y-11, 0, 0, 0).rexChess.setBlocker();
                        this.rexBoard.add.shape(board, x, y-11, 0, 0, 0).rexChess.setBlocker();
                        this.rexBoard.add.shape(board, x-1, y-10, 0, 0, 0).rexChess.setBlocker();
                        this.rexBoard.add.shape(board, x, y-10, 0, 0, 0).rexChess.setBlocker();

                        resources--;
                        resourcesDisplay.setText(`Resources: ${resources}`)
                        if (resources >= upgradeCost) {
                            upgradeButton.setFill('gold').setStroke('firebrick').setAlpha(1);
                        } else {
                            upgradeButton.setFill('firebrick').setStroke('gold').setAlpha(0.33)
                        }            
        
                        buildInfoText.setText('');
                        if (resources === 0) {
                            build = false;
                            buildButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                        }
                    } else {
                        buildInfoText.setText('Need Additional Resources');
                    }
                } else {
                    buildInfoText.setText('Cannot Build Here');
                    this.sound.play('error', sfx_config);
                }
                this.add.tween({
                    targets: buildInfoText,
                    ease: 'Sine.easeInOut',
                    duration: 2000,
                    alpha: {
                        getStart: () => 1,
                        getEnd: () => 0
                    }
                });
            }
        }, this);
        
        this.input.on('gameobjectdown', function (pointer, gameObject) {
            let demolishInfoText = this.add.text(496, 500, '', {fontSize: '40px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3 }).setScrollFactor(0).setOrigin(0.5);
            if (demolish && !pointerOnNav && gameObject instanceof Tower) {
                let x = Math.round(gameObject.x/16),
                y = Math.round(gameObject.y/16);
                
                gameObject.destroy();
                this.sound.play('demolish_tower', sfx_config);

                numberOfTowers--;
                numberOfTowersDisplay.setText(`Towers: ${numberOfTowers}`);
                
                demolishInfoText.setText(`Tower Removed at (${x*16}, ${y*16})`)
                this.add.tween({
                    targets: demolishInfoText,
                    ease: 'Sine.easeInOut',
                    duration: 2000,
                    alpha: {
                        getStart: () => 1,
                        getEnd: () => 0
                    }
                });
                
                logWorldLayer[y][x].properties.buildable = true;
                logWorldLayer[y-1][x].properties.buildable = true;
                logWorldLayer[y][x-1].properties.buildable = true;
                logWorldLayer[y-1][x-1].properties.buildable = true;

                board.removeChess(null, x-1, y-11, 0, true);
                board.removeChess(null, x, y-11, 0, true);
                board.removeChess(null, x-1, y-10, 0, true);
                board.removeChess(null, x, y-10, 0, true);
            }
        }, this);
        
        game.events.on('blur', function() {
            this.scene.pause();

            gameFocus = false;
            musicOn = false;
            sfxOn = false;
            
            this.sound.pauseAll();
            sfx_config.mute = true;
            
            sfxButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            musicButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
        }, this);
        game.events.on('focus', function() {
            if (!pauseOn) {
                this.scene.resume();
    
                gameFocus = true;
            }
        }, this);
    }
    
    update(time, delta) {
        controls.update(delta);
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE).isDown) {
            this.cameras.main.setZoom(1);
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO).isDown) {
            this.cameras.main.setZoom(1.25);
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE).isDown) {
            this.cameras.main.setZoom(1.5);
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR).isDown) {
            this.cameras.main.setZoom(1.75);
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE).isDown) {
            this.cameras.main.setZoom(2);
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO).isDown) {
            if (this.cameras.main.displayHeight > 256) {
            this.cameras.main.zoom = this.cameras.main.zoom += 0.05;
            }
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE).isDown) {
            if (this.cameras.main.displayHeight < 800) {
                this.cameras.main.zoom = this.cameras.main.zoom -= 0.05;
            }
        }

        let pointer = this.input.activePointer;
        if (build && resources > 0) {
            let x = Math.round(pointer.worldX/16),
            y = Math.round(pointer.worldY/16);

            buildGraphic.setPosition(x*16, y*16).setAlpha(1);

            if (logWorldLayer[y][x].properties.buildable && logWorldLayer[y-1][x].properties.buildable && logWorldLayer[y][x-1].properties.buildable && logWorldLayer[y-1][x-1].properties.buildable) {
                buildGraphic.setTint(0x00FF00);
            } else {
                buildGraphic.setTint(0xFF0000);
            }
        } else {
            buildGraphic.setAlpha(0);
        }
        if (pointer.y > 542) {
            pointerOnNav = true;
            buildGraphic.setPosition(-32, -32);
        } else {
            pointerOnNav = false;
        }

        if (!gameOver) {
            if ( (waveNumber >= 30 && sec < 40 && hydralisks.countActive(true) === 0 && lurkers.countActive(true) === 0) || hydralisksEscaped > 19) {
                gameOver = true;
                this.scene.launch('GameOver');
                if (hydralisksEscaped > 19) {
                    this.sound.play('lose', sfx_config);
                } else {
                    this.sound.play('victory', sfx_config);
                }
                sfx_config.mute = true;
                game_track.stop();
                clearInterval(timer);
                clearInterval(nextWaveInterval);
                this.scene.setVisible(false, 'HUDisplay');
                this.add.text(496, 300, ' ').setScrollFactor(0);
                this.cameras.main.fade(4000)
                .on('camerafadeoutcomplete', function() {
                    setTimeout( () => {
                        this.scene.stop('GameOver')
                        this.scene.stop('HUDisplay')
                        this.scene.start('Reset');
                    }, 2000);
                }, this);
                return;
            }
        }
    }
}

export default Game;