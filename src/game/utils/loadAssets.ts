export const loadAssets = (scene: Phaser.Scene) => {
  scene.load.atlas('club_cards', '/src/game/assets/cards/clubs/club_cards.png', '/src/game/assets/cards/clubs/club_cards.json');
  scene.load.atlas('diamond_cards', '/src/game/assets/cards/diamonds/diamond_cards.png', '/src/game/assets/cards/diamonds/diamond_cards.json');
  scene.load.atlas('heart_cards', '/src/game/assets/cards/hearts/heart_cards.png', '/src/game/assets/cards/hearts/heart_cards.json');
  scene.load.atlas('spade_cards', '/src/game/assets/cards/spades/spade_cards.png', '/src/game/assets/cards/spades/spade_cards.json');
  scene.load.image('bg', '/src/game/assets/casinotable.png');
  scene.load.image('card_back', '/src/game/assets/card_back.png');
};