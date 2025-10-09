import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components once
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const languageColors: { [key: string]: string } = {
  JavaScript: 'rgba(255, 255, 0, 0.8)',
  TypeScript: 'rgba(0, 150, 255, 0.8)',
  Python: 'rgba(0, 255, 0, 0.8)',
  Java: 'rgba(255, 0, 102, 0.8)',
  'C++': 'rgba(255, 0, 255, 0.8)',
  Go: 'rgba(0, 255, 255, 0.8)',
  Rust: 'rgba(255, 152, 0, 0.8)',
  Ruby: 'rgba(255, 0, 102, 0.8)',
  PHP: 'rgba(156, 39, 176, 0.8)',
  Swift: 'rgba(255, 152, 0, 0.8)',
  Kotlin: 'rgba(0, 150, 255, 0.8)',
  Dart: 'rgba(0, 255, 255, 0.8)',
  HTML: 'rgba(255, 102, 0, 0.8)',
  CSS: 'rgba(0, 153, 255, 0.8)',
  PowerShell: 'rgba(0, 102, 255, 0.8)',
};
