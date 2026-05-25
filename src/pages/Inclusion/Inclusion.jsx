import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useMusic } from "../../hooks/useMusic";

const GENRES = [
  "House",
  "Tech House",
  "Deep House",
  "Progressive House",
  "French House",
  "Techno",
  "Minimal Techno",
  "Industrial Techno",
  "Trance",
  "Psytrance",
  "Uplifting Trance",
  "Drum & Bass",
  "Jungle",
  "Dubstep",
  "Future Bass",
  "Trap",
  "Ambient",
  "Downtempo",
  "Chillout",
  "Electro",
  "Synthwave",
  "Nu-Disco",
];

const STREAMINGS = ["Spotify", "Beatport", "SoundCloud", "YouTube", "Apple"];

export default function Inclusion() {
  const { addMusic } = useMusic();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      artist: "",
      genre: "",
      bpm: "",
      duration: "",
      releaseDate: "",
      coverUrl: "",
      streamings: [],
    },
  });

  function onSubmit(data) {
    addMusic({
      ...data,
      bpm: Number(data.bpm),
      streamings: data.streamings || [],
    });
    setSuccess(true);
    reset();
    setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 2000);
  }

  const inputClass = (hasError) =>
    `w-full bg-[var(--color-surface-2)] border rounded-xl px-4 py-4.5 text-sm text-white placeholder:text-[var(--color-text-faint)] outline-none transition-colors focus:border-[var(--color-primary)] ${
      hasError ? "border-[var(--color-error)]" : "border-white/[0.08]"
    }`;

  return (
    <div className="container pt-14 pb-16 flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text)]">
          Incluir Música
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Adicione uma nova faixa ao catálogo
        </p>
      </div>

      {success && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[rgba(34,197,94,0.1)] border border-[var(--color-success)] text-[var(--color-success)]">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">
            Música adicionada! Redirecionando...
          </span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-8 w-full shadow-2xl"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text-muted)]">
              Nome da música{" "}
              <span className="text-[var(--color-error)]">*</span>
            </label>
            <input
              placeholder="Ex: Strobe"
              className={inputClass(errors.title)}
              {...register("title", { required: "Nome é obrigatório" })}
            />
            {errors.title && (
              <span className="text-xs text-[var(--color-error)]">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text-muted)]">
              Artista <span className="text-[var(--color-error)]">*</span>
            </label>
            <input
              placeholder="Ex: deadmau5"
              className={inputClass(errors.artist)}
              {...register("artist", { required: "Artista é obrigatório" })}
            />
            {errors.artist && (
              <span className="text-xs text-[var(--color-error)]">
                {errors.artist.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--color-text-muted)]">
            Gênero <span className="text-[var(--color-error)]">*</span>
          </label>
          <select
            className={inputClass(errors.genre) + " cursor-pointer"}
            {...register("genre", { required: "Gênero é obrigatório" })}
          >
            <option value="" disabled>
              Selecione um gênero
            </option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && (
            <span className="text-xs text-[var(--color-error)]">
              {errors.genre.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text-muted)]">
              BPM <span className="text-[var(--color-error)]">*</span>
            </label>
            <input
              type="number"
              placeholder="Ex: 128"
              min="60"
              max="250"
              className={inputClass(errors.bpm)}
              {...register("bpm", {
                required: "BPM é obrigatório",
                min: { value: 60, message: "Mínimo 60" },
                max: { value: 250, message: "Máximo 250" },
              })}
            />
            {errors.bpm && (
              <span className="text-xs text-[var(--color-error)]">
                {errors.bpm.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text-muted)]">
              Duração <span className="text-[var(--color-error)]">*</span>
            </label>
            <input
              placeholder="Ex: 6:30"
              className={inputClass(errors.duration)}
              {...register("duration", {
                required: "Duração é obrigatória",
                pattern: {
                  value: /^\d{1,2}:\d{2}$/,
                  message: "Use o formato mm:ss",
                },
              })}
            />
            {errors.duration && (
              <span className="text-xs text-[var(--color-error)]">
                {errors.duration.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text-muted)]">
              Data de lançamento{" "}
              <span className="text-[var(--color-error)]">*</span>
            </label>
            <input
              type="date"
              className={inputClass(errors.releaseDate) + " cursor-pointer"}
              {...register("releaseDate", { required: "Data é obrigatória" })}
            />
            {errors.releaseDate && (
              <span className="text-xs text-[var(--color-error)]">
                {errors.releaseDate.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--color-text-muted)]">
            URL da capa{" "}
            <span className="text-xs text-[var(--color-text-faint)]">
              (opcional)
            </span>
          </label>
          <input
            type="url"
            placeholder="https://..."
            className={inputClass(false)}
            {...register("coverUrl")}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-medium text-[var(--color-text-muted)]">
            Streamings disponíveis
          </label>
          <div className="flex flex-wrap gap-3">
            {STREAMINGS.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  value={s}
                  className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                  {...register("streamings")}
                />
                <span className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-5 border-t border-white/[0.05]">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-full text-sm font-semibold text-[var(--color-text-muted)] border border-white/[0.10] hover:border-white/25 hover:text-white transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-full text-sm font-bold bg-[var(--color-primary)] text-black hover:bg-[var(--color-primary-hover)] transition-all cursor-pointer"
          >
            Salvar música
          </button>
        </div>
      </form>
    </div>
  );
}
