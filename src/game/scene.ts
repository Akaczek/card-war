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
  }

  create() {
    this.add.image(400, 300, 'bg');
    this.add.rectangle(400, 400, 800, 5, 0xff0000);

    const opponent_back = this.add.image(400, 25, 'card_back');
    const card_back = this.add.image(400, 500, 'card_back');
    const my_cards = getCards(this);
    const opponents_cards = getCards(this);
    Phaser.Utils.Array.Shuffle(my_cards);
    Phaser.Utils.Array.Shuffle(opponents_cards);
    opponents_cards.splice(5, opponents_cards.length - 5);

    const my_card_count = this.add.text(
      50,
      550,
      `My cards: ${my_cards.length}`,
      {
        fontSize: '16px',
        color: '#ffffff',
      }
    );
    const opponents_card_count = this.add.text(
      50,
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
          checkWhoIsWinning(
            myCardInfo,
            opponentCardInfo,
            my_cards,
            opponents_cards,
            my_card_count,
            opponents_card_count
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
  }
}
