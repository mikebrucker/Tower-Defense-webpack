import './style.css';
import Boot from './scenes/Boot'
import Reset from './scenes/Reset'
import Game from './scenes/Game'
import HUDisplay from './scenes/HUDisplay'
import GameOver from './scenes/GameOver'
import BoardPlugin from './plugins/rexboardplugin.min';

window.board = null,

window.sfx_config = {
    mute: false,
    loop: false,
    volume: 0.5,
},
window.music_config = {
    mute: false,
    loop: true,
    volume: 0.4,
},
window.game_track = null,
window.bulletSoundsPlayed = 0,

window.controls = null,
window.gameFocus = true,
window.gameOver = false,
window.pauseOn = false,
window.musicOn = true,
window.sfxOn = true,
window.build = false,
window.demolish = false,
window.clickNextWave = true,
window.pointerOnNav = null,

window.timerDisplay = null,
window.resourcesDisplay = null,
window.upgradeCostDisplay = null,
window.killsDisplay = null,
window.hydraliskHPDisplay = null,
window.hydraliskSpeedDisplay = null,
window.numberOfTowersDisplay = null,
window.waveNumberDisplay = null,
window.towerDamageDisplay = null,
window.hydralisksEscapedDisplay = null,

window.nextWaveInterval = null,
window.timer = null,
window.min = null,
window.sec = null,

window.buildButton = null,
window.demolishButton = null,
window.upgradeButton = null,
window.nextWaveButton = null,
window.musicButton = null,
window.sfxButton = null,
window.pauseButton = null,

window.buildGraphic = null,
window.logWorldLayer = null,
window.path = null,
window.lurkerpath = null,

window.waveInfoText = null,
window.countDownText = null,
window.buildInfoText = null,
window.hydralisksEscapedInfoText = null,
window.gameOverText = null,
window.pauseText = null,

window.births = null,
window.hydralisks = null,
window.lurkers = null,
window.deaths = null,
window.headtowers = null,
window.bullets = null,

window.upgradeCost = 1,
window.resources = 10,
window.towerDamage = 10,
window.numberOfTowers = 0,
window.waveNumber = 0,
window.kills = 0,
window.lurkerHP = 512,
window.lurkerSpeed = 80,
window.lurkerHPIncrease = 128,
window.hydraliskHP = 60,
window.hydraliskHPIncrease = 9,
window.hydraliskSpeed = 100,
window.hydralisksEscaped = 0;

// cheat codes
window.somethingForNothing = function somethingForNothing() {
    for (let tower of headtowers.getChildren()) {
        tower.damage += 2;
    }
    towerDamage += 2;
    upgradeCost++;
    upgradeCostDisplay.setText(upgradeCost);
    towerDamageDisplay.setText(`Tower Damage: ${towerDamage}`);
    if (resources >= upgradeCost) {
        upgradeButton.setFill('gold').setStroke('firebrick').setAlpha(1);
    } else {
        upgradeButton.setFill('firebrick').setStroke('gold').setAlpha(0.33)
    }
}
window.showMeTheMoney = function showMeTheMoney() {
    resources += 10000;
    resourcesDisplay.setText(`Resources: ${resources}`)
    if (resources >= upgradeCost) {
        upgradeButton.setFill('gold').setStroke('firebrick').setAlpha(1);
    } else {
        upgradeButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 992,
    height: 600,
    parent: 'gameContainer',
    backgroundColor: '#222222',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    plugins: {
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        },
    ]},
    scene: [
        Boot,
        Reset,
        Game,
        HUDisplay,
        GameOver
    ]
};

window.game = new Phaser.Game(config);