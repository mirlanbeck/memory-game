const STORAGE_KEY = 'memory-game:leaderboard';
const MAX_RESULTS = 10;

function isValidResult(result) {
  return (
    result !== null &&
    typeof result === 'object' &&
    Number.isFinite(result.moves) &&
    typeof result.date === 'string' &&
    !Number.isNaN(new Date(result.date).getTime())
  );
}

function compareResults(a, b) {
  if (a.moves !== b.moves) {
    return a.moves - b.moves;
  }
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

export function loadResults() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));

    return Array.isArray(parsed)
      ? parsed.filter(isValidResult).sort(compareResults).slice(0, MAX_RESULTS)
      : [];
  } catch {
    return [];
  }
}

export function addResult(moves) {
  const results = [...loadResults(), { moves, date: new Date().toISOString() }]
    .sort(compareResults)
    .slice(0, MAX_RESULTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    // хранилище недоступно: игра продолжает работать без сохранения
  }

  return results;
}
