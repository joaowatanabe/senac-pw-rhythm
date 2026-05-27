import { useState } from "react";
import MusicCard from "../../components/MusicCard/MusicCard";
import CommentModal from "../../components/CommentModal/CommentModal";
import { useMySongs } from "../../hooks/useMySongs";
import { useMusic } from "../../hooks/useMusic";

export default function MySongs() {
  const { mySongs, removeSong, isSaved } = useMySongs();
  const { addRating } = useMusic();

  const [modal, setModal] = useState({
    open: false,
    mode: "comment",
    musicId: null,
  });

  const selectedMusic = mySongs.find((m) => m.id === modal.musicId) || null;

  function handleComment(musicId) {
    setModal({ open: true, mode: "comment", musicId });
  }

  function handleViewComments(musicId) {
    setModal({ open: true, mode: "view", musicId });
  }

  function handleClose() {
    setModal({ open: false, mode: "comment", musicId: null });
  }

  function handleSubmit(data) {
    addRating(modal.musicId, data);
    handleClose();
  }

  return (
    <div className="container pt-20 pb-10 flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text)]">
          Minhas músicas
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Faixas que você marcou para ouvir e avaliar depois.
        </p>
      </header>

      {mySongs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-sm text-[var(--color-text-faint)]">
            Você ainda não adicionou músicas à sua lista.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mySongs.map((music) => (
            <MusicCard
              key={music.id}
              music={music}
              onComment={handleComment}
              onViewComments={handleViewComments}
              onToggleMySong={() => removeSong(music.id)}
              isSaved={isSaved(music.id)}
            />
          ))}
        </div>
      )}

      <CommentModal
        isOpen={modal.open}
        mode={modal.mode}
        music={selectedMusic}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
