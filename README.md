# 🚀 GitHub Analytics Dashboard

<div align="center">

![GitHub Analytics](https://img.shields.io/badge/GitHub-Analytics-blue?style=for-the-badge&logo=github)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**A retro-themed GitHub profile analyzer with AI-powered insights and interactive data visualizations.**
</div>

---

## ✨ Features

### 📊 **Comprehensive Analytics**
- **Profile Overview**: Display user information, bio, location, and social links
- **Repository Statistics**: Total repos, stars, forks, and watchers
- **Language Breakdown**: Interactive doughnut chart showing language distribution
- **Repository Insights**: Bar chart visualizing top repositories by stars

### 🤖 **AI-Powered Analysis**
- **Smart Summaries**: AI analyzes your GitHub profile and generates comprehensive insights
- **README Analysis**: Automatically fetches and analyzes README files from top repositories
- **Markdown Rendering**: Beautiful markdown formatting for AI-generated summaries

### 🎯 **Achievement System**
- **Dynamic Badges**: Earn achievements based on your GitHub activity
- **Contribution Tracking**: Monitor your contribution streak and impact
- **Repository Health**: Score repositories based on documentation, activity, and engagement

### 🎨 **Retro Design**
- **Cyberpunk Aesthetic**: Neon colors, pixel fonts, and retro gaming vibes
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Charts**: Beautiful, interactive data visualizations using Recharts

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **React Markdown** - Markdown rendering
- **shadcn/ui** - Component library

### **Backend**
- **Lovable Cloud** - Full-stack platform powered by Supabase
- **Edge Functions** - Serverless API endpoints
- **AI Integration** - Lovable AI for profile analysis
- **GitHub API** - Data fetching

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- GitHub account (for API access)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/09Catho/repo-scanner-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

---

## 📖 Usage

1. **Enter a GitHub Username**: Type any GitHub username in the search bar
2. **View Analytics**: Explore the user's profile statistics and repository data
3. **Read AI Summary**: Get AI-generated insights about the developer's profile
4. **Check Achievements**: See earned badges based on GitHub activity
5. **Analyze Repositories**: Review repository health scores and language distribution

---

## 🏗️ Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AchievementBadges.tsx
│   │   ├── ActivityFeed.tsx
│   │   ├── LanguageDoughnutChart.tsx
│   │   ├── ProfileCard.tsx
│   │   ├── RepoBarChart.tsx
│   │   ├── RepoHealthScores.tsx
│   │   └── RetroAISummary.tsx
│   ├── pages/              # Page components
│   │   └── Index.tsx       # Main dashboard
│   ├── utils/              # Utility functions
│   │   └── achievementSystem.ts
│   └── integrations/       # Supabase integration
├── supabase/
│   └── functions/          # Edge Functions
│       ├── fetch-github-data/
│       └── summarize-profile/
└── public/                 # Static assets
```

---

## 🎯 Key Components

### **Dashboard (`Index.tsx`)**
Main application component that orchestrates data fetching and display.

### **Edge Functions**
- **`fetch-github-data`**: Fetches user profile, repositories, and README files from GitHub API
- **`summarize-profile`**: Uses AI to generate comprehensive profile analysis

### **Chart Components**
- **`LanguageDoughnutChart`**: Displays programming language distribution
- **`RepoBarChart`**: Shows top repositories by star count

### **Achievement System**
Dynamically calculates and displays badges based on:
- Star count
- Repository count
- Contribution streak
- Language diversity
- Repository health

---

## 🔧 Configuration

### Environment Variables
The project uses Lovable Cloud, which automatically configures:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

---

## 🎨 Design System

The project uses a retro cyberpunk theme with:
- **Primary Colors**: Neon cyan (`#00ffff`) and magenta (`#ff00ff`)
- **Background**: Dark navy (`#0a0a1a`, `#1a1f3a`)
- **Typography**: Press Start 2P for headings, system fonts for body
- **Components**: Custom-styled shadcn/ui components

---

## 📊 Features in Detail

### AI Profile Analysis
The AI analyzes:
- User profile information and bio
- Repository topics and descriptions
- README content from top projects
- Contribution patterns
- Language preferences

### Repository Health Scoring
Factors include:
- README presence and quality
- Recent activity
- Star/fork ratio
- Description quality
- Issue/PR activity

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



---

## 🙏 Acknowledgments

- **GitHub API** - For providing comprehensive developer data
- **shadcn/ui** - For beautiful, accessible components
- **Recharts** - For powerful data visualization

---



---

<div align="center">

**Built with ❤️ For Devs

## 👥 Contributors

Thanks to these wonderful people for their contributions!

- [@Frostykiller21](https://github.com/Frostykiller21)

⭐ Star this repo if you find it helpful!

</div>
