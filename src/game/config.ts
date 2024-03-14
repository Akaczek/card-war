import { Example } from './scene';
import { GAME_HEIGHT, GAME_WIDTH } from './utils/constants';

export const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  scene: Example,
  parent: 'phaser-container',
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200, x: 0 }
      }
  },
  backgroundColor: '#33ff33',
};