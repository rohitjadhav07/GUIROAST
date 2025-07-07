import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Zap, Trophy, Share2, Flame, Coins, Target, Bot, MessageSquare } from "lucide-react";
import WalletConnector from "@/components/WalletConnector";
import RoastEngine from "@/components/RoastEngine";
import Navigation from "@/components/Navigation";
import WorldChat from "@/components/WorldChat";
import Leaderboard from "@/components/Leaderboard";
import Graphics from "@/components/Graphics";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string>("");
  const [currentView, setCurrentView] = useState<"home" | "roast" | "leaderboard" | "chat">("home");

  const handleWalletConnect = (walletAddress: string) => {
    setIsConnected(true);
    setConnectedWallet(walletAddress);
    console.log("Wallet connected:", walletAddress);
  };

  const features = [
    {
      icon: Bot,
      title: "AI Roast Engine",
      description: "Get savagely roasted by our AI personas based on your portfolio",
      color: "text-neon-purple"
    },
    {
      icon: Coins,
      title: "$GUI Token Utility", 
      description: "Unlock premium roasts, meme generation, and tip the best roasts",
      color: "text-neon-orange"
    },
    {
      icon: Trophy,
      title: "Leaderboards",
      description: "Compete for the most roasted wallet and funniest roast awards",
      color: "text-neon-pink"
    },
    {
      icon: MessageSquare,
      title: "World Chat",
      description: "Share your roast experiences with crypto degens globally",
      color: "text-neon-blue"
    }
  ];

  const personas = [
    { name: "Shiba Sage", price: "Free", description: "Light roasting for beginners" },
    { name: "ElonGPT", price: "5 GUI", description: "Musk-level meme energy" },
    { name: "Degen Lord", price: "10 GUI", description: "Maximum degeneracy unlocked" },
    { name: "Rekt Master", price: "15 GUI", description: "Absolute savage mode" }
  ];

  if (currentView === "roast" && isConnected) {
    return (
      <div className="min-h-screen bg-crypto-dark relative">
        <Graphics />
        <div className="relative z-10">
          <Navigation 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isConnected={isConnected}
            walletAddress={connectedWallet}
          />
          <RoastEngine walletAddress={connectedWallet} />
        </div>
      </div>
    );
  }

  if (currentView === "chat") {
    return (
      <div className="min-h-screen bg-crypto-dark relative">
        <Graphics />
        <div className="relative z-10">
          <Navigation 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isConnected={isConnected}
            walletAddress={connectedWallet}
          />
          <WorldChat />
        </div>
      </div>
    );
  }

  if (currentView === "leaderboard") {
    return (
      <div className="min-h-screen bg-crypto-dark relative">
        <Graphics />
        <div className="relative z-10">
          <Navigation 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isConnected={isConnected}
            walletAddress={connectedWallet}
          />
          <Leaderboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crypto-dark overflow-hidden relative">
      <Graphics />
      
      <div className="relative z-10">
        <Navigation 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          isConnected={isConnected}
          walletAddress={connectedWallet}
        />
        
        {/* Hero Section */}
        <section className="relative px-4 py-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 to-transparent"></div>
          <div className="relative max-w-6xl mx-auto">
            <div className="animate-float mb-8">
              <h1 className="text-6xl md:text-8xl font-black mb-6">
                <span className="gradient-text animate-pulse-neon">ROAST</span>
                <br />
                <span className="text-white">MY</span>
                <br />
                <span className="neon-text">BAG.AI</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect your crypto wallet and get absolutely <span className="neon-text font-bold">DEMOLISHED</span> by our AI. 
              Your portfolio choices will never recover from this roast! 🔥
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="bg-neon-green/20 text-neon-green border-neon-green/30 text-lg py-2 px-4">
                <Flame className="w-4 h-4 mr-2" />
                AI-Powered Roasts
              </Badge>
              <Badge variant="secondary" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-lg py-2 px-4">
                <Zap className="w-4 h-4 mr-2" />
                $GUI Token Utility
              </Badge>
              <Badge variant="secondary" className="bg-neon-orange/20 text-neon-orange border-neon-orange/30 text-lg py-2 px-4">
                <Target className="w-4 h-4 mr-2" />
                Aptos Blockchain
              </Badge>
            </div>

            {!isConnected ? (
              <WalletConnector onConnect={handleWalletConnect} />
            ) : (
              <div className="space-y-6">
                <div className="crypto-card p-6 max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-2 text-neon-green">Wallet Connected!</h3>
                  <p className="text-gray-400 font-mono text-sm mb-4">
                    {connectedWallet.slice(0, 8)}...{connectedWallet.slice(-8)}
                  </p>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setCurrentView("roast")}
                      className="glow-button w-full text-lg py-3"
                    >
                      <Bot className="w-5 h-5 mr-2" />
                      GET ROASTED NOW
                    </Button>
                    <Button 
                      onClick={() => setCurrentView("chat")}
                      variant="outline"
                      className="w-full text-lg py-3 border-neon-blue/50 hover:bg-neon-blue/10"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      JOIN WORLD CHAT
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
              Why Your Portfolio Deserves This
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="crypto-card group hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color} group-hover:animate-bounce`} />
                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Roast Personas */}
        <section className="px-4 py-20 bg-gradient-to-b from-transparent to-neon-green/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
              Choose Your Roast Persona
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personas.map((persona, index) => (
                <Card key={index} className="crypto-card group hover:border-neon-green/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{persona.name}</h3>
                      <Badge 
                        variant={persona.price === "Free" ? "secondary" : "default"}
                        className={persona.price === "Free" ? "bg-crypto-success/20 text-crypto-success" : "bg-neon-orange/20 text-neon-orange"}
                      >
                        {persona.price}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-4">{persona.description}</p>
                    <div className="flex justify-center">
                      <Bot className="w-8 h-8 text-neon-green group-hover:animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-500 mb-4">
              Built for the GUI INU Ideathon on Aptos Blockchain
            </p>
            <p className="text-sm text-gray-600">
              ⚠️ This app will absolutely roast your portfolio. Use at your own risk of getting rekt emotionally.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
