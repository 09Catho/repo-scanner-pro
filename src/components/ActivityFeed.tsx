import { Card } from "./ui/card";

export const ActivityFeed = ({ activities }: { activities: any[] }) => (
  <Card className="bg-[#1a1f3a] border-2 border-[#ff00ff] p-6">
    <h3 className="text-2xl font-['Press_Start_2P'] text-[#ff00ff] mb-4">RECENT ACTIVITY</h3>
    <div className="space-y-3">
      {activities.slice(0, 10).map((activity, i) => (
        <div key={i} className="text-[#00ffff] font-['VT323'] text-lg border-l-2 border-[#ff00ff] pl-4">
          {activity.type} on {activity.repo}
        </div>
      ))}
    </div>
  </Card>
);