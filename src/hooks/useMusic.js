import { useState, useEffect } from "react";
import { generateId } from "../utils/helpers";

const STORAGE_KEY = "rhythm_db";

async function loadSeed() {
  const response = await fetch("/data/db.json");
  const data = await response.json();
  return data.musics;
}

function getStoredMusics() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function saveMusics(musics) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(musics));
}

export function useMusic() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredMusics();
    if (stored) {
      setMusics(stored);
      setLoading(false);
    } else {
      loadSeed().then((seed) => {
        saveMusics(seed);
        setMusics(seed);
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      saveMusics(musics);
    }
  }, [musics, loading]);

  function addMusic(data) {
    const newMusic = {
      ...data,
      id: generateId(),
      ratings: [],
    };
    setMusics((prev) => [newMusic, ...prev]);
  }

  function addRating(musicId, ratingData) {
    setMusics((prev) =>
      prev.map((music) =>
        music.id === musicId
          ? {
              ...music,
              ratings: [
                ...music.ratings,
                {
                  ...ratingData,
                  id: generateId(),
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : music,
      ),
    );
  }

  function filterByGenre(genre) {
    if (!genre || genre === "Todos") return musics;
    return musics.filter((m) => m.genre === genre);
  }

  function searchMusics(query) {
    if (!query || query.trim() === "") return musics;
    const q = query.toLowerCase().trim();
    return musics.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.artist.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q),
    );
  }

  return {
    musics,
    loading,
    addMusic,
    addRating,
    filterByGenre,
    searchMusics,
  };
}
