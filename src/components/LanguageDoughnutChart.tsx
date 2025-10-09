import { Card, CardContent, Typography, Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import BarChartIcon from '@mui/icons-material/BarChart';
import { languageColors } from '@/utils/chartConfig';

interface LanguageDoughnutChartProps {
  languages: Array<{ language: string; count: number }>;
}

export const LanguageDoughnutChart = ({ languages }: LanguageDoughnutChartProps) => {
  const chartData = {
    labels: languages.map(l => l.language),
    datasets: [
      {
        label: 'Repositories',
        data: languages.map(l => l.count),
        backgroundColor: languages.map(l => languageColors[l.language] || 'rgba(0, 255, 255, 0.8)'),
        borderColor: languages.map(() => '#ff00ff'),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
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
  };

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <BarChartIcon sx={{ fontSize: 40, color: '#ff00ff' }} />
          <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
            LANGUAGE DISTRIBUTION
          </Typography>
        </Box>
        <Box sx={{ height: 350 }}>
          <Doughnut data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};
