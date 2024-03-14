import { RANKS_POWER } from './constants';

export const getCards = (scene: Phaser.Scene) => {
  const cards_suits = [
    'club_cards',
    'diamond_cards',
    'heart_cards',
    'spade_cards',
  ];

  const cardImages = cards_suits.map((suit) => {
    const frameNames = scene.textures.get(suit).getFrameNames();
    return frameNames.map((frameName) => {
      return {
        name: frameName,
        suit: suit,
        power: RANKS_POWER.find((rank) => frameName.includes(rank.rank))?.power,
      };
    });
  }).flat();

  return cardImages;
}