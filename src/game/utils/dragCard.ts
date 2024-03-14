import {
  GAME_HEIGHT,
  GAME_WIDTH,
  CARD_HEIGHT,
  CARD_WIDTH,
  RED_LINE_HEIGHT,
} from './constants';

export const dragCard = (card: Phaser.GameObjects.Image) => {
  card.setInteractive({ draggable: true });

  card.on(
    'drag',
    (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
      if (dragX > CARD_WIDTH / 2 && dragX < GAME_WIDTH - CARD_WIDTH / 2) {
        card.x = dragX;
      }
      if (dragY > CARD_HEIGHT / 2 && dragY < GAME_HEIGHT - CARD_HEIGHT / 2) {
        card.y = dragY;
      }

      if (dragY < RED_LINE_HEIGHT) {
        card.setTint(0xaaaa00);
      } else {
        card.clearTint();
      }
    }
  );

  card.on('dragstart', () => {
    card.scene.children.bringToTop(card);
  });
};
