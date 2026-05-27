import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import StarRating from "../StarRating/StarRating";

export default function CommentModal({
  isOpen,
  mode,
  music,
  onClose,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { user: "", comment: "", score: 0 } });

  const score = watch("score");

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleClose() {
    reset();
    onClose();
  }
  function onFormSubmit(data) {
    onSubmit(data);
    reset();
  }

  if (!isOpen || !music) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl animate-[modalIn_200ms_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-zinc-800/30">
          <div>
            <h2 className="text-xl font-bold text-white">
              {mode === "comment" ? "Avaliar música" : "Comentários"}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              {music.title} — {music.artist}
            </p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Fechar modal"
            className="text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {mode === "comment" ? (
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Seu nome
                </label>
                <input
                  placeholder="Ex: João Silva"
                  className={`w-full bg-zinc-950/50 border rounded-xl px-4 py-3.5 text-base text-white outline-none transition-colors focus:border-green-500 ${errors.user ? "border-red-500" : "border-white/10"}`}
                  {...register("user", { required: "Nome é obrigatório" })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Comentário
                </label>
                <textarea
                  rows={4}
                  placeholder="O que você achou dessa faixa?"
                  className={`w-full bg-zinc-950/50 border rounded-xl px-4 py-3.5 text-base text-white outline-none transition-colors focus:border-green-500 resize-none ${errors.comment ? "border-red-500" : "border-white/10"}`}
                  {...register("comment", {
                    required: "Comentário é obrigatório",
                  })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">
                  Nota
                </label>
                <StarRating
                  value={score}
                  interactive={true}
                  onChange={(val) => setValue("score", val)}
                />
                <input
                  type="hidden"
                  {...register("score", {
                    min: { value: 1, message: "Selecione uma nota" },
                  })}
                />
                {errors.score && (
                  <span className="text-xs text-error">
                    {errors.score.message}
                  </span>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-muted border border-[rgba(255,255,255,0.08)] hover:border-text-muted hover:text-text transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[rgba(0,212,255,0.12)] text-primary hover:bg-primary hover:text-bg transition-all cursor-pointer"
                >
                  Enviar avaliação
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
              {music.ratings.length === 0 ? (
                <p className="text-center text-sm text-text-faint py-10">
                  Nenhuma avaliação ainda. Seja o primeiro!
                </p>
              ) : (
                music.ratings.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-col gap-2 p-4 bg-surface-3 border border-[rgba(255,255,255,0.08)] rounded-xl"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">
                        {r.user}
                      </span>
                      <StarRating value={r.score} interactive={false} />
                    </div>
                    <p className="text-sm text-text-muted">{r.comment}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
