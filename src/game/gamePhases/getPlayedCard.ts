export const getPlayedCard = (
  scene: Phaser.Scene,
  which: 'myPlayedCard' | 'opponentPlayedCard',
  arrayToShift: {
    name: string;
    suit: string;
    power: number | undefined;
  }[]
) => {
  const card = scene.data.get(which);

  if (card) {
    card.destroy();
  }
  const cardInfo = arrayToShift.shift();
  if (cardInfo) {
    scene.data.set(
      which,
      scene.add.image(
        400,
        which === 'myPlayedCard' ? 300 : 100,
        cardInfo.suit,
        cardInfo.name
      )
    );
  }

  return cardInfo;
};
