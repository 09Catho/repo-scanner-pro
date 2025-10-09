import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const RetroHeader = ({ onSearch, isLoading }: { onSearch: (username: string) => void; isLoading: boolean }) => {
  const [username, setUsername] = useState("");

  return (
    <div className="relative z-10 border-b-4 border-[#ff00ff] bg-[#1a1f3a] shadow-[0_0_20px_rgba(255,0,255,0.5)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-['Press_Start_2P'] text-[#ff00ff] mb-8 text-center drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]">
          GITHUB ANALYZER
        </h1>
        <div className="flex gap-4 max-w-2xl mx-auto">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ENTER GITHUB USERNAME..."
            className="flex-1 bg-[#0a0e27] border-2 border-[#00ffff] text-[#00ffff] font-['VT323'] text-xl"
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && onSearch(username)}
          />
          <Button
            onClick={() => onSearch(username)}
            disabled={isLoading}
            className="bg-[#ff00ff] hover:bg-[#ff00ff]/80 text-white font-['Press_Start_2P'] text-sm"
          >
            SCAN
          </Button>
        </div>
      </div>
    </div>
  );
};