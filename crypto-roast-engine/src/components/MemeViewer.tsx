
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Download, Copy, Twitter, MessageCircle, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { shareMeme } from "@/utils/memeGenerator";

interface MemeViewerProps {
  memeUrl: string;
  roastText: string;
  memeCaption: string;
  onClose: () => void;
}

const MemeViewer = ({ memeUrl, roastText, memeCaption, onClose }: MemeViewerProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const handleShare = async (platform: 'twitter' | 'telegram' | 'discord') => {
    setIsSharing(true);
    try {
      const result = shareMeme(memeUrl, roastText, platform);
      
      if (result === 'copied') {
        toast({
          title: "Copied to Clipboard!",
          description: "Meme and roast text copied. Paste it in Discord!",
        });
      } else {
        toast({
          title: "Sharing...",
          description: `Opening ${platform} to share your epic roast!`,
        });
      }
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Could not share the meme. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  const copyMemeUrl = () => {
    navigator.clipboard.writeText(memeUrl);
    toast({
      title: "Meme URL Copied!",
      description: "Share this epic roast anywhere!",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="crypto-card max-w-2xl w-full max-h-[90vh] overflow-auto">
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold gradient-text">Your Epic Roast Meme! 🔥</h3>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </Button>
          </div>

          {/* Meme Image */}
          <div className="bg-white rounded-lg p-4">
            <img 
              src={memeUrl} 
              alt="Generated Roast Meme" 
              className="w-full max-w-md mx-auto rounded-lg"
              onError={(e) => {
                // Fallback for broken image
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/400x400/1a1a1f/00ff88?text=MEME+GENERATED";
              }}
            />
          </div>

          {/* Meme Caption */}
          <div className="bg-neon-green/10 p-4 rounded-lg border border-neon-green/30">
            <p className="text-neon-green font-bold text-center text-lg">
              💀 "{memeCaption}" 💀
            </p>
          </div>

          {/* Share Buttons */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Share Your Roast:</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleShare('twitter')}
                disabled={isSharing}
                className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              
              <Button
                onClick={() => handleShare('telegram')}
                disabled={isSharing}
                className="bg-blue-400/20 text-blue-300 border-blue-400/30 hover:bg-blue-400/30"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Telegram
              </Button>
              
              <Button
                onClick={() => handleShare('discord')}
                disabled={isSharing}
                className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/30"
              >
                <Hash className="w-4 h-4 mr-2" />
                Discord
              </Button>
              
              <Button
                onClick={copyMemeUrl}
                variant="outline"
                className="border-neon-green/30 hover:bg-neon-green/10"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-4">
            <Badge className="bg-neon-orange/20 text-neon-orange">
              🔥 Epic Roast Generated
            </Badge>
            <Badge className="bg-neon-purple/20 text-neon-purple">
              💎 2 GUI Spent
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemeViewer;
