import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Flame, Coins, Share2, Loader2, TrendingUp, TrendingDown, Zap, Twitter, MessageCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateMeme, shareMeme } from "@/utils/memeGenerator";
import MemeViewer from "./MemeViewer";

interface RoastEngineProps {
  walletAddress: string;
}

const RoastEngine = ({ walletAddress }: RoastEngineProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRoasting, setIsRoasting] = useState(false);
  const [isGeneratingMeme, setIsGeneratingMeme] = useState(false);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [roastResult, setRoastResult] = useState<any>(null);
  const [selectedPersona, setSelectedPersona] = useState("shiba-sage");
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);
  const [showMemeViewer, setShowMemeViewer] = useState(false);
  const { toast } = useToast();

  // Mock portfolio data
  const mockPortfolio = {
    totalValue: 1247.83,
    tokens: [
      { symbol: "APT", amount: 420.69, value: 892.15, change: -12.5 },
      { symbol: "GUI", amount: 1337, value: 267.4, change: 45.2 },
      { symbol: "USDC", amount: 88.28, value: 88.28, change: 0 }
    ],
    nfts: [
      { name: "Bored Ape #4269", floor: 15.2, rarity: "Rare" },
      { name: "Crypto Punk #1337", floor: 8.7, rarity: "Common" }
    ],
    recentTrades: [
      { type: "swap", from: "USDC", to: "GUI", amount: 500, timestamp: "2h ago", pnl: -23.4 },
      { type: "swap", from: "APT", to: "MEME", amount: 100, timestamp: "1d ago", pnl: -89.2 }
    ]
  };

  const personas = [
    { 
      id: "shiba-sage", 
      name: "Shiba Sage", 
      price: "Free", 
      description: "Gentle wisdom with a bite",
      emoji: "🐕‍🦺"
    },
    { 
      id: "elon-gpt", 
      name: "ElonGPT", 
      price: "5 GUI", 
      description: "Musk-level meme energy",
      emoji: "🚀"
    },
    { 
      id: "degen-lord", 
      name: "Degen Lord", 
      price: "10 GUI", 
      description: "Maximum degeneracy unlocked",
      emoji: "👹"
    },
    { 
      id: "rekt-master", 
      name: "Rekt Master", 
      price: "15 GUI", 
      description: "Absolute savage mode",
      emoji: "💀"
    }
  ];

  const mockRoasts = {
    "shiba-sage": {
      roast: "Oh sweet summer child, your portfolio is like a participation trophy - technically you're playing the game, but nobody's really impressed. That 12.5% APT dump? Even my dog food investments perform better. But hey, at least you have some GUI tokens, which shows you have slightly more brain cells than the average degen. Keep HODLing, maybe one day you'll graduate from rekt to just 'financially challenged'.",
      score: 65,
      memeCaption: "When you think you're investing but you're really just donating to the market"
    },
    "elon-gpt": {
      roast: "Mars called, they don't want your portfolio either 🚀 Your APT bag is dumping harder than my Cybertruck stock, and those NFTs? I've seen more utility in a broken Falcon 9. At least you're HODLing GUI like a true degen - that's the kind of diamond hands energy that gets you to Mars... or bankruptcy court. Either way, it'll be epic! Much wow, very rekt. 💎🙌",
      score: 78,
      memeCaption: "TO THE MOON! (via the center of the earth first)"
    },
    "degen-lord": {
      roast: "BRUH 😂 Your portfolio screams 'I learned about crypto from TikTok' louder than a laser-eyed Twitter avatar! You're down 12.5% on APT while the rest of us are farming yields and stacking sats. Those NFT floor prices? More like basement prices! Your recent swaps show you're basically a liquidity provider for smarter traders. But respect for the GUI bag - at least you can recognize one gem in the rough pile of your financial decisions.",
      score: 82,
      memeCaption: "POV: You bought the top and called it 'dollar cost averaging'"
    },
    "rekt-master": {
      roast: "💀 ABSOLUTELY DEMOLISHED 💀 Your portfolio is what happens when someone mistakes a casino for an investment platform. That -12.5% APT performance? I've seen corpses with more life in them. Your NFT collection is worth less than the gas fees you paid to mint them. Your trading history reads like a masterclass in how to lose money consistently. The only thing green in your portfolio is your face from nausea. But hey, you've got GUI tokens, so you're not completely hopeless - just 99.7% hopeless. RIP to your gainz, they died too young. 🪦",
      score: 94,
      memeCaption: "This wallet needs CPR (Crypto Portfolio Resuscitation)"
    }
  };

  const analyzePortfolio = async () => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setPortfolioData(mockPortfolio);
      toast({
        title: "Portfolio Analyzed!",
        description: "Your wallet data has been fetched and analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not fetch portfolio data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateRoast = async () => {
    if (!portfolioData) return;
    
    setIsRoasting(true);
    const selectedPersonaData = personas.find(p => p.id === selectedPersona);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      if (selectedPersonaData?.price !== "Free") {
        toast({
          title: `${selectedPersonaData?.price} Deducted`,
          description: `Premium roast unlocked! GUI tokens spent wisely.`,
        });
      }
      
      setRoastResult({
        persona: selectedPersonaData,
        ...mockRoasts[selectedPersona as keyof typeof mockRoasts]
      });
      
      toast({
        title: "🔥 ROASTED! 🔥",
        description: "Your portfolio has been absolutely destroyed!",
      });
    } catch (error) {
      toast({
        title: "Roast Failed",
        description: "The AI couldn't handle how bad your portfolio is.",
        variant: "destructive",
      });
    } finally {
      setIsRoasting(false);
    }
  };

  const handleShareRoast = async (platform: 'twitter' | 'telegram' | 'copy') => {
    if (!roastResult) return;

    const shareText = `Just got absolutely REKT by RoastMyBag.AI! 🔥💀\n\n"${roastResult.roast.slice(0, 150)}..."\n\nRoast Score: ${roastResult.score}/100\n\n#RoastMyBag #CryptoRekt #GUI`;
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Roast Copied!",
        description: "Share your epic roast anywhere!",
      });
      return;
    }

    const result = shareMeme('', roastResult.roast, platform);
    if (result === 'opened') {
      toast({
        title: "Sharing Roast...",
        description: `Opening ${platform} to share your epic roast!`,
      });
    }
  };

  const handleGenerateMeme = async () => {
    if (!roastResult) return;
    
    setIsGeneratingMeme(true);
    try {
      toast({
        title: "Generating Meme...",
        description: "Creating your epic roast meme! 2 GUI tokens will be spent.",
      });

      const memeUrl = await generateMeme(roastResult.roast, roastResult.memeCaption);
      setGeneratedMeme(memeUrl);
      setShowMemeViewer(true);
      
      toast({
        title: "🎨 Meme Generated!",
        description: "Your roast meme is ready to be shared!",
      });
    } catch (error) {
      toast({
        title: "Meme Generation Failed",
        description: "Could not generate meme. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingMeme(false);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Portfolio Roast Engine
          </h1>
          <p className="text-gray-400 text-lg">
            Prepare for absolute destruction of your financial decisions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Portfolio Analysis */}
          <div className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="flex items-center text-neon-green">
                  <Bot className="w-5 h-5 mr-2" />
                  Wallet Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!portfolioData ? (
                  <div className="text-center py-8">
                    <Button 
                      onClick={analyzePortfolio}
                      disabled={isAnalyzing}
                      className="glow-button"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing Portfolio...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Analyze My Bag
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">
                      Wallet: {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white">
                        ${portfolioData.totalValue.toLocaleString()}
                      </h3>
                      <p className="text-gray-400">Total Portfolio Value</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold text-white mb-3">Token Holdings</h4>
                      {portfolioData.tokens.map((token: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <div>
                            <span className="font-mono text-white">{token.symbol}</span>
                            <span className="text-gray-400 ml-2">{token.amount}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white">${token.value}</div>
                            <div className={`text-sm flex items-center ${token.change >= 0 ? 'text-crypto-success' : 'text-crypto-danger'}`}>
                              {token.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                              {token.change}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold text-white mb-3">Recent Trades</h4>
                      {portfolioData.recentTrades.map((trade: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2 text-sm">
                          <div>
                            <span className="text-gray-300">{trade.from} → {trade.to}</span>
                            <span className="text-gray-500 ml-2">{trade.timestamp}</span>
                          </div>
                          <span className={`${trade.pnl >= 0 ? 'text-crypto-success' : 'text-crypto-danger'}`}>
                            {trade.pnl >= 0 ? '+' : ''}${trade.pnl}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Roast Generation */}
          <div className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="flex items-center text-neon-purple">
                  <Flame className="w-5 h-5 mr-2" />
                  Choose Your Destroyer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {personas.map((persona) => (
                    <Button
                      key={persona.id}
                      variant={selectedPersona === persona.id ? "default" : "outline"}
                      className={`p-4 h-auto text-left ${
                        selectedPersona === persona.id 
                          ? "bg-neon-green/20 border-neon-green text-neon-green" 
                          : "wallet-button"
                      }`}
                      onClick={() => setSelectedPersona(persona.id)}
                    >
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">{persona.emoji}</span>
                          <div>
                            <div className="font-semibold">{persona.name}</div>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${persona.price === "Free" ? "bg-crypto-success/20 text-crypto-success" : "bg-neon-orange/20 text-neon-orange"}`}
                            >
                              {persona.price}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">{persona.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button
                    onClick={generateRoast}
                    disabled={!portfolioData || isRoasting}
                    className="glow-button w-full text-lg py-3"
                  >
                    {isRoasting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Roast...
                      </>
                    ) : (
                      <>
                        <Flame className="w-5 h-5 mr-2" />
                        ROAST MY BAG!
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Roast Result */}
            {roastResult && (
              <Card className="crypto-card border-2 border-neon-orange/50 animate-glow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center text-neon-orange">
                      <span className="text-3xl mr-2">{roastResult.persona.emoji}</span>
                      {roastResult.persona.name} Says:
                    </span>
                    <Badge className="bg-neon-orange/20 text-neon-orange text-lg px-3 py-1">
                      Roast Score: {roastResult.score}/100
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-crypto-gray/30 p-4 rounded-lg border-l-4 border-neon-orange">
                    <p className="text-white leading-relaxed text-lg">
                      {roastResult.roast}
                    </p>
                  </div>
                  
                  <div className="bg-neon-green/10 p-3 rounded-lg">
                    <p className="text-neon-green font-semibold text-center">
                      💀 "{roastResult.memeCaption}" 💀
                    </p>
                  </div>

                  {/* Share and Meme Buttons */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        onClick={() => handleShareRoast('twitter')}
                        className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30"
                        size="sm"
                      >
                        <Twitter className="w-3 h-3 mr-1" />
                        Tweet
                      </Button>
                      <Button 
                        onClick={() => handleShareRoast('telegram')}
                        className="bg-blue-400/20 text-blue-300 border-blue-400/30 hover:bg-blue-400/30"
                        size="sm"
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Telegram
                      </Button>
                      <Button 
                        onClick={() => handleShareRoast('copy')}
                        variant="outline"
                        className="border-neon-green/30 hover:bg-neon-green/10"
                        size="sm"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>

                    <Button
                      onClick={handleGenerateMeme}
                      disabled={isGeneratingMeme}
                      className="w-full bg-neon-purple/20 text-neon-purple border-neon-purple/30 hover:bg-neon-purple/30"
                    >
                      {isGeneratingMeme ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating Meme...
                        </>
                      ) : (
                        <>
                          <Coins className="w-4 h-4 mr-2" />
                          Generate Meme (2 GUI)
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Meme Viewer Modal */}
      {showMemeViewer && generatedMeme && roastResult && (
        <MemeViewer 
          memeUrl={generatedMeme}
          roastText={roastResult.roast}
          memeCaption={roastResult.memeCaption}
          onClose={() => setShowMemeViewer(false)}
        />
      )}
    </>
  );
};

export default RoastEngine;
