import { Card } from "./ui/card";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const LanguageDoughnutChart = ({ languages }: { languages: any[] }) => {
  const data = {
    labels: languages.map(l => l.language),
    datasets: [{ data: languages.map(l => l.count), backgroundColor: languages.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`) }]
  };
  return (
    <Card className="bg-[#1a1f3a] border-2 border-[#00ffff] p-6">
      <h3 className="text-xl font-['Press_Start_2P'] text-[#00ffff] mb-4">LANGUAGES</h3>
      <Doughnut data={data} />
    </Card>
  );
};