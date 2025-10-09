import { Card } from "./ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const RetroAISummary = ({ summary, isLoading }: { summary: string | null; isLoading: boolean }) => (
  <Card className="bg-[#1a1f3a] border-2 border-[#00ffff] p-6">
    <h3 className="text-2xl font-['Press_Start_2P'] text-[#00ffff] mb-4">AI PROFILE ANALYSIS</h3>
    {isLoading ? (
      <div className="animate-pulse text-[#ff00ff]">Analyzing profile data...</div>
    ) : summary ? (
      <div className="prose prose-invert max-w-none text-[#00ffff] font-['VT323'] text-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
      </div>
    ) : (
      <div className="text-gray-400">AI summary will appear here</div>
    )}
  </Card>
);