import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          className="h-14 pl-14 pr-32 text-lg bg-card border-border focus:border-primary transition-colors"
          disabled={isLoading}
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Button
          type="submit"
          disabled={isLoading || !username.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        >
          {isLoading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>
    </form>
  );
};
