import map_json from '../assets/json/sunken_defense.json';
import tiles from '../assets/images/ashlands_tileset.png';
import tower_overlay from '../assets/images/tower_overlay.png';
import bullet_single from '../assets/images/bullet_single.png';
import headtower from '../assets/images/headtower.png';
import hydralisk from '../assets/images/hydralisk.png';
import lurker from '../assets/images/lurker.png';
import bullet from '../assets/images/bullet.png';
import headtower_json from '../assets/json/headtower.json';
import hydralisk_json from '../assets/json/hydralisk.json';
import lurker_json from '../assets/json/lurker.json';
import bullet_json from '../assets/json/bullet.json';
import hydra_birth_sound from '../assets/audio/hydra_birth.ogg';
import hydra_death_sound from '../assets/audio/hydra_death.ogg';
import lurker_birth_sound from '../assets/audio/lurker_birth.ogg';
import lurker_death_sound from '../assets/audio/lurker_death.ogg';
import bullet_sound from '../assets/audio/bullet.ogg';
import build_tower_sound from '../assets/audio/build_tower.ogg';
import demolish_tower_sound from '../assets/audio/demolish_tower.ogg';
import beep_sound from '../assets/audio/beep.ogg';
import egg_sound from '../assets/audio/egg.ogg';
import victory_sound from '../assets/audio/victory.ogg';
import lose_sound from '../assets/audio/lose.ogg';
import upgrade_sound from '../assets/audio/upgrade.ogg';
import error_sound from '../assets/audio/error.ogg';
import escape_sound from '../assets/audio/escape.ogg';
import game_track from '../assets/audio/battle.wav';

class Boot extends Phaser.Scene {
    
    constructor() {
        super({ key: 'Boot', active: true });
    }

    preload() {
        let progressBox = this.add.graphics(),
        progressBar = this.add.graphics(),
        loadText = this.add.text(496, 300, 'Loading... 0%', { fontSize: '24px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 8 }).setOrigin(0.5),
        assetText = this.add.text(496, 360, 'Loading Asset:', { fontSize: '24px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 4 }).setOrigin(0.5);
        progressBox.fillStyle(0xB22222, 0.8);
        progressBox.fillRect(20, 270, 952, 60);
        
        this.load.on('progress', function(value) {
            progressBar.clear();
            progressBar.fillStyle(0xFFD700, 1);
            progressBar.fillRect(30, 280, 932 * value, 40);
            loadText.setText(`Loading... ${Math.round(value * 100)}%`);
        }, this);
        
        this.load.on('fileprogress', function(file) {
            assetText.setText(`Loading Asset: ${file.key}`);
        });
        
        this.load.on('complete', function() {
            this.scene.start('Game');
        }, this);

        this.load.tilemapTiledJSON('map', map_json);
        this.load.image('tiles', tiles);
        this.load.image('tower_overlay', tower_overlay);
        this.load.image('bullet_single', bullet_single);
        this.load.atlas('headtower', headtower, headtower_json);
        this.load.atlas('hydralisk', hydralisk, hydralisk_json);
        this.load.atlas('lurker', lurker, lurker_json);
        this.load.atlas('bullet', bullet, bullet_json);
        this.load.audio('hydra_birth', hydra_birth_sound);
        this.load.audio('hydra_death', hydra_death_sound);
        this.load.audio('lurker_birth', lurker_birth_sound);
        this.load.audio('lurker_death', lurker_death_sound);
        this.load.audio('bullet', bullet_sound);
        this.load.audio('build_tower', build_tower_sound);
        this.load.audio('demolish_tower', demolish_tower_sound);
        this.load.audio('beep', beep_sound);
        this.load.audio('egg', egg_sound);
        this.load.audio('victory', victory_sound);
        this.load.audio('lose', lose_sound);
        this.load.audio('upgrade', upgrade_sound);
        this.load.audio('error', error_sound);
        this.load.audio('escape', escape_sound);
        this.load.audio('game_track', game_track);
    }

    create() {
        this.anims.create({
            key: 'headtower_up',
            frames: [ { key: 'headtower', frame: 'up1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'up', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_do',
            frames: [ { key: 'headtower', frame: 'do1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'do', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_le',
            frames: [ { key: 'headtower', frame: 'le1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'le', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_ri',
            frames: [ { key: 'headtower', frame: 'ri1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'ri', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_ul',
            frames: [ { key: 'headtower', frame: 'ul1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'ul', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_ur',
            frames: [ { key: 'headtower', frame: 'ur1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'ur', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_dl',
            frames: [ { key: 'headtower', frame: 'dl1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'dl', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_dr',
            frames: [ { key: 'headtower', frame: 'dr1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'dr', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_side',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_side', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_up',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_up', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_down',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_down', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_udiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_udiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_ddiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_ddiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_uldiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_uldiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_dldiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_dldiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_uhdiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_uhdiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_dhdiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_dhdiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_birth',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'birth', start: 1, end: 18 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'hydra_death',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'death', start: 1, end: 4 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'hydra_corpse',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'death', start: 5, end: 12 }),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: 'hydra_stop',
            frames: [ { key: 'hydralisk', frame: 'walk_down1' } ],
            frameRate: 20,
        });
        this.anims.create({
            key: 'bullet',
            frames: this.anims.generateFrameNames('bullet', { prefix: 'bullet', start: 1, end: 8 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'bullet_single',
            frames: [ { key: 'bullet_single', frame: 0 } ],
            frameRate: 20,
        });
        this.anims.create({
            key: 'lurker_side',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'side', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_up',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'up', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_down',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'down', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_udiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'udiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_ddiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'ddiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_uldiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'uldiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_dldiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'dldiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_uhdiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'uhdiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_dhdiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'dhdiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_birth',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'birth', start: 1, end: 23 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'lurker_death',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'death', start: 1, end: 10 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'lurker_stop',
            frames: [ { key: 'lurker', frame: 'down1' } ],
            frameRate: 20,
        });
    }
}

export default Boot;