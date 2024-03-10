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
    const playLine = this.add.rectangle(400, 450, 800, 5, 0xff0000);
    const rect = this.add.rectangle(400, 475, 100, 100, 0x000000);

    rect.setInteractive({ draggable: true });

    this.input.on(
      'drag',
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Shape,
        dragX: number,
        dragY: number
      ) => {
        gameObject.x = dragX;
        gameObject.y = dragY;

        if (dragY < 450) {
          gameObject.setFillStyle(0x555555);
        } else {
          gameObject.setFillStyle(0x000000);
        }
      }
    );
  }
}
