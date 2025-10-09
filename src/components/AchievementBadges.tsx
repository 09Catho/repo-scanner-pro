import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Achievement } from "@/utils/achievementSystem";

export const AchievementBadges = ({ achievements }: { achievements: Achievement[] }) => (
  <Card className="bg-[#1a1f3a] border-2 border-[#ff00ff] p-6">
    <h3 className="text-2xl font-['Press_Start_2P'] text-[#ff00ff] mb-4">ACHIEVEMENTS UNLOCKED</h3>
    <div className="flex flex-wrap gap-3">
      {achievements.map((achievement) => (
        <Badge key={achievement.id} className="bg-[#ff00ff] text-white px-4 py-2 text-sm">
          {achievement.icon} {achievement.name}
        </Badge>
      ))}
    </div>
  </Card>
);