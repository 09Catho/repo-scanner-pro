import { Card } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const RepoBarChart = ({ repositories }: { repositories: any[] }) => {
  const data = repositories.slice(0, 6).map(r => ({
    name: r.name.length > 12 ? r.name.substring(0, 12) + '...' : r.name,
    Stars: r.stars,
    Forks: r.forks
  }));

  return (
    <Card className="bg-[#1a1f3a] border-2 border-[#00ffff] p-6">
      <h3 className="text-xl font-['Press_Start_2P'] text-[#00ffff] mb-4">TOP REPOS</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#00ffff" />
          <YAxis stroke="#00ffff" />
          <Tooltip contentStyle={{ background: '#1a1f3a', border: '2px solid #ff00ff' }} />
          <Legend wrapperStyle={{ color: '#00ffff' }} />
          <Bar dataKey="Stars" fill="#ff00ff" />
          <Bar dataKey="Forks" fill="#00ffff" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};