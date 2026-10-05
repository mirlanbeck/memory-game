import { createElement } from '../utils/dom.js';

const TITLE_ID = 'modal-title';

let activeModal = null;

export function openModal({ title, body = [], actions = () => [] }) {
  if (activeModal) {
    activeModal.close();
  }

  const previousFocus = document.activeElement;
  const blockedElements = [...document.body.children];
  let isClosed = false;

  const dialog = createElement('div', {
    className: 'modal',
    attrs: {
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': TITLE_ID,
      tabindex: '-1',
    },
    children: [
      createElement('h2', {
        className: 'modal__title',
        text: title,
        attrs: { id: TITLE_ID },
      }),
      createElement('div', { className: 'modal__body', children: body }),
      createElement('div', {
        className: 'modal__actions',
        children: actions(close),
      }),
    ],
  });

  const overlay = createElement('div', {
    className: 'modal-overlay',
    children: [dialog],
    on: {
      click: (event) => {
        if (event.target === overlay) {
          close();
        }
      },
    },
  });

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      close();
    }
  }

  function close() {
    if (isClosed) {
      return;
    }
    isClosed = true;
    activeModal = null;

    document.removeEventListener('keydown', handleKeydown);
    overlay.remove();
    blockedElements.forEach((element) => element.removeAttribute('inert'));
    document.body.classList.remove('modal-open');

    if (previousFocus && previousFocus.isConnected) {
      previousFocus.focus();
    }
  }

  blockedElements.forEach((element) => element.setAttribute('inert', ''));
  document.body.classList.add('modal-open');
  document.body.append(overlay);
  document.addEventListener('keydown', handleKeydown);
  dialog.focus();

  activeModal = { close };

  return { close };
}

export function createCloseButton(close) {
  return createElement('button', {
    className: 'button button--secondary',
    text: 'Закрыть',
    attrs: { type: 'button' },
    on: { click: close },
  });
}
