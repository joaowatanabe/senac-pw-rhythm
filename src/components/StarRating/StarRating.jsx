import { Star } from "lucide-react";

export default function StarRationg({
  value = 0,
  interactive = false,
  onChange,
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onChange?.(star)}
          aria-label={`${star} estrela${star > 1 ? "s" : ""}`}
          className={`
            flex items-center p-0 transition-colors duration-150
            ${star <= value ? "text-yellow-400" : "text-text-faint"}
            ${interactive ? "cursor-pointer hover:text-yellow-400" : "cursor-default"}
          `}
        >
          <Star size={interactive ? 22 : 15} />
        </button>
      ))}
      {!interactive && value > 0 && (
        <span className="ml-1 text-xs font-semibold text-text-muted">
          {value}
        </span>
      )}
    </div>
  );
}
