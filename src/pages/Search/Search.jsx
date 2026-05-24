import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useMusic } from "../../hooks/useMusic";
import MusicCard from "../../components/MusicCard/MusicCard";
import CommentModal from "../../components/CommentModal/CommentModal";

export default function Search() {
  const { musics, loading, searchMusics, addRating } = useMusic();
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState({
    open: false,
    mode: "comment",
    musicId: null,
  });

  const results = query.trim() ? searchMusics(query) : [];
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

  return (
    <div className="container py-10">
     
      <div className="mb-6">
        <h1 className="font-(--font-display) text-2xl text-text">
          Pesquisa
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Busque por nome, artista ou gênero
        </p>
      </div>

      
      <div className="relative mb-8">
        <SearchIcon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Strobe, Daft Punk, Techno..."
          className="w-full bg-[var(--color-surface)] border border-[rgba(255,255,255,0.08)] rounded-xl pl-11 pr-4 py-3 text-base text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-colors focus:border-[var(--color-primary)]"
        />
      </div>

      {!query.trim() ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-[var(--color-text-faint)]">
            Digite algo para começar a busca
          </p>
        </div>
      ) : loading ? (
        <p className="text-sm text-[var(--color-text-muted)] animate-pulse">
          Carregando...
        </p>
      ) : results.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-[var(--color-text-faint)]">
            Nenhum resultado para{" "}
            <span className="text-[var(--color-text-muted)]">"{query}"</span>
          </p>
        </div>
      ) : (
        <>
          <p className="text-xs text-[var(--color-text-faint)] mb-4">
            {results.length} resultado{results.length !== 1 ? "s" : ""}{" "}
            encontrado{results.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {results.map((music) => (
              <MusicCard
                key={music.id}
                music={music}
                onComment={handleComment}
                onViewComments={handleViewComments}
              />
            ))}
          </div>
        </>
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
