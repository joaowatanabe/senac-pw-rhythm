import { Music, Clock, Zap, Calendar, MessageCircle, Eye } from "lucide-react";
import StarRating from "../StarRating/StarRating";
import { calcAverage, formatDate } from "../../utils/helpers";

const STREAMING_COLORS = {
  Spotify: "#1db954",
  Beatport: "#00b4b3",
  SoundCloud: "#ff5500",
  YouTube: "#ff0000",
  Apple: "#fc3c44",
};

export default function MusicCard({ music, onComment, onViewComments }) {
  const avg = calcAverage(music.ratings);
  const total = music.ratings.length;

  return (
    <article className="flex gap-4 p-5 bg-surface border border-[rgba(255,255,255,0.08)] rounded-2xl transition-all duration-150 hover:border-[rgba(0,212,255,0.25)] hover:shadow-lg">
      <div className="shrink-0 w-28 h-28 rounded-xl overflow-hidden bg-surface-3 flex items-center justify-center">
        {music.coverUrl ? (
          <img
            src={music.coverUrl}
            alt={`Capa de ${music.title}`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <Music size={36} className="text-text-faint" />
        )}
      </div>

      <div className="flex flex-col gap-2.5 flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h2 className="font-(--font-display) text-lg text-text truncate">
              {music.title}
            </h2>
            <p className="text-sm text-text-muted mt-0.5">{music.artist}</p>
          </div>
          <span className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-[rgba(155,109,255,0.12)] text-purple whitespace-nowrap">
            {music.genre}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {music.duration}
          </span>
          <span className="flex items-center gap-1">
            <Zap size={12} /> {music.bpm} BPM
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {formatDate(music.releaseDate)}
          </span>
        </div>

        {music.streamings?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {music.streamings.map((s) => (
              <span
                key={s}
                className="text-xs font-medium px-2 py-0.5 rounded-full border"
                style={{
                  color: STREAMING_COLORS[s] || "#888",
                  borderColor: STREAMING_COLORS[s] || "#888",
                  opacity: 0.85,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between flex-wrap gap-3 mt-auto">
          <div className="flex items-center gap-2.5">
            <StarRating value={avg} interactive={false} />
            <span className="text-xs text-text-faint">
              {total === 0
                ? "Sem avaliações"
                : `${total} avaliação${total > 1 ? "ões" : ""}`}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onComment(music.id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-[rgba(0,212,255,0.12)] text-primary border border-transparent transition-all duration-150 hover:bg-primary hover:text-bg cursor-pointer"
            >
              <MessageCircle size={14} /> Comentar
            </button>
            <button
              type="button"
              onClick={() => onViewComments(music.id)}
              disabled={total === 0}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-transparent text-text-muted border border-[rgba(255,255,255,0.08)] transition-all duration-150 hover:border-text-muted hover:text-text disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Eye size={14} /> Ver comentários
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
