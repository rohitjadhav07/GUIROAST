
interface MemeTemplate {
  id: string;
  name: string;
  imageUrl: string;
  textPositions: {
    top: { x: number; y: number };
    bottom: { x: number; y: number };
  };
}

const memeTemplates: MemeTemplate[] = [
  {
    id: "drake",
    name: "Drake Pointing",
    imageUrl: "https://i.imgflip.com/30b1gx.jpg",
    textPositions: {
      top: { x: 50, y: 25 },
      bottom: { x: 50, y: 75 }
    }
  },
  {
    id: "distracted",
    name: "Distracted Boyfriend",
    imageUrl: "https://i.imgflip.com/1ur9b0.jpg",
    textPositions: {
      top: { x: 50, y: 10 },
      bottom: { x: 50, y: 90 }
    }
  },
  {
    id: "stonks",
    name: "Stonks",
    imageUrl: "https://i.imgflip.com/2zensg.jpg",
    textPositions: {
      top: { x: 50, y: 15 },
      bottom: { x: 50, y: 85 }
    }
  }
];

export const generateMeme = async (roastText: string, memeCaption: string): Promise<string> => {
  // Simulate meme generation with a random template
  const template = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
  
  // In a real app, this would call an API like imgflip or canvas API
  // For now, we'll return a mock URL with the meme data
  const memeData = {
    template: template.name,
    topText: roastText.slice(0, 50) + "...",
    bottomText: memeCaption,
    timestamp: Date.now()
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return a mock meme URL (in production, this would be the actual generated meme)
  return `https://api.memegen.link/images/custom/${encodeURIComponent(memeData.topText)}/${encodeURIComponent(memeData.bottomText)}.png`;
};

export const shareMeme = (memeUrl: string, roastText: string, platform: 'twitter' | 'telegram' | 'discord') => {
  const shareText = `Just got absolutely REKT by RoastMyBag.AI! 🔥💀\n\n"${roastText.slice(0, 100)}..."\n\n#RoastMyBag #CryptoRekt #GUI`;
  
  const urls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(memeUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(memeUrl)}&text=${encodeURIComponent(shareText)}`,
    discord: `https://discord.com/channels/@me` // Discord doesn't have direct share URLs
  };
  
  if (platform === 'discord') {
    navigator.clipboard.writeText(`${shareText}\n${memeUrl}`);
    return 'copied';
  }
  
  window.open(urls[platform], '_blank');
  return 'opened';
};
