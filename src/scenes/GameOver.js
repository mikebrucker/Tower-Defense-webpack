class GameOver extends Phaser.Scene {
    
    constructor() {
        super('GameOver');
    }
    
    create() {
        gameOverText = this.add.text(496, 300, '', {fontSize: '60px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3 }).setOrigin(0.5).setScrollFactor(0);
        if (hydralisksEscaped > 19) {
            gameOverText.setText('You failed to achieve victory!');
        } else {
            gameOverText.setText('You survived all 30 waves!');
        }
    }
}

export default GameOver;