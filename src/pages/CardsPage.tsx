
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import BusinessCard from "@/components/BusinessCard";
import { BusinessCardProps } from "@/components/BusinessCard";
import CardShare from "@/components/CardShare";
import { toast } from "sonner";

const CardsPage = () => {
  const [cards, setCards] = useState<BusinessCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we would fetch from an API
    const storedCards = JSON.parse(localStorage.getItem("businessCards") || "[]");
    setCards(storedCards);
    setLoading(false);
  }, []);
  
  const deleteCard = (id: string) => {
    if (confirm("Are you sure you want to delete this card?")) {
      const updatedCards = cards.filter(card => card.id !== id);
      setCards(updatedCards);
      localStorage.setItem("businessCards", JSON.stringify(updatedCards));
      toast.success("Card deleted successfully");
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
              <BusinessCard {...card} />
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
