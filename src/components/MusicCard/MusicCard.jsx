import { Music, Clock, Zap, Calendar, Plus, Check } from "lucide-react";
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

export default function MusicCard({
  music,
  onComment,
  onViewComments,
  onToggleMySong,
  isSaved,
}) {
  const avg = calcAverage(music.ratings);
  const total = music.ratings.length;

  return (
    <article className="flex bg-[var(--color-surface-2)] border border-white/[0.06] rounded-2xl overflow-hidden transition-colors duration-200 hover:bg-[var(--color-surface-3)] cursor-default">
      <div className="w-28 sm:w-32 md:w-36 bg-[var(--color-surface-3)]">
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
          <div className="w-full h-full flex items-center justify-center">
            <Music size={32} className="text-[var(--color-text-faint)]" />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 min-w-0 gap-2 py-3 px-4 sm:py-4 sm:px-5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-primary)] opacity-70">
            {music.genre}
          </span>
          <h2 className="font-[var(--font-display)] text-base font-bold text-white truncate leading-snug">
            {music.title}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] truncate">
            {music.artist}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap gap-3 text-xs text-[var(--color-text-faint)]">
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
            <div className="flex items-center gap-2">
              {music.streamings.map((s) =>
                STREAMING_LOGOS[s] ? (
                  <img
                    key={s}
                    src={STREAMING_LOGOS[s]}
                    alt={s}
                    title={s}
                    className="w-4 h-4 object-contain opacity-40 hover:opacity-80 transition-opacity"
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
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.05]">
          <div className="flex items-center gap-2">
            <StarRating value={avg} interactive={false} />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onComment(music.id)}
              className="relative pb-0.5 text-[13px] font-medium tracking-wide text-zinc-400 hover:text-[var(--color-primary)] transition-colors duration-150 cursor-pointer"
            >
              Comentar
            </button>

            <button
              type="button"
              onClick={() => onViewComments(music.id)}
              disabled={total === 0}
              className="relative pb-0.5 text-[13px] font-medium tracking-wide text-zinc-400 hover:text-[var(--color-primary)] transition-colors duration-150 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
            >
              Comentários
            </button>

            <button
              type="button"
              onClick={onToggleMySong}
              className="relative pb-0.5 text-[13px] font-medium tracking-wide transition-colors duration-150 cursor-pointer text-zinc-400 hover:text-[var(--color-primary)]"
              aria-label={
                isSaved
                  ? "Remover de minhas músicas"
                  : "Adicionar às minhas músicas"
              }
            >
              {isSaved ? (
                <Check size={16} className="text-[var(--color-primary)]" />
              ) : (
                <Plus size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
