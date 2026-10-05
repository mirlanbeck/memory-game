import { shuffle } from './shuffle.js';

export const MISMATCH_DELAY_MS = 1000;

function buildDeck(pairs) {
  const deck = pairs.flatMap((pair) => [
    { pairId: pair.id, emoji: pair.emoji, name: pair.name },
    { pairId: pair.id, emoji: pair.emoji, name: pair.name },
  ]);

  return shuffle(deck).map((card) => ({
    ...card,
    isFlipped: false,
    isMatched: false,
  }));
}

export function createGame({ pairs, onChange, onFinish }) {
  const totalPairs = pairs.length;
  let state;

  function notify() {
    if (onChange) {
      onChange(state);
    }
  }

  function createState() {
    return {
      cards: buildDeck(pairs),
      firstIndex: null,
      moves: 0,
      matchedPairs: 0,
      totalPairs,
      isLocked: false,
      isFinished: false,
      timerId: null,
    };
  }

  function closeMismatchedPair(firstCard, secondCard) {
    firstCard.isFlipped = false;
    secondCard.isFlipped = false;
    state.isLocked = false;
    state.timerId = null;
    notify();
  }

  function flipCard(index) {
    const card = state.cards[index];

    if (state.isFinished || state.isLocked || !card) {
      return;
    }
    if (card.isFlipped || card.isMatched) {
      return;
    }

    card.isFlipped = true;

    if (state.firstIndex === null) {
      state.firstIndex = index;
      notify();
      return;
    }

    const firstCard = state.cards[state.firstIndex];
    state.firstIndex = null;
    state.moves += 1;

    if (firstCard.pairId === card.pairId) {
      firstCard.isMatched = true;
      card.isMatched = true;
      state.matchedPairs += 1;

      if (state.matchedPairs === totalPairs) {
        state.isFinished = true;
        notify();
        if (onFinish) {
          onFinish(state.moves);
        }
        return;
      }
      notify();
      return;
    }

    state.isLocked = true;
    state.timerId = setTimeout(
      () => closeMismatchedPair(firstCard, card),
      MISMATCH_DELAY_MS,
    );
    notify();
  }

  function reset() {
    if (state && state.timerId !== null) {
      clearTimeout(state.timerId);
    }
    state = createState();
    notify();
  }

  function getState() {
    return state;
  }

  state = createState();

  return { flipCard, reset, getState };
}
