import { createElement } from '../utils/dom.js';

function createCardButton(index, onCardClick) {
  const face = createElement('span', { className: 'card__face' });
  const button = createElement('button', {
    className: 'card',
    attrs: { type: 'button' },
    on: { click: () => onCardClick(index) },
    children: [face],
  });

  return { button, face };
}

function updateCard({ button, face }, card, index) {
  const isOpen = card.isFlipped || card.isMatched;

  button.classList.toggle('card--open', isOpen);
  button.classList.toggle('card--matched', card.isMatched);
  face.textContent = isOpen ? card.emoji : '';
  button.setAttribute(
    'aria-label',
    isOpen
      ? `Карточка ${index + 1}: ${card.name}`
      : `Карточка ${index + 1}, закрыта`,
  );
}

export function createBoard({ cardCount, onCardClick }) {
  const cardViews = Array.from({ length: cardCount }, (_, index) =>
    createCardButton(index, onCardClick),
  );
  const element = createElement('div', {
    className: 'board',
    attrs: { role: 'group', 'aria-label': 'Игровое поле' },
    children: cardViews.map((view) => view.button),
  });

  function update(state) {
    state.cards.forEach((card, index) => {
      updateCard(cardViews[index], card, index);
    });
  }

  return { element, update };
}
