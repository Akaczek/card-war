export const checkWhoIsWinning = (
  my_card: { name: string; suit: string; power: number | undefined },
  opponents_card: { name: string; suit: string; power: number | undefined },
  my_cards: { name: string; suit: string; power: number | undefined }[],
  opponents_cards: { name: string; suit: string; power: number | undefined }[],
  my_card_count: Phaser.GameObjects.Text,
  opponents_card_count: Phaser.GameObjects.Text,
  eventEmitter: Phaser.Events.EventEmitter,
  scene: Phaser.Scene
) => {
  const firstMyDrawCard = scene.data.get('firstMyDrawCard');
  const firstOpponentDrawCard = scene.data.get('firstOpponentDrawCard');
  const secondMyDrawCard = scene.data.get('secondMyDrawCard');
  const secondOpponentDrawCard = scene.data.get('secondOpponentDrawCard');

  if (my_card?.power && opponents_card?.power) {
    if (my_card.power > opponents_card.power) {
      if(scene.data.get('isDraw')) {
        my_cards.push(firstOpponentDrawCard);
        my_cards.push(secondOpponentDrawCard);
        my_cards.push(firstMyDrawCard);
        my_cards.push(secondMyDrawCard);
        scene.data.set('isDraw', false);
        scene.data.get('myDrawCardBack').destroy();
        scene.data.get('opponentDrawCardBack').destroy();
      }
      my_cards.push(opponents_card);
      my_cards.push(my_card);
      my_card_count.setText(`My cards: ${my_cards.length}`);
      opponents_card_count.setText(
        `Opponent's cards: ${opponents_cards.length}`
      );
    } else if (my_card.power < opponents_card.power) {
      if(scene.data.get('isDraw')) {
        opponents_cards.push(firstMyDrawCard);
        opponents_cards.push(secondMyDrawCard);
        opponents_cards.push(firstOpponentDrawCard);
        opponents_cards.push(secondOpponentDrawCard); 
        scene.data.get('myDrawCardBack').destroy();
        scene.data.get('opponentDrawCardBack').destroy();
        scene.data.set('isDraw', false);
      }
      opponents_cards.push(my_card);
      opponents_cards.push(opponents_card);
      my_card_count.setText(`My cards: ${my_cards.length}`);
      opponents_card_count.setText(
        `Opponent's cards: ${opponents_cards.length}`
      );
    } else {
      if(scene.data.get('isDraw')) {
        scene.data.set('isDraw', false);
        scene.data.get('myDrawCardBack').destroy();
        scene.data.get('opponentDrawCardBack').destroy();
      } else {
        opponents_cards.push(opponents_card);
        my_cards.push(my_card);
        my_card_count.setText(`My cards: ${my_cards.length}`);
        opponents_card_count.setText(
          `Opponent's cards: ${opponents_cards.length}`
        );
        eventEmitter.emit('draw');
      }
    }
  }
};
