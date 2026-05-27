import { useState, useEffect } from "react";

const STORAGE_KEY = "rhythm_my_songs";

export function useMySongs() {
  const [mySongs, setMySongs] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mySongs));
  }, [mySongs]);

  function addSong(music) {
    setMySongs((prev) =>
      prev.find((m) => m.id === music.id) ? prev : [...prev, music],
    );
  }

  function removeSong(musicId) {
    setMySongs((prev) => prev.filter((m) => m.id !== musicId));
  }

  function isSaved(musicId) {
    return mySongs.some((m) => m.id === musicId);
  }

  return { mySongs, addSong, removeSong, isSaved };
}
