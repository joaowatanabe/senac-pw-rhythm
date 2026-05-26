export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="w-full flex justify-end">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full max-w-sm h-11 px-5 rounded-xl border border-white/10 bg-zinc-900 text-sm text-white placeholder-zinc-500 outline-none focus:border-[var(--color-primary)] focus:bg-zinc-900/90 transition-colors"
      />
    </div>
  );
}
