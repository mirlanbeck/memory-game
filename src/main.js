import { CARDS } from './data/cards.js';
import { createGame } from './game/game.js';
import { createApp } from './ui/app.js';

const app = createApp({
  cardCount: CARDS.length * 2,
  onCardClick: (index) => game.flipCard(index),
  onNewGame: () => game.reset(),
  onShowLeaderboard: () => {},
});

const game = createGame({
  pairs: CARDS,
  onChange: (state) => app.update(state),
});

document.body.append(app.element);
app.update(game.getState());
