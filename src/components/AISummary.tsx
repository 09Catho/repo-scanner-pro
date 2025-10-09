import { Card } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

interface AISummaryProps {
  summary: string | null;
  isLoading: boolean;
}

export const AISummary = ({ summary, isLoading }: AISummaryProps) => {
  if (!summary && !isLoading) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/30 shadow-glow animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary">
          <Sparkles size={20} className="text-background" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">AI Profile Summary</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-3 py-8">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
          <p className="text-muted-foreground">Generating intelligent insights...</p>
        </div>
      ) : (
        <div className="prose prose-invert max-w-none">
          <div className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
            {summary}
          </div>
        </div>
      )}
    </Card>
  );
};
