import { useMusic } from "../../hooks/useMusic";

export default function Home() {
  const { musics, loading } = useMusic();

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <p>{musics.length} músicas carregadas</p>
    </div>
  );
}
