
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Coins, Crown, Medal, Award } from "lucide-react";

const Leaderboard = () => {
  const leaderboardData = {
    mostRoasted: [
      { rank: 1, wallet: "0x1a2b3c4d...5e6f", roastCount: 127, totalScore: 8943, avatar: "🤡" },
      { rank: 2, wallet: "0x7g8h9i0j...1k2l", roastCount: 89, totalScore: 7234, avatar: "😭" },
      { rank: 3, wallet: "0x3m4n5o6p...7q8r", roastCount: 76, totalScore: 6789, avatar: "💀" },
      { rank: 4, wallet: "0x9s0t1u2v...3w4x", roastCount: 65, totalScore: 5432, avatar: "🔥" },
      { rank: 5, wallet: "0x5y6z7a8b...9c0d", roastCount: 54, totalScore: 4321, avatar: "😵" }
    ],
    topTippers: [
      { rank: 1, wallet: "0xabc123...def456", guiSpent: 2847, roastsSponsored: 45, avatar: "💎" },
      { rank: 2, wallet: "0x789xyz...012abc", guiSpent: 1923, roastsSponsored: 31, avatar: "🚀" },
      { rank: 3, wallet: "0x456def...789ghi", guiSpent: 1654, roastsSponsored: 28, avatar: "🔸" },
      { rank: 4, wallet: "0x012jkl...345mno", guiSpent: 1432, roastsSponsored: 24, avatar: "💰" },
      { rank: 5, wallet: "0x678pqr...901stu", guiSpent: 1187, roastsSponsored: 19, avatar: "⭐" }
    ],
    savage: [
      { rank: 1, persona: "Rekt Master", avgScore: 94.2, roastCount: 234, tips: 1847, avatar: "💀" },
      { rank: 2, persona: "Degen Lord", avgScore: 87.8, roastCount: 189, tips: 1523, avatar: "👹" },
      { rank: 3, persona: "ElonGPT", avgScore: 82.1, roastCount: 156, tips: 1289, avatar: "🚀" },
      { rank: 4, persona: "Shiba Sage", avgScore: 71.4, roastCount: 298, tips: 987, avatar: "🐕‍🦺" }
    ]
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-gray-400 font-bold">#{rank}</span>;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (rank === 2) return "bg-gray-400/20 text-gray-300 border-gray-400/30";
    if (rank === 3) return "bg-amber-600/20 text-amber-500 border-amber-600/30";
    return "bg-gray-600/20 text-gray-400 border-gray-600/30";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Rekt Leaderboard 🏆
        </h1>
        <p className="text-gray-400 text-lg">
          Hall of Fame for the Most Demolished Portfolios
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Most Roasted Wallets */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="flex items-center text-neon-orange">
              <Flame className="w-5 h-5 mr-2" />
              Most Roasted Wallets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaderboardData.mostRoasted.map((entry) => (
              <div key={entry.rank} className="flex items-center justify-between p-3 bg-crypto-gray/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getRankIcon(entry.rank)}
                  <span className="text-2xl">{entry.avatar}</span>
                  <div>
                    <p className="font-mono text-sm text-white">{entry.wallet}</p>
                    <p className="text-xs text-gray-400">{entry.roastCount} roasts</p>
                  </div>
                </div>
                <Badge className={getRankBadge(entry.rank)}>
                  {entry.totalScore}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top GUI Spenders */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="flex items-center text-neon-green">
              <Coins className="w-5 h-5 mr-2" />
              Top GUI Spenders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaderboardData.topTippers.map((entry) => (
              <div key={entry.rank} className="flex items-center justify-between p-3 bg-crypto-gray/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getRankIcon(entry.rank)}
                  <span className="text-2xl">{entry.avatar}</span>
                  <div>
                    <p className="font-mono text-sm text-white">{entry.wallet}</p>
                    <p className="text-xs text-gray-400">{entry.roastsSponsored} roasts sponsored</p>
                  </div>
                </div>
                <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                  {entry.guiSpent} GUI
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Most Savage Personas */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="flex items-center text-neon-purple">
              <Trophy className="w-5 h-5 mr-2" />
              Savage AI Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaderboardData.savage.map((entry) => (
              <div key={entry.rank} className="flex items-center justify-between p-3 bg-crypto-gray/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getRankIcon(entry.rank)}
                  <span className="text-2xl">{entry.avatar}</span>
                  <div>
                    <p className="text-sm text-white font-semibold">{entry.persona}</p>
                    <p className="text-xs text-gray-400">{entry.roastCount} roasts delivered</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 mb-1">
                    {entry.avgScore} avg
                  </Badge>
                  <p className="text-xs text-gray-400">{entry.tips} tips</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Reset Timer */}
      <Card className="crypto-card mt-8">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-neon-orange mb-2">Weekly Reset</h3>
          <p className="text-gray-400 mb-4">Leaderboard resets every Sunday at midnight UTC</p>
          <div className="flex justify-center space-x-4 text-lg font-mono">
            <div className="bg-neon-green/10 px-4 py-2 rounded-lg border border-neon-green/30">
              <span className="text-neon-green">2d</span>
              <p className="text-xs text-gray-400">Days</p>
            </div>
            <div className="bg-neon-orange/10 px-4 py-2 rounded-lg border border-neon-orange/30">
              <span className="text-neon-orange">14h</span>
              <p className="text-xs text-gray-400">Hours</p>
            </div>
            <div className="bg-neon-purple/10 px-4 py-2 rounded-lg border border-neon-purple/30">
              <span className="text-neon-purple">32m</span>
              <p className="text-xs text-gray-400">Minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
