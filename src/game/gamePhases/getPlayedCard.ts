import { raiseCard, lowerCard } from '../utils/raiseLowerCard';

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

  let cardInfo;

  if (scene.data.get('isRaiseMine') && which === 'myPlayedCard') {
    cardInfo = raiseCard(arrayToShift.shift());
    scene.data.set('isRaiseMine', false);
  } else if (scene.data.get('isLowerOpponents') && which === 'opponentPlayedCard') {
    cardInfo = lowerCard(arrayToShift.shift());
    scene.data.set('isLowerOpponents', false);
  } else {
    cardInfo = arrayToShift.shift();
  }
    
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
