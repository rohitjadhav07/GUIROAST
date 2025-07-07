
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Send, Flame, Trophy, MessageSquare } from "lucide-react";

interface ChatMessage {
  id: string;
  username: string;
  location: string;
  country: string;
  message: string;
  roastScore: number;
  timestamp: string;
  likes: number;
}

const SAMPLE_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    username: "CryptoDegenNYC",
    location: "New York, USA",
    country: "USA",
    message: "Just got absolutely REKT by the AI! Said my portfolio looks like I threw darts at a crypto dartboard blindfolded 😭 RoastScore: 87/100",
    roastScore: 87,
    timestamp: "2 hours ago",
    likes: 23
  },
  {
    id: "2", 
    username: "ShibaLover420",
    location: "Tokyo, Japan",
    country: "Japan",
    message: "AI called me a 'professional bag holder' and said my NFT collection screams 'bought at the top' energy 🔥💀",
    roastScore: 92,
    timestamp: "4 hours ago",
    likes: 45
  },
  {
    id: "3",
    username: "ApeStrongBerlin",
    location: "Berlin, Germany", 
    country: "Germany",
    message: "ElonGPT persona destroyed my soul... said I have the trading skills of a drunk hamster 🐹📉",
    roastScore: 76,
    timestamp: "6 hours ago",
    likes: 18
  },
  {
    id: "4",
    username: "DeFiPrincess",
    location: "London, UK",
    country: "UK", 
    message: "Rekt Master went SAVAGE on my yield farming history. Called it 'financial self-harm with extra steps' 💀",
    roastScore: 94,
    timestamp: "8 hours ago",
    likes: 67
  },
  {
    id: "5",
    username: "MoonBoyMumbai",
    location: "Mumbai, India",
    country: "India",
    message: "Got roasted so hard I'm considering going back to traditional banking 😂 The AI has no chill!",
    roastScore: 89,
    timestamp: "12 hours ago", 
    likes: 31
  },
  {
    id: "6",
    username: "RugPullSurvivor",
    location: "São Paulo, Brazil",
    country: "Brazil",
    message: "Shiba Sage called my trading strategy 'innovative ways to lose money' - can't even be mad, it's accurate 🚀💸",
    roastScore: 83,
    timestamp: "1 day ago",
    likes: 29
  }
];

const LOCATIONS = [
  "New York, USA", "Tokyo, Japan", "London, UK", "Berlin, Germany", 
  "Mumbai, India", "São Paulo, Brazil", "Singapore", "Dubai, UAE",
  "Toronto, Canada", "Sydney, Australia", "Seoul, South Korea", "Paris, France"
];

const WorldChat = () => {
  const [selectedLocation, setSelectedLocation] = useState("Global");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_MESSAGES);

  const filteredMessages = selectedLocation === "Global" 
    ? messages 
    : messages.filter(msg => msg.location.includes(selectedLocation.split(',')[0]));

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      username: "You",
      location: selectedLocation === "Global" ? "Unknown" : selectedLocation,
      country: selectedLocation.split(',')[1]?.trim() || "Unknown",
      message: newMessage,
      roastScore: Math.floor(Math.random() * 40) + 60,
      timestamp: "Just now",
      likes: 0
    };

    setMessages([message, ...messages]);
    setNewMessage("");
  };

  const handleLike = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold gradient-text mb-4">
          🌍 World Roast Chat
        </h2>
        <p className="text-gray-400 text-lg">
          Share your roast experiences with crypto degens worldwide
        </p>
      </div>

      {/* Location Selector */}
      <Card className="crypto-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center text-neon-green">
            <MapPin className="w-5 h-5 mr-2" />
            Choose Your Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedLocation === "Global" ? "default" : "outline"}
              onClick={() => setSelectedLocation("Global")}
              className="mb-2"
            >
              🌍 Global
            </Button>
            {LOCATIONS.map((location) => (
              <Button
                key={location}
                variant={selectedLocation === location ? "default" : "outline"}
                onClick={() => setSelectedLocation(location)}
                className="mb-2"
              >
                {location}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      <Card className="crypto-card mb-6">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Textarea
              placeholder="Share how you got roasted... 🔥"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-crypto-gray/30 border-white/20 text-white placeholder:text-gray-500"
              rows={3}
            />
            <Button 
              onClick={handleSendMessage}
              className="glow-button h-fit"
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card key={message.id} className="crypto-card hover:border-neon-green/30 transition-all">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-neon-green to-neon-purple rounded-full flex items-center justify-center text-sm font-bold">
                    {message.username.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{message.username}</span>
                      <Badge variant="secondary" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {message.location}
                      </Badge>
                    </div>
                    <span className="text-gray-500 text-sm">{message.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={`${
                      message.roastScore >= 90 ? 'bg-red-500/20 text-red-400' :
                      message.roastScore >= 80 ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    <Flame className="w-3 h-3 mr-1" />
                    {message.roastScore}/100
                  </Badge>
                </div>
              </div>
              
              <p className="text-gray-300 mb-3 leading-relaxed">
                {message.message}
              </p>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(message.id)}
                  className="text-gray-400 hover:text-neon-green transition-colors"
                >
                  <Trophy className="w-4 h-4 mr-1" />
                  {message.likes} Tips
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card className="crypto-card">
          <CardContent className="p-8 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400">
              No roast stories from {selectedLocation} yet. Be the first to share!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorldChat;
