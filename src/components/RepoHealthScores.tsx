import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { calculateRepoHealth } from "@/utils/achievementSystem";

export const RepoHealthScores = ({ repositories }: { repositories: any[] }) => (
  <Card className="bg-[#1a1f3a] border-2 border-[#ff00ff] p-6">
    <h3 className="text-2xl font-['Press_Start_2P'] text-[#ff00ff] mb-4">REPO HEALTH</h3>
    <div className="space-y-4">
      {repositories.slice(0, 5).map((repo: any) => {
        const healthScore = calculateRepoHealth(repo);
        return (
          <div key={repo.name}>
            <div className="flex justify-between mb-2">
              <span className="text-[#00ffff]">{repo.name}</span>
              <span className="text-[#ff00ff]">{healthScore}/100</span>
            </div>
            <Progress value={healthScore} className="h-2" />
          </div>
        );
      })}
    </div>
  </Card>
);