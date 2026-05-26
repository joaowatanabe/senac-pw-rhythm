export default function GenreFilter({ genres, selected, onChange }) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-none">
      {genres.map((genre) => {
        const isActive = selected === genre;

        return (
          <button
            key={genre}
            type="button"
            onClick={() => onChange(genre)}
            className={
              isActive
                ? "relative pb-1 text-[13px] font-medium tracking-wide text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-t after:bg-[#05dc78]"
                : "relative pb-1 text-[13px] font-medium tracking-wide text-zinc-500 hover:text-zinc-200 transition-colors duration-150"
            }
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
