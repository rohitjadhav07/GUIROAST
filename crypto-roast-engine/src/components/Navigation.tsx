
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Trophy, Home, MessageSquare, Wallet } from "lucide-react";

interface NavigationProps {
  currentView: "home" | "roast" | "leaderboard" | "chat";
  setCurrentView: (view: "home" | "roast" | "leaderboard" | "chat") => void;
  isConnected: boolean;
  walletAddress?: string;
}

const Navigation = ({ currentView, setCurrentView, isConnected, walletAddress }: NavigationProps) => {
  return (
    <nav className="sticky top-0 z-50 bg-crypto-dark/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold gradient-text">RoastMyBag.AI</h1>
            <Badge variant="secondary" className="bg-neon-green/20 text-neon-green">
              Beta
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant={currentView === "home" ? "default" : "ghost"}
              onClick={() => setCurrentView("home")}
              className="text-white hover:text-neon-green"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            
            {isConnected && (
              <>
                <Button
                  variant={currentView === "roast" ? "default" : "ghost"}
                  onClick={() => setCurrentView("roast")}
                  className="text-white hover:text-neon-green"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Roast
                </Button>
                
                <Button
                  variant={currentView === "chat" ? "default" : "ghost"}
                  onClick={() => setCurrentView("chat")}
                  className="text-white hover:text-neon-blue"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  World Chat
                </Button>
              </>
            )}
            
            <Button
              variant={currentView === "leaderboard" ? "default" : "ghost"}
              onClick={() => setCurrentView("leaderboard")}
              className="text-white hover:text-neon-purple"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </Button>
            
            {isConnected && walletAddress && (
              <div className="crypto-card px-3 py-2">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-neon-green" />
                  <span className="text-sm font-mono text-gray-300">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
