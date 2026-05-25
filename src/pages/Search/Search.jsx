import { useState } from "react";
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
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-8 gap-8">
      <h1 className="text-3xl font-bold text-white text-center">Pesquisar</h1>
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Strobe, Daft Punk, Techno..."
          className="w-full h-14 pl-14 pr-6 rounded-full border border-gray-700 bg-zinc-900 text-base text-white placeholder-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all shadow-md"
        />
      </div>

      <div className="w-full max-w-5xl">
        {!query.trim() ? (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-zinc-400 text-sm">
              Digite algo para começar a busca...
            </p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-zinc-400 animate-pulse">Buscando...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <p className="text-zinc-400 text-lg text-center">
              Nenhum resultado encontrado para <br />
              <span className="text-white font-medium">"{query}"</span>
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-xl font-semibold text-white">Resultados</h2>
              <span className="text-sm font-medium text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">
                {results.length}{" "}
                {results.length === 1 ? "encontrado" : "encontrados"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((music) => (
                <MusicCard
                  key={music.id}
                  music={music}
                  onComment={handleComment}
                  onViewComments={handleViewComments}
                />
              ))}
            </div>
          </div>
        )}
      </div>

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
