export default function GenreFilter({ genres, selected, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          onClick={() => onChange(genre)}
          className={`
              shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer
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
