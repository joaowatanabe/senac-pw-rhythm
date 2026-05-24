import { Music, Clock, Zap, Calendar, MessageCircle, Eye } from "lucide-react";
import StarRating from "../StarRating/StarRating";
import { calcAverage, formatDate } from "../../utils/helpers";

import spotifyLogo from "../../assets/streamings/spotify.svg";
import beatportLogo from "../../assets/streamings/beatport.svg";
import soundcloudLogo from "../../assets/streamings/soundcloud.svg";
import youtubeLogo from "../../assets/streamings/youtube.svg";
import appleLogo from "../../assets/streamings/apple.svg";

const STREAMING_LOGOS = {
  Spotify: spotifyLogo,
  Beatport: beatportLogo,
  SoundCloud: soundcloudLogo,
  YouTube: youtubeLogo,
  Apple: appleLogo,
};

export default function MusicCard({ music, onComment, onViewComments }) {
  const avg = calcAverage(music.ratings);
  const total = music.ratings.length;

  return (
    <article className="flex gap-4 p-4 bg-[var(--color-surface-2)] border border-white/[0.06] rounded-2xl transition-all duration-200 hover:bg-[var(--color-surface-3)] hover:border-white/[0.10] cursor-default">
      <div className="shrink-0 w-36 h-36 rounded-xl overflow-hidden bg-[var(--color-surface-3)] flex items-center justify-center shadow-xl">
        {music.coverUrl ? (
          <img
            src={music.coverUrl}
            alt={`Capa de ${music.title}`}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <Music size={36} className="text-[var(--color-text-faint)]" />
        )}
      </div>

      <div className="flex flex-col flex-1 min-w-0 py-0.5 gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-primary)] opacity-80">
          {music.genre}
        </span>

        <div>
          <h2 className="font-[var(--font-display)] text-base font-bold text-white truncate leading-snug">
            {music.title}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            {music.artist}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-[var(--color-text-faint)] mt-0.5">
          <span className="flex items-center gap-1">
            <Clock size={11} /> {music.duration}
          </span>
          <span className="flex items-center gap-1">
            <Zap size={11} /> {music.bpm} BPM
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} /> {formatDate(music.releaseDate)}
          </span>
        </div>

        {music.streamings?.length > 0 && (
          <div className="flex items-center gap-2 mt-0.5">
            {music.streamings.map((s) =>
              STREAMING_LOGOS[s] ? (
                <img
                  key={s}
                  src={STREAMING_LOGOS[s]}
                  alt={s}
                  title={s}
                  className="w-4 h-4 object-contain opacity-50 hover:opacity-90 transition-opacity"
                />
              ) : (
                <span
                  key={s}
                  className="text-[11px] text-[var(--color-text-faint)] border border-white/[0.08] px-2 py-0.5 rounded-full"
                >
                  {s}
                </span>
              ),
            )}
          </div>
        )}

        <div className="flex items-center justify-between flex-wrap gap-2 mt-auto pt-2 border-t border-white/[0.05]">
          <div className="flex items-center gap-2">
            <StarRating value={avg} interactive={false} />
            <span className="text-[11px] text-[var(--color-text-faint)]">
              {total === 0
                ? "Sem avaliações"
                : `${total} avaliação${total > 1 ? "ões" : ""}`}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onComment(music.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[var(--color-primary)] text-black hover:bg-[var(--color-primary-hover)] transition-all cursor-pointer"
            >
              <MessageCircle size={13} /> Comentar
            </button>
            <button
              type="button"
              onClick={() => onViewComments(music.id)}
              disabled={total === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[var(--color-text-muted)] border border-white/[0.10] hover:border-white/25 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <Eye size={13} /> Comentários
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
