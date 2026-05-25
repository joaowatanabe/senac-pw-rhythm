export default function GenreFilter({ genres, selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          onClick={() => onChange(genre)}
          className={`
            px-7 py-3 rounded-full text-base font-semibold border transition-all duration-200 cursor-pointer shadow-sm
            ${
              selected === genre
                ? "bg-green-500 border-green-500 text-black shadow-[0_0_12px_rgba(5,220,120,0.3)]"
                : "bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
            }
          `}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
