
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import BusinessCard from "@/components/BusinessCard";
import { BusinessCardProps } from "@/components/BusinessCard";
import CardShare from "@/components/CardShare";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CardsPage = () => {
  const [cards, setCards] = useState<BusinessCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data, error } = await supabase
          .from('business_cards')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        const formattedCards = data.map(card => ({
          id: card.id,
          name: card.name,
          title: card.title,
          company: card.company || "",
          email: card.email,
          phone: card.phone,
          website: card.website || "",
          location: card.location || "",
          linkedin: card.linkedin || "",
          twitter: card.twitter || "",
          instagram: card.instagram || "",
          profileImage: card.profile_image || "",
          coverImage: card.cover_image || "",
        }));
        
        setCards(formattedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
        toast.error("Failed to fetch cards");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCards();

    // Set up realtime subscription
    const channel = supabase
      .channel('public:business_cards')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'business_cards' 
      }, (payload) => {
        console.log('Change received!', payload);
        fetchCards();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const deleteCard = async (id: string) => {
    if (confirm("Are you sure you want to delete this card?")) {
      try {
        const { error } = await supabase
          .from('business_cards')
          .delete()
          .eq('id', id);
        
        if (error) {
          throw error;
        }
        
        toast.success("Card deleted successfully");
      } catch (error) {
        console.error("Error deleting card:", error);
        toast.error("Failed to delete card");
      }
    }
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Cards</h1>
          <p className="text-gray-600 mt-1">Manage your digital business cards</p>
        </div>
        <Link to="/create">
          <Button className="mt-4 md:mt-0 gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Card
          </Button>
        </Link>
      </div>
      
      {loading ? (
        <p>Loading your cards...</p>
      ) : cards.length === 0 ? (
        <div className="text-center py-12 bg-connectly-50 rounded-xl">
          <h3 className="text-lg font-medium mb-2">No cards yet</h3>
          <p className="text-gray-600 mb-4">Create your first digital business card to get started</p>
          <Link to="/create">
            <Button>Create Card</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div key={card.id} className="flex flex-col">
              <BusinessCard {...card} variant="extended" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Link to={`/card/${card.id}`} className="col-span-2">
                  <Button variant="outline" className="w-full">View</Button>
                </Link>
                <Button 
                  variant="destructive" 
                  onClick={() => deleteCard(card.id)}
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex gap-2">
                <Link to={`/edit/${card.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">Edit</Button>
                </Link>
                <div className="flex-1">
                  <CardShare card={card} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsPage;
