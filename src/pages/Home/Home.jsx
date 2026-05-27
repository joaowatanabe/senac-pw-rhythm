import { useState } from "react";
import { useMusic } from "../../hooks/useMusic";
import { extractGenres } from "../../utils/helpers";
import { useMySongs } from "../../hooks/useMySongs";
import MusicCard from "../../components/MusicCard/MusicCard";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import CommentModal from "../../components/CommentModal/CommentModal";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home() {
  const { musics, loading, addRating } = useMusic();
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [modal, setModal] = useState({
    open: false,
    mode: "comment",
    musicId: null,
  });

  const { addSong, removeSong, isSaved } = useMySongs();

  const [query, setQuery] = useState("");

  const genres = extractGenres(musics);

  const genreFiltered =
    selectedGenre === "Todos"
      ? musics
      : musics.filter((m) => m.genre === selectedGenre);

  const normalizedQuery = query.toLowerCase().trim();

  const filtered = !normalizedQuery
    ? genreFiltered
    : genreFiltered.filter(
        (m) =>
          m.title.toLowerCase().includes(normalizedQuery) ||
          m.artist.toLowerCase().includes(normalizedQuery) ||
          m.genre.toLowerCase().includes(normalizedQuery),
      );

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
    <div className="container pt-20 pb-10 flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text)]">
          Catálogo de músicas
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Explore, filtre por gênero e avalie as faixas da coleção.
        </p>
      </header>
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="md:flex-1">
          <GenreFilter
            genres={genres}
            selected={selectedGenre}
            onChange={setSelectedGenre}
          />
        </div>

        <div className="mt-2 md:mt-0 md:flex-1 flex justify-end">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Buscar por título, artista ou gênero..."
          />
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-[var(--color-text-faint)] text-sm">
            Nenhuma música encontrada para esse gênero.
          </p>
          <button
            onClick={() => setSelectedGenre("Todos")}
            className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
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
              onToggleMySong={() =>
                isSaved(music.id) ? removeSong(music.id) : addSong(music)
              }
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
