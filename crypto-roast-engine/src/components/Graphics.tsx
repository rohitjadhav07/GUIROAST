
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Zap, Target, Coins } from "lucide-react";

const Graphics = () => {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass("animate-pulse");
      setTimeout(() => setAnimationClass(""), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Icons */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="text-neon-green/20 text-6xl">
          <Coins className="w-16 h-16" />
        </div>
      </div>
      
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "1s" }}>
        <div className="text-neon-purple/20 text-6xl">
          <TrendingUp className="w-12 h-12" />
        </div>
      </div>

      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: "2s" }}>
        <div className="text-neon-orange/20 text-6xl">
          <Zap className="w-14 h-14" />
        </div>
      </div>

      <div className="absolute top-60 left-1/2 animate-float" style={{ animationDelay: "0.5s" }}>
        <div className="text-neon-pink/20 text-6xl">
          <Target className="w-10 h-10" />
        </div>
      </div>

      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "1.5s" }}>
        <div className="text-neon-blue/20 text-6xl">
          <DollarSign className="w-12 h-12" />
        </div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-neon-green/10 to-transparent rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-neon-purple/10 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-neon-orange/10 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 255, 136, 0)" />
            <stop offset="50%" stopColor="rgba(0, 255, 136, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 255, 136, 0)" />
          </linearGradient>
        </defs>
        
        <line 
          x1="0" y1="30%" 
          x2="100%" y2="35%" 
          stroke="url(#line-gradient)" 
          strokeWidth="2"
          className={`${animationClass} opacity-30`}
        />
        <line 
          x1="0" y1="60%" 
          x2="100%" y2="65%" 
          stroke="url(#line-gradient)" 
          strokeWidth="2"
          className={`${animationClass} opacity-20`}
          style={{ animationDelay: "0.5s" }}
        />
        <line 
          x1="0" y1="80%" 
          x2="100%" y2="75%" 
          stroke="url(#line-gradient)" 
          strokeWidth="2"
          className={`${animationClass} opacity-10`}
          style={{ animationDelay: "1s" }}
        />
      </svg>

      {/* Crypto Symbols */}
      <div className="absolute top-32 right-1/4 text-neon-green/10 font-mono text-2xl animate-pulse">
        {'{ BTC: $67,420.69 }'}
      </div>
      <div className="absolute bottom-32 left-1/4 text-neon-purple/10 font-mono text-xl animate-pulse" style={{ animationDelay: "1s" }}>
        {'ETH: $3,845.20'}
      </div>
      <div className="absolute top-1/2 left-10 text-neon-orange/10 font-mono text-lg animate-pulse" style={{ animationDelay: "2s" }}>
        {'APT: $12.85'}
      </div>
    </div>
  );
};

export default Graphics;
