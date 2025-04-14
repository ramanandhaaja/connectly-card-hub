import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, Users, QrCode, ExternalLink, Activity } from "lucide-react";
import BusinessCard from "./BusinessCard";
import { BusinessCardProps } from "./BusinessCard";
import CardShare from "./CardShare";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
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
        
        if (data && data.length > 0) {
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
        } else {
          const demoCard = {
            id: "demo-1",
            name: "Alex Johnson",
            title: "Product Manager",
            company: "Connectly",
            email: "alex@connectly.example",
            phone: "(555) 123-4567",
            website: "connectly.example",
            location: "San Francisco, CA",
            linkedin: "https://linkedin.com/in/alexjohnson",
            twitter: "https://twitter.com/alexjohnson",
            instagram: "https://instagram.com/alexjohnson",
          };
          setCards([demoCard]);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCards();

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
  
  const analytics = {
    views: 32,
    shares: 8,
    saves: 5,
    clicks: 12,
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your digital business cards</p>
        </div>
        <Link to="/create">
          <Button className="mt-4 md:mt-0 gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Card
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-connectly-500 mr-2" />
              <div className="text-2xl font-bold">{cards.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Card Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ExternalLink className="h-5 w-5 text-connectly-500 mr-2" />
              <div className="text-2xl font-bold">{analytics.views}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">QR Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <QrCode className="h-5 w-5 text-connectly-500 mr-2" />
              <div className="text-2xl font-bold">{analytics.shares}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Link Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-connectly-500 mr-2" />
              <div className="text-2xl font-bold">{analytics.clicks}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="my-cards">
          <TabsList>
            <TabsTrigger value="my-cards">My Cards</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-cards" className="mt-6">
            {loading ? (
              <p>Loading your cards...</p>
            ) : cards.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No cards yet</h3>
                <p className="text-gray-600 mb-4">Create your first digital business card to get started</p>
                <Link to="/create">
                  <Button>Create Card</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map((card) => (
                  <div key={card.id} className="flex flex-col items-center">
                    <BusinessCard {...card} />
                    <div className="mt-4 flex gap-2">
                      <Link to={`/edit/${card.id}`}>
                        <Button variant="outline">Edit</Button>
                      </Link>
                      <CardShare card={card} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Performance</CardTitle>
                <CardDescription>View statistics for all your digital business cards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Detailed analytics coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
