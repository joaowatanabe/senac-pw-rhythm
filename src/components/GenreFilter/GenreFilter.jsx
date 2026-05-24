export default function GenreFilter({ genres, selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          onClick={() => onChange(genre)}
          className={`
            px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-150 cursor-pointer
            ${
              selected === genre
                ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-black"
                : "bg-transparent border-white/[0.12] text-[var(--color-text-muted)] hover:border-white/30 hover:text-white"
            }
          `}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
