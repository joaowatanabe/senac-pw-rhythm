export default function GenreFilter({ genres, selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          onClick={() => onChange(genre)}
          className={`
            px-4 py-1 rounded-full text-sm font-medium border transition-all duration-150
            ${
              selected === genre
                ? "bg-[rgba(0,212,255,0.12)] border-primary text-primary font-semibold"
                : "bg-surface-2 border-[rgba(255,255,255,0.08)] text-text-muted hover:border-primary hover:text-primary"
            }
          `}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
