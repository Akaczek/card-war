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
  }

  create() {
    this.add.image(400, 300, 'bg');
    this.add.rectangle(400, 400, 800, 5, 0xff0000);
    const eventEmitter = new Phaser.Events.EventEmitter();

    const opponent_back = this.add.image(400, 25, 'card_back');
    const card_back = this.add.image(400, 500, 'card_back');
    const my_cards = getCards(this);
    const opponents_cards = getCards(this);
    Phaser.Utils.Array.Shuffle(my_cards);
    Phaser.Utils.Array.Shuffle(opponents_cards);
    opponents_cards.splice(5, opponents_cards.length - 5);

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
  }
}
