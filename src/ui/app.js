import { createElement } from '../utils/dom.js';
import { createBoard } from './board.js';

export function createApp({
  cardCount,
  onNewGame,
  onShowLeaderboard,
  onCardClick,
}) {
  const header = createElement('header', {
    className: 'header',
    children: [
      createElement('h1', { className: 'header__title', text: 'Memory Game' }),
      createElement('div', {
        className: 'header__actions',
        children: [
          createElement('button', {
            className: 'button',
            text: 'Новая игра',
            attrs: { type: 'button' },
            on: { click: onNewGame },
          }),
          createElement('button', {
            className: 'button button--secondary',
            text: 'Таблица лидеров',
            attrs: { type: 'button' },
            on: { click: onShowLeaderboard },
          }),
        ],
      }),
    ],
  });

  const movesValue = createElement('span', {
    className: 'stats__value',
    text: '0',
  });
  const pairsValue = createElement('span', {
    className: 'stats__value',
    text: '0',
  });
  const stats = createElement('div', {
    className: 'stats',
    attrs: { 'aria-live': 'polite' },
    children: [
      createElement('p', {
        className: 'stats__item',
        text: 'Ходы: ',
        children: [movesValue],
      }),
      createElement('p', {
        className: 'stats__item',
        text: 'Пары: ',
        children: [pairsValue],
      }),
    ],
  });

  const board = createBoard({ cardCount, onCardClick });

  const main = createElement('main', {
    className: 'main',
    children: [stats, board.element],
  });
  const element = createElement('div', {
    className: 'app',
    children: [header, main],
  });

  function update(state) {
    movesValue.textContent = String(state.moves);
    pairsValue.textContent = `${state.matchedPairs} из ${state.totalPairs}`;
    board.update(state);
  }

  return { element, update };
}
