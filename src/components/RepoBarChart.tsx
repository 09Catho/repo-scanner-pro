import { Card, CardContent, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import BarChartIcon from '@mui/icons-material/BarChart';

interface RepoBarChartProps {
  repositories: Array<{ name: string; stars: number; forks: number }>;
}

export const RepoBarChart = ({ repositories }: RepoBarChartProps) => {
  const topRepos = repositories.slice(0, 6);
  const chartData = {
    labels: topRepos.map(r => r.name.length > 15 ? r.name.substring(0, 15) + '...' : r.name),
    datasets: [
      {
        label: 'Stars',
        data: topRepos.map(r => r.stars),
        backgroundColor: 'rgba(255, 0, 255, 0.7)',
        borderColor: '#ff00ff',
        borderWidth: 2,
      },
      {
        label: 'Forks',
        data: topRepos.map(r => r.forks),
        backgroundColor: 'rgba(0, 255, 255, 0.7)',
        borderColor: '#00ffff',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#00ffff',
          font: {
            family: '"VT323", monospace',
            size: 14,
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(26, 31, 58, 0.95)',
        titleColor: '#ff00ff',
        bodyColor: '#00ffff',
        borderColor: '#ff00ff',
        borderWidth: 2,
        titleFont: {
          family: '"Press Start 2P", monospace',
          size: 10,
        },
        bodyFont: {
          family: '"VT323", monospace',
          size: 14,
        },
        padding: 12,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#00ffff',
          font: {
            family: '"VT323", monospace',
            size: 12,
          },
        },
        grid: {
          color: 'rgba(0, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#00ffff',
          font: {
            family: '"VT323", monospace',
            size: 12,
          },
        },
        grid: {
          color: 'rgba(255, 0, 255, 0.1)',
        },
      },
    },
  };

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <BarChartIcon sx={{ fontSize: 40, color: '#00ffff' }} />
          <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
            REPOSITORY METRICS
          </Typography>
        </Box>
        <Box sx={{ height: 350 }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};
