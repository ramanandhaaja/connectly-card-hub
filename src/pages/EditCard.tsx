
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import CardForm from "@/components/CardForm";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const EditCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        if (!id) return;
        
        const { data, error } = await supabase
          .from('business_cards')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        setCardData(data);
      } catch (error) {
        console.error("Error fetching card:", error);
        toast.error("Failed to fetch card data");
        navigate("/cards");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCard();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container py-8 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading card data...</span>
      </div>
    );
  }

  return <CardForm initialData={cardData} />;
};

export default EditCard;
