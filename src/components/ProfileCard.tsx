import { Card } from "./ui/card";

export const ProfileCard = ({ profile, statistics }: any) => (
  <Card className="bg-[#1a1f3a] border-2 border-[#ff00ff] p-6">
    <div className="flex gap-6">
      <img src={profile.avatar_url} alt={profile.login} className="w-32 h-32 rounded-full border-4 border-[#00ffff]" />
      <div className="flex-1">
        <h2 className="text-3xl font-['Press_Start_2P'] text-[#ff00ff] mb-2">{profile.name || profile.login}</h2>
        <p className="text-[#00ffff] font-['VT323'] text-xl mb-4">{profile.bio}</p>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div><div className="text-[#ff00ff] text-2xl font-bold">{statistics.publicRepos}</div><div className="text-[#00ffff]">Repos</div></div>
          <div><div className="text-[#ff00ff] text-2xl font-bold">{statistics.totalStars}</div><div className="text-[#00ffff]">Stars</div></div>
          <div><div className="text-[#ff00ff] text-2xl font-bold">{statistics.followers}</div><div className="text-[#00ffff]">Followers</div></div>
          <div><div className="text-[#ff00ff] text-2xl font-bold">{statistics.following}</div><div className="text-[#00ffff]">Following</div></div>
        </div>
      </div>
    </div>
  </Card>
);