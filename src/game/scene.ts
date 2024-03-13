import Phaser from 'phaser';
import { loadAssets, getCards } from './utils';

export class Example extends Phaser.Scene {
  constructor() {
    super('example');
  }

  preload() {
    loadAssets(this);
  }

  create() {
    this.add.image(400, 300, 'bg');
    this.add.rectangle(400, 400, 800, 5, 0xff0000);

    const card_back = this.add.image(400, 100, 'card_back');

    card_back.setInteractive({ draggable: true });

    card_back.on(
      'drag',
      (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        card_back.x = dragX;
        card_back.y = dragY;
      }
    );

    card_back.on('dragstart', () => {
      this.children.bringToTop(card_back);
    });

    const cardImages = getCards(this);

    Phaser.Utils.Array.Shuffle(cardImages);

    cardImages.forEach((card) => {
      const cardImage = this.add.image(400, 475, card.suit, card.name);

      cardImage.setInteractive({ draggable: true });

      cardImage.on(
        'drag',
        (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
          if(dragX > 63 && dragX < 800 - 63) {
            cardImage.x = dragX;
          }
          if(dragY > 75 && dragY < 525) {
            cardImage.y = dragY;
          }
        }
      );

      cardImage.on('dragstart', () => {
        this.children.bringToTop(cardImage);
      });
    });
  }
}
