export const endGame = (scene: Phaser.Scene, endText: string) => {
  const graphics = scene.add.graphics();
  graphics.fillGradientStyle(0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 1);
  graphics.fillRect(25, 25, 750, 550);
  scene.add
    .text(400, 300, endText, {
      fontSize: '64px',
      color: '#ffffff',
    })
    .setOrigin();
  scene.add
    .text(400, 350, 'Refresh to play again', {
      fontSize: '32px',
      color: '#ffffff',
    })
    .setOrigin();
  const pageLink = scene.add
    .text(400, 400, 'Click me to go to our site', {
      fontSize: '32px',
      color: '#ffffff',
    })
    .setOrigin();

  pageLink.setInteractive();
  pageLink.on('pointerdown', () => {
    window.location.href = 'http://localhost:5173';
  });
};
