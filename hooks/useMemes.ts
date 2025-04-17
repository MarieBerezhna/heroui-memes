"use client";

import type { Meme } from "@/types";

import { useState, useEffect } from "react";

import { initialMemes } from "@/data/initial-memes";

export function useMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const storedMemes = localStorage.getItem("memes");

    if (storedMemes) {
      setMemes(JSON.parse(storedMemes));
    } else {
      setMemes(initialMemes);
      localStorage.setItem("memes", JSON.stringify(initialMemes));
    }
  }, []);

  const updateMeme = (updatedMeme: Meme) => {
    const newMemes = memes.map((meme) =>
      meme.id === updatedMeme.id ? updatedMeme : meme,
    );

    setMemes(newMemes);
    localStorage.setItem("memes", JSON.stringify(newMemes));
  };

  return { memes, updateMeme };
}
