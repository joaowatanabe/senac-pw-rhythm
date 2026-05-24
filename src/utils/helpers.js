export function calcAverage(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r.score, 0);
  return parseFloat((sum / ratings.length).toFixed(1));
}

export function extractGenres(musics) {
  const genres = musics.map((m) => m.genre);
  return ["Todos", ...new Set(genres)];
}

export function formatDate(isoDate) {
  if (!isoDate) return "—";
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

export function generateId() {
  return crypto.randomUUID();
}
