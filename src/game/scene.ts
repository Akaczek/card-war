import Phaser from 'phaser';

import { loadAssets, getCards, dragCard } from './utils';
import { RED_LINE_HEIGHT } from './utils/constants';
import { endGame, checkWhoIsWinning, getPlayedCard } from './gamePhases';

export class Example extends Phaser.Scene {
  constructor() {
    super('example');
  }

  preload() {
    loadAssets(this);
    this.data.set('myPlayedCard', null);
    this.data.set('opponentPlayedCard', null);
    this.data.set('isDraw', false);
    this.data.set('firstMyDrawCard', null);
    this.data.set('secondMyDrawCard', null);
    this.data.set('firstOpponentDrawCard', null);
    this.data.set('secondOpponentDrawCard', null);
    this.data.set('myDrawCardBack', null);
    this.data.set('opponentDrawCardBack', null);
    this.data.set('isRaiseMine', false);
    this.data.set('isLowerOpponents', false);
  }

  create() {
    this.add.image(400, 300, 'bg');
    this.add.rectangle(400, 400, 800, 5, 0xff0000);
    const showCardsPowerup = this.add.image(750, 100, 'show_cards_powerup');
    const raiseMinePowerup = this.add.image(750, 180, 'raise_mine_powerup');
    const lowerOpponentsPowerup = this.add.image(750, 260, 'lower_opponents_powerup');
    this.add.text(700, 55, 'Show cards', {
      fontSize: '16px',
      color: '#ffffff',
    });
    this.add.text(700, 135, 'Raise mine', {
      fontSize: '16px',
      color: '#ffffff',
    });
    this.add.text(650, 215, 'Lower opponents', {
      fontSize: '16px',
      color: '#ffffff',
    });
    const eventEmitter = new Phaser.Events.EventEmitter();

    const opponent_back = this.add.image(400, 25, 'card_back');
    const card_back = this.add.image(400, 500, 'card_back');
    const my_cards = getCards(this);
    const opponents_cards = getCards(this);
    Phaser.Utils.Array.Shuffle(my_cards);
    Phaser.Utils.Array.Shuffle(opponents_cards);
    opponents_cards.splice(2, opponents_cards.length - 2);

    const my_card_count = this.add.text(
      75,
      550,
      `My cards: ${my_cards.length}`,
      {
        fontSize: '16px',
        color: '#ffffff',
      }
    );
    const opponents_card_count = this.add.text(
      75,
      50,
      `Opponent's cards: ${opponents_cards.length}`,
      {
        fontSize: '16px',
        color: '#ffffff',
      }
    );

    dragCard(card_back);

    card_back.on('dragend', () => {
      if (card_back.y < RED_LINE_HEIGHT) {
        card_back.setAlpha(1);
        opponent_back.setAlpha(1);
        this.data.get('powerupShowedMyCard')?.destroy();
        this.data.get('powerupShowedOpponentCard')?.destroy();
        
        const myCardInfo = getPlayedCard(
          this,
          'myPlayedCard',
          my_cards
        );
        const opponentCardInfo = getPlayedCard(
          this,
          'opponentPlayedCard',
          opponents_cards
        );

        if (myCardInfo && opponentCardInfo) {
          this.data.set('firstMyDrawCard', myCardInfo);
          this.data.set('firstOpponentDrawCard', opponentCardInfo);
          checkWhoIsWinning(
            myCardInfo,
            opponentCardInfo,
            my_cards,
            opponents_cards,
            my_card_count,
            opponents_card_count,
            eventEmitter,
            this
          );
        }

        if (opponents_cards.length === 0) {
          endGame(this, 'You win!');
          opponent_back.destroy();
        }
        if (my_cards.length === 0) {
          endGame(this, 'You lose!');
          card_back.destroy();
        }

        card_back.x = 400;
        card_back.y = 500;
        card_back.clearTint();
      }
    });

    eventEmitter.on('draw', () => {
      this.data.get('myPlayedCard').x = 100;
      this.data.get('opponentPlayedCard').x = 100;
      this.data.set('isDraw', true);

      this.data.set('secondMyDrawCard', my_cards.shift());
      this.data.set('secondOpponentDrawCard', opponents_cards.shift());

      my_card_count.setText(`My cards: ${my_cards.length}`);
      opponents_card_count.setText(`Opponent's cards: ${opponents_cards.length}`);

      this.data.set('myDrawCardBack', this.add.image(163, 300, 'card_back'));
      this.data.set('opponentDrawCardBack', this.add.image(163, 100, 'card_back'));

      if (opponents_cards.length === 0) {
        endGame(this, 'You win!');
        opponent_back.destroy();
      }
      if (my_cards.length === 0) {
        endGame(this, 'You lose!');
        card_back.destroy();
      }
    });

    showCardsPowerup.setInteractive();
    showCardsPowerup.on('pointerdown', () => {
      showCardsPowerup.destroy();
      this.data.set('powerupShowedMyCard', this.add.image(400, 500, my_cards[0].suit, my_cards[0].name));
      this.data.set('powerupShowedOpponentCard', this.add.image(400, 25, opponents_cards[0].suit, opponents_cards[0].name));
      card_back.scene.children.bringToTop(card_back);
      card_back.setAlpha(0.01);
      opponent_back.scene.children.bringToTop(opponent_back);
      opponent_back.setAlpha(0.01);
    });

    raiseMinePowerup.setInteractive();
    raiseMinePowerup.on('pointerdown', () => {
      this.data.set('isRaiseMine', true);
      raiseMinePowerup.destroy();
    });

    lowerOpponentsPowerup.setInteractive();
    lowerOpponentsPowerup.on('pointerdown', () => {
      this.data.set('isLowerOpponents', true);
      lowerOpponentsPowerup.destroy();
    });
  }
}
