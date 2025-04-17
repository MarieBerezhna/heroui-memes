import MemeCard from "./meme-card";

import { useMemes } from "@/hooks/useMemes";

export default function MemesList() {
  const { memes } = useMemes();

  return (
    <div className="max-w-8xl mx-auto py-6 sm:px-6 md:px-8 lg:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
}
