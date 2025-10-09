import { Card } from "./ui/card";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const RepoBarChart = ({ repositories }: { repositories: any[] }) => {
  const data = {
    labels: repositories.slice(0, 6).map(r => r.name),
    datasets: [
      { label: 'Stars', data: repositories.slice(0, 6).map(r => r.stars), backgroundColor: '#ff00ff' },
      { label: 'Forks', data: repositories.slice(0, 6).map(r => r.forks), backgroundColor: '#00ffff' }
    ]
  };
  return (
    <Card className="bg-[#1a1f3a] border-2 border-[#00ffff] p-6">
      <h3 className="text-xl font-['Press_Start_2P'] text-[#00ffff] mb-4">TOP REPOS</h3>
      <Bar data={data} />
    </Card>
  );
};