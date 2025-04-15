
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Phone, 
  Mail, 
  Globe, 
  Linkedin, 
  Twitter, 
  Instagram, 
  MapPin 
} from "lucide-react";

export interface BusinessCardProps {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  location?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  profileImage?: string;
  coverImage?: string;
  color?: string;
  variant?: "standard" | "extended";
}

const BusinessCard = ({
  name,
  title,
  company,
  email,
  phone,
  website,
  location,
  linkedin,
  twitter,
  instagram,
  profileImage,
  coverImage,
  color = "from-connectly-400 to-connectly-600",
  variant = "standard",
}: BusinessCardProps) => {

  const isExtended = variant === "extended";
  
  return (
    <div className="business-card">
      <Card className={`h-full w-full overflow-hidden border border-gray-200 p-0 ${isExtended ? 'aspect-[4/2]' : ''}`}>
        {/* Card Header with Cover Image */}
        <div 
          className={`${isExtended ? 'h-1/4' : 'h-1/3'} w-full bg-gradient-to-r ${color} relative`}
          style={coverImage ? { backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        />
        
        {/* Profile Section */}
        <div className={`${isExtended ? 'h-3/4' : 'h-2/3'} p-4 flex flex-col relative`}>
          {/* Avatar */}
          <Avatar className="h-16 w-16 absolute -top-8 left-4 border-4 border-white">
            <AvatarImage src={profileImage} alt={name} />
            <AvatarFallback className="bg-connectly-100 text-connectly-600">
              {name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {/* User Info */}
          <div className="mt-10 space-y-1">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-gray-600">{title}{company ? ` at ${company}` : ''}</p>
          </div>
          
          {/* Contact Info */}
          <div className="mt-4 space-y-2 text-sm">
            {phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-connectly-500" />
                <span>{phone}</span>
              </div>
            )}
            
            {email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-connectly-500" />
                <span>{email}</span>
              </div>
            )}
            
            {website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-connectly-500" />
                <span>{website}</span>
              </div>
            )}
            
            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-connectly-500" />
                <span>{location}</span>
              </div>
            )}
          </div>
          
          {/* Social Links */}
          {(linkedin || twitter || instagram) && (
            <div className="mt-auto pt-3 flex gap-3">
              {linkedin && <Linkedin className="h-5 w-5 text-gray-600 hover:text-connectly-500" />}
              {twitter && <Twitter className="h-5 w-5 text-gray-600 hover:text-connectly-500" />}
              {instagram && <Instagram className="h-5 w-5 text-gray-600 hover:text-connectly-500" />}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BusinessCard;
