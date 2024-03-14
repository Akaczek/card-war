export const checkWhoIsWinning = (
  my_card: { name: string; suit: string; power: number | undefined },
  opponents_card: { name: string; suit: string; power: number | undefined },
  my_cards: { name: string; suit: string; power: number | undefined }[],
  opponents_cards: { name: string; suit: string; power: number | undefined }[],
  my_card_count: Phaser.GameObjects.Text,
  opponents_card_count: Phaser.GameObjects.Text
) => {
  if (my_card?.power && opponents_card?.power) {
    if (my_card.power > opponents_card.power) {
      my_cards.push(opponents_card);
      my_cards.push(my_card);
      my_card_count.setText(`My cards: ${my_cards.length}`);
      opponents_card_count.setText(
        `Opponent's cards: ${opponents_cards.length}`
      );
    } else if (my_card.power < opponents_card.power) {
      opponents_cards.push(my_card);
      opponents_cards.push(opponents_card);
      my_card_count.setText(`My cards: ${my_cards.length}`);
      opponents_card_count.setText(
        `Opponent's cards: ${opponents_cards.length}`
      );
    } else {
      opponents_cards.push(opponents_card);
      my_cards.push(my_card);
      my_card_count.setText(`My cards: ${my_cards.length}`);
      opponents_card_count.setText(
        `Opponent's cards: ${opponents_cards.length}`
      );
    }
  }
};
