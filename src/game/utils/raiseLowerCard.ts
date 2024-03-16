import { RANKS_POWER } from './constants';

export const raiseCard = (
  card: {
    name: string;
    suit: string;
    power: number | undefined;
  } | undefined
) => {
  if(!card) return card;
  const currentRank = RANKS_POWER.find((rank) => rank.power === card.power);
  const rankToRaise = RANKS_POWER.find((rank) => rank.power === (card.power ?? 0) + 1);
  if (rankToRaise) {
    return {
      name: card.name.replace(currentRank?.rank ?? '', rankToRaise.rank),
      suit: card.suit,
      power: rankToRaise.power,
    }
  } else {
    return card;
  }
}

export const lowerCard = (
  card: {
    name: string;
    suit: string;
    power: number | undefined;
  } | undefined
) => {
  if(!card) return card;
  const currentRank = RANKS_POWER.find((rank) => rank.power === card.power);
  const rankToLower = RANKS_POWER.find((rank) => rank.power === (card.power ?? 0) - 1);
  if (rankToLower) {
    return {
      name: card.name.replace(currentRank?.rank ?? '', rankToLower.rank),
      suit: card.suit,
      power: rankToLower.power,
    }
  } else {
    return card;
  }
}