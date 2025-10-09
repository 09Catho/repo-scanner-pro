import { Card } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#ff00ff', '#00ffff', '#ff0080', '#00ff80', '#8000ff', '#ffff00', '#ff8000', '#0080ff'];

export const LanguageDoughnutChart = ({ languages }: { languages: any[] }) => {
  const data = languages.map((l, i) => ({
    name: l.language,
    value: l.count,
    fill: COLORS[i % COLORS.length]
  }));

  return (
    <Card className="bg-[#1a1f3a] border-2 border-[#00ffff] p-6">
      <h3 className="text-xl font-['Press_Start_2P'] text-[#00ffff] mb-4">LANGUAGES</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: '#1a1f3a', border: '2px solid #ff00ff' }} />
          <Legend wrapperStyle={{ color: '#00ffff' }} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};