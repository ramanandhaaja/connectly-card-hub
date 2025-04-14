
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Link, Mail, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { BusinessCardProps } from "./BusinessCard";

interface CardShareProps {
  card: BusinessCardProps;
}

const CardShare = ({ card }: CardShareProps) => {
  const [activeTab, setActiveTab] = useState("qr");
  
  // In a real app, we would generate these dynamically based on the deployed URL
  const cardUrl = `https://connectly.app/c/${card.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cardUrl)}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardUrl);
    toast.success("Link copied to clipboard!");
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share Card</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Card</DialogTitle>
          <DialogDescription>
            Choose how you want to share your digital business card.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="qr" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="qr" className="flex flex-col items-center py-2">
              <QrCode className="h-4 w-4" />
              <span className="text-xs mt-1">QR Code</span>
            </TabsTrigger>
            <TabsTrigger value="link" className="flex flex-col items-center py-2">
              <Link className="h-4 w-4" />
              <span className="text-xs mt-1">Direct Link</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex flex-col items-center py-2">
              <Mail className="h-4 w-4" />
              <span className="text-xs mt-1">Email</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex flex-col items-center py-2">
              <Smartphone className="h-4 w-4" />
              <span className="text-xs mt-1">Wallet</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="qr" className="p-4 flex flex-col items-center">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="w-48 h-48 mt-4 border rounded-lg"
            />
            <p className="text-sm text-center mt-4 text-gray-600">
              Scan this QR code to open the digital business card.
            </p>
          </TabsContent>
          
          <TabsContent value="link" className="p-4">
            <div className="flex items-center gap-2 p-2 rounded-md border bg-muted mt-2">
              <span className="text-sm truncate flex-1">{cardUrl}</span>
              <Button size="sm" onClick={copyToClipboard}>Copy</Button>
            </div>
            <p className="text-sm mt-4 text-gray-600">
              Share this link via text message, social media, or any other platform.
            </p>
          </TabsContent>
          
          <TabsContent value="email" className="p-4">
            <p className="text-sm mb-4">Include your digital business card in your email signature.</p>
            <Button 
              className="w-full"
              onClick={() => {
                window.location.href = `mailto:?subject=My Digital Business Card&body=Here's my digital business card: ${cardUrl}`;
              }}
            >
              Send Email
            </Button>
          </TabsContent>
          
          <TabsContent value="wallet" className="p-4">
            <div className="flex justify-center gap-4 mt-4">
              <Button
                className="flex items-center gap-2"
                variant="outline"
                onClick={() => toast.info("Apple Wallet feature coming soon!")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.0833 4.16659H6.91668C5.80612 4.16659 4.91668 5.05603 4.91668 6.16659V17.8333C4.91668 18.9438 5.80612 19.8333 6.91668 19.8333H17.0833C18.1939 19.8333 19.0833 18.9438 19.0833 17.8333V6.16659C19.0833 5.05603 18.1939 4.16659 17.0833 4.16659Z" />
                </svg>
                Apple Wallet
              </Button>
              <Button
                className="flex items-center gap-2" 
                variant="outline"
                onClick={() => toast.info("Google Wallet feature coming soon!")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
                  <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" />
                </svg>
                Google Wallet
              </Button>
            </div>
            <p className="text-sm mt-4 text-gray-600">
              Add your digital business card to your mobile wallet for easy access.
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CardShare;
