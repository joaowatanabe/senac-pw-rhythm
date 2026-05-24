import { useState } from "react";
import { useMusic } from "../../hooks/useMusic";
import { extractGenres } from "../../utils/helpers";
import MusicCard from "../../components/MusicCard/MusicCard";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import CommentModal from "../../components/CommentModal/CommentModal";

export default function Home() {
  const { musics, loading, addRating } = useMusic();
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [modal, setModal] = useState({
    open: false,
    mode: "comment",
    musicId: null,
  });

  const genres = extractGenres(musics);

  const filtered =
    selectedGenre === "Todos"
      ? musics
      : musics.filter((m) => m.genre === selectedGenre);

  const selectedMusic = musics.find((m) => m.id === modal.musicId) || null;

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

  if (loading) {
    return (
      <div className="container py-16 flex items-center justify-center">
        <p className="text-text-muted text-sm animate-pulse">
          Carregando músicas...
        </p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="font-(--font-display) text-2xl text-text">Músicas</h1>
        <p className="text-sm text-text-muted mt-1">
          {musics.length} faixa{musics.length !== 1 ? "s" : ""} cadastrada
          {musics.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="mb-6">
        <GenreFilter
          genres={genres}
          selected={selectedGenre}
          onChange={setSelectedGenre}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-text-faint text-sm">
            Nenhuma música encontrada para esse gênero.
          </p>
          <button
            onClick={() => setSelectedGenre("Todos")}
            className="text-sm text-primary hover:underline cursor-pointer"
          >
            Limpar filtro
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((music) => (
            <MusicCard
              key={music.id}
              music={music}
              onComment={handleComment}
              onViewComments={handleViewComments}
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
