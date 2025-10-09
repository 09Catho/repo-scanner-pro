import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface LanguageChartProps {
  languages: Array<{ language: string; count: number }>;
}

const COLORS = [
  'hsl(217 91% 60%)',
  'hsl(263 70% 50%)',
  'hsl(173 80% 40%)',
  'hsl(43 96% 56%)',
  'hsl(27 87% 67%)',
  'hsl(340 82% 52%)',
  'hsl(142 71% 45%)',
  'hsl(221 83% 53%)',
  'hsl(280 100% 70%)',
  'hsl(33 100% 53%)',
];

export const LanguageChart = ({ languages }: LanguageChartProps) => {
  const data = languages.map((lang, index) => ({
    name: lang.language,
    value: lang.count,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Card className="p-6 bg-card border-border shadow-card animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-6">Language Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(224 40% 8%)', 
              border: '1px solid hsl(217 33% 17%)',
              borderRadius: '8px',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};
