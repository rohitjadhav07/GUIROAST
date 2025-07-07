
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalletConnectorProps {
  onConnect: (walletAddress: string) => void;
}

const WalletConnector = ({ onConnect }: WalletConnectorProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const { toast } = useToast();

  const wallets = [
    {
      name: "Petra Wallet",
      id: "petra",
      logo: "🦋",
      description: "Official Aptos wallet"
    },
    {
      name: "Martian Wallet", 
      id: "martian",
      logo: "👽",
      description: "Multi-chain wallet"
    },
    {
      name: "Trust Wallet",
      id: "trust",
      logo: "🛡️", 
      description: "Secure mobile wallet"
    },
    {
      name: "Pontem Wallet",
      id: "pontem",
      logo: "🌉",
      description: "Built for Aptos"
    }
  ];

  const handleConnect = async (walletId: string) => {
    setIsConnecting(true);
    setSelectedWallet(walletId);
    
    try {
      // Simulate wallet connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, generate a mock wallet address
      const mockAddress = `0x${Math.random().toString(16).substring(2, 42)}`;
      
      toast({
        title: "Wallet Connected!",
        description: `Successfully connected to ${wallets.find(w => w.id === walletId)?.name}`,
      });
      
      onConnect(mockAddress);
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Please try again or select a different wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
      setSelectedWallet("");
    }
  };

  return (
    <Card className="crypto-card max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl gradient-text mb-2">
          Connect Your Aptos Wallet
        </CardTitle>
        <p className="text-gray-400">
          Choose your wallet to start getting roasted
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {wallets.map((wallet) => (
          <Button
            key={wallet.id}
            variant="outline"
            className="wallet-button w-full p-6 h-auto justify-start text-left"
            onClick={() => handleConnect(wallet.id)}
            disabled={isConnecting}
          >
            <div className="flex items-center w-full">
              <div className="text-3xl mr-4">{wallet.logo}</div>
              <div className="flex-1">
                <div className="font-semibold text-white group-hover:text-neon-green transition-colors">
                  {wallet.name}
                </div>
                <div className="text-sm text-gray-400">
                  {wallet.description}
                </div>
              </div>
              {isConnecting && selectedWallet === wallet.id && (
                <Loader2 className="w-5 h-5 animate-spin text-neon-green" />
              )}
            </div>
          </Button>
        ))}
        
        <div className="text-center pt-4">
          <p className="text-sm text-gray-500 mb-2">
            Don't have a wallet? Get one first:
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="link" 
              className="text-neon-green hover:text-neon-green/80"
              onClick={() => window.open("https://petra.app/", "_blank")}
            >
              <Wallet className="w-4 h-4 mr-1" />
              Get Petra
            </Button>
            <Button 
              variant="link"
              className="text-neon-purple hover:text-neon-purple/80"
              onClick={() => window.open("https://martianwallet.xyz/", "_blank")}
            >
              <Wallet className="w-4 h-4 mr-1" />
              Get Martian
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnector;
