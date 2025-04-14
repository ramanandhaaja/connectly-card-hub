import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  Globe, 
  Linkedin, 
  Twitter, 
  Instagram, 
  MapPin, 
  Download, 
  Share2,
  Smartphone
} from "lucide-react";
import { BusinessCardProps } from "@/components/BusinessCard";
import CardShare from "@/components/CardShare";

const CardPage = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<BusinessCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we would fetch from an API
    const storedCards = JSON.parse(localStorage.getItem("businessCards") || "[]");
    const foundCard = storedCards.find((c: BusinessCardProps) => c.id === id);
    
    if (foundCard) {
      setCard(foundCard);
    }
    
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="container py-16 flex justify-center">
        <p>Loading card...</p>
      </div>
    );
  }
  
  if (!card) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Card Not Found</h1>
        <p className="mb-8">The business card you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }
  
  const saveContact = () => {
    // Create a vCard format
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${card.name}
TITLE:${card.title}
ORG:${card.company || ''}
TEL:${card.phone}
EMAIL:${card.email}
URL:${card.website || ''}
ADR;TYPE=WORK:;;${card.location || ''}
END:VCARD`;
    
    // Create a Blob from the vCard data
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `${card.name.replace(/\s+/g, '_')}.vcf`;
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="container max-w-md py-8">
      <div className="rounded-xl overflow-hidden shadow-lg bg-white">
        {/* Card Header */}
        <div 
          className="h-32 bg-gradient-to-r from-connectly-400 to-connectly-600 relative"
          style={card.coverImage ? { backgroundImage: `url(${card.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        />
        
        {/* Profile Section */}
        <div className="px-6 pt-4 pb-6">
          <div className="flex items-center mb-6">
            <div className="h-20 w-20 rounded-full bg-connectly-100 border-4 border-white -mt-12 overflow-hidden">
              {card.profileImage ? (
                <img 
                  src={card.profileImage} 
                  alt={card.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-connectly-100 text-connectly-600 font-bold text-xl">
                  {card.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
              )}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{card.name}</h1>
              <p className="text-gray-600">{card.title}{card.company ? ` at ${card.company}` : ''}</p>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4 mb-6">
            {card.phone && (
              <a href={`tel:${card.phone}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <Phone className="h-5 w-5 text-connectly-500" />
                <span>{card.phone}</span>
              </a>
            )}
            
            {card.email && (
              <a href={`mailto:${card.email}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <Mail className="h-5 w-5 text-connectly-500" />
                <span>{card.email}</span>
              </a>
            )}
            
            {card.website && (
              <a href={card.website.startsWith('http') ? card.website : `https://${card.website}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <Globe className="h-5 w-5 text-connectly-500" />
                <span>{card.website}</span>
              </a>
            )}
            
            {card.location && (
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <MapPin className="h-5 w-5 text-connectly-500" />
                <span>{card.location}</span>
              </div>
            )}
          </div>
          
          {/* Social Links */}
          {(card.linkedin || card.twitter || card.instagram) && (
            <div className="flex gap-4 mb-6">
              {card.linkedin && (
                <a 
                  href={card.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-connectly-100 flex items-center justify-center text-connectly-600 hover:bg-connectly-200"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              
              {card.twitter && (
                <a 
                  href={card.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-connectly-100 flex items-center justify-center text-connectly-600 hover:bg-connectly-200"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              
              {card.instagram && (
                <a 
                  href={card.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-connectly-100 flex items-center justify-center text-connectly-600 hover:bg-connectly-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          )}
          
          {/* Actions */}
          <div className="flex gap-4">
            <Button className="flex-1 gap-2" onClick={saveContact}>
              <Download className="h-4 w-4" />
              Save Contact
            </Button>
            
            <CardShare card={card} />
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">Powered by <Link to="/" className="text-connectly-500 hover:underline">Connectly</Link></p>
      </div>
    </div>
  );
};

export default CardPage;
