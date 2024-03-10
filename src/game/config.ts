import { Example } from './scene';

export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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