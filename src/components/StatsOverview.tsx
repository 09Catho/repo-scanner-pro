import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface StatsOverviewProps {
  repositories: Array<{
    name: string;
    stars: number;
    forks: number;
  }>;
}

export const StatsOverview = ({ repositories }: StatsOverviewProps) => {
  const chartData = repositories.slice(0, 6).map(repo => ({
    name: repo.name.length > 15 ? repo.name.substring(0, 15) + '...' : repo.name,
    stars: repo.stars,
    forks: repo.forks,
  }));

  return (
    <Card className="p-6 bg-card border-border shadow-card animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-6">Repository Statistics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(215 20% 65%)"
            tick={{ fill: 'hsl(215 20% 65%)', fontSize: 12 }}
          />
          <YAxis 
            stroke="hsl(215 20% 65%)"
            tick={{ fill: 'hsl(215 20% 65%)', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(224 40% 8%)', 
              border: '1px solid hsl(217 33% 17%)',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="stars" fill="hsl(217 91% 60%)" name="Stars" />
          <Bar dataKey="forks" fill="hsl(263 70% 50%)" name="Forks" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
