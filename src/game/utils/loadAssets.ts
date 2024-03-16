import clubCardsImg from '../assets/cards/clubs/club_cards.png';
import clubCardsJson from '../assets/cards/clubs/club_cards.json';
import diamondCardsImg from '../assets/cards/diamonds/diamond_cards.png';
import diamondCardsJson from '../assets/cards/diamonds/diamond_cards.json';
import heartCardsImg from '../assets/cards/hearts/heart_cards.png';
import heartCardsJson from '../assets/cards/hearts/heart_cards.json';
import spadeCardsImg from '../assets/cards/spades/spade_cards.png';
import spadeCardsJson from '../assets/cards/spades/spade_cards.json';
import bgImg from '../assets/casinotable.png';
import cardBackImg from '../assets/card_back.png';
import showCardsPowerupImg from '../assets/powerups/showCards.png';
import raiseMinePowerupImg from '../assets/powerups/riseMine.png';
import lowerOpponentsPowerupImg from '../assets/powerups/lowerOpponent.png';

export const loadAssets = (scene: Phaser.Scene) => {
  scene.load.atlas('club_cards', clubCardsImg, clubCardsJson);
  scene.load.atlas('diamond_cards', diamondCardsImg, diamondCardsJson);
  scene.load.atlas('heart_cards', heartCardsImg, heartCardsJson);
  scene.load.atlas('spade_cards', spadeCardsImg, spadeCardsJson);
  scene.load.image('bg', bgImg);
  scene.load.image('card_back', cardBackImg);
  scene.load.image('show_cards_powerup', showCardsPowerupImg);
  scene.load.image('raise_mine_powerup', raiseMinePowerupImg);
  scene.load.image('lower_opponents_powerup', lowerOpponentsPowerupImg);
};