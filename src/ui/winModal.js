import { createElement } from '../utils/dom.js';
import { createCloseButton, openModal } from './modal.js';

export function openWinModal({ moves, onNewGame }) {
  return openModal({
    title: 'Победа!',
    body: [
      createElement('p', {
        className: 'modal__text',
        text: `Вы нашли все пары. Количество ходов: ${moves}.`,
      }),
    ],
    actions: (close) => [
      createElement('button', {
        className: 'button',
        text: 'Новая игра',
        attrs: { type: 'button' },
        on: {
          click: () => {
            close();
            onNewGame();
          },
        },
      }),
      createCloseButton(close),
    ],
  });
}
