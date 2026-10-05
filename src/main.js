import { CARDS } from './data/cards.js';
import { createGame } from './game/game.js';
import { addResult, loadResults } from './storage/leaderboard.js';
import { createApp } from './ui/app.js';
import { openLeaderboardModal } from './ui/leaderboardModal.js';
import { openWinModal } from './ui/winModal.js';

const app = createApp({
  cardCount: CARDS.length * 2,
  onCardClick: (index) => game.flipCard(index),
  onNewGame: () => game.reset(),
  onShowLeaderboard: () => openLeaderboardModal(loadResults()),
});

const game = createGame({
  pairs: CARDS,
  onChange: (state) => app.update(state),
  onFinish: (moves) => {
    addResult(moves);
    openWinModal({ moves, onNewGame: () => game.reset() });
  },
});

document.body.append(app.element);
app.update(game.getState());
