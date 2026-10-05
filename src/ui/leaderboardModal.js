import { createElement } from '../utils/dom.js';
import { formatDate } from '../utils/format.js';
import { createCloseButton, openModal } from './modal.js';

function createTable(results) {
  const head = createElement('thead', {
    children: [
      createElement('tr', {
        children: ['Место', 'Ходы', 'Дата'].map((label) =>
          createElement('th', { text: label, attrs: { scope: 'col' } }),
        ),
      }),
    ],
  });
  const body = createElement('tbody', {
    children: results.map((result, index) =>
      createElement('tr', {
        children: [
          createElement('td', { text: String(index + 1) }),
          createElement('td', { text: String(result.moves) }),
          createElement('td', { text: formatDate(result.date) }),
        ],
      }),
    ),
  });

  return createElement('table', {
    className: 'leaderboard',
    children: [head, body],
  });
}

export function openLeaderboardModal(results) {
  const content =
    results.length > 0
      ? createTable(results)
      : createElement('p', {
          className: 'modal__text',
          text: 'Пока нет результатов',
        });

  return openModal({
    title: 'Таблица лидеров',
    body: [content],
    actions: (close) => [createCloseButton(close)],
  });
}
