import { Card, CardContent, Typography, Box } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

interface LanguageBreakdownProps {
  languages: Array<{ language: string; count: number }>;
}

const languageColors: { [key: string]: string } = {
  JavaScript: '#ffff00',
  TypeScript: '#0096ff',
  Python: '#00ff00',
  Java: '#ff0066',
  'C++': '#ff00ff',
  Go: '#00ffff',
  Rust: '#ff9800',
  Ruby: '#ff0066',
  PHP: '#9c27b0',
  Swift: '#ff9800',
  Kotlin: '#0096ff',
  Dart: '#00ffff',
};

export const LanguageBreakdown = ({ languages }: LanguageBreakdownProps) => {
  const total = languages.reduce((acc, lang) => acc + lang.count, 0);

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <CodeIcon sx={{ fontSize: 40, color: '#ffff00' }} />
          <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
            LANGUAGE ARSENAL
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {languages.map((lang, index) => {
            const percentage = (lang.count / total) * 100;
            const color = languageColors[lang.language] || '#00ffff';

            return (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  border: `2px solid ${color}`,
                  background: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${percentage}%`,
                    background: `linear-gradient(90deg, ${color}44 0%, ${color}11 100%)`,
                    transition: 'width 1s ease',
                  }}
                />
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1rem',
                      color: color,
                      fontFamily: '"Orbitron", monospace',
                      textShadow: `0 0 10px ${color}`,
                    }}
                  >
                    {lang.language}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '0.9rem',
                        color: '#00ffff',
                      }}
                    >
                      {lang.count} repos
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.2rem',
                        color: color,
                        fontWeight: 'bold',
                        minWidth: 60,
                        textAlign: 'right',
                        textShadow: `0 0 10px ${color}`,
                      }}
                    >
                      {percentage.toFixed(1)}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
