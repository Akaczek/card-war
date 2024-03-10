import Phaser from 'phaser';
import casinoBackground from './assets/casinotable.png';

export class Example extends Phaser.Scene {
  constructor() {
    super('example');
  }

  preload() {
    this.load.image('bg', casinoBackground);
  }

  create() {
    this.add.image(400, 300, 'bg');
    this.add.rectangle(400, 450, 800, 5, 0xff0000);
    const rect = this.add.rectangle(400, 475, 100, 100, 0x000000);

    rect.setInteractive({ draggable: true });

    rect.on('pointerover', () => {
      rect.setStrokeStyle(1, 0xffffff);
    });

    rect.on('pointerout', () => {
      rect.setStrokeStyle(0, 0xffffff);
    });

    rect.on(
      'drag',
      (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        rect.x = dragX;
        rect.y = dragY;

        if (dragY < 450) {
          rect.setFillStyle(0x555555);
        } else {
          rect.setFillStyle(0x000000);
        }
      }
    );
  }
}
