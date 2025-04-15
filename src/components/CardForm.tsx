
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import CardBasicInfoSection from "./forms/CardBasicInfoSection";
import CardSocialSection from "./forms/CardSocialSection";
import CardAppearanceSection from "./forms/CardAppearanceSection";
import CardPreview from "./forms/CardPreview";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Job title is required"),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  location: z.string().optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid Twitter URL").optional().or(z.literal("")),
  instagram: z.string().url("Invalid Instagram URL").optional().or(z.literal("")),
  profileImage: z.string().optional(),
  coverImage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CardFormProps {
  initialData?: any;
}

const CardForm = ({ initialData }: CardFormProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const isEditing = !!initialData;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      title: initialData?.title || "",
      company: initialData?.company || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      website: initialData?.website || "",
      location: initialData?.location || "",
      linkedin: initialData?.linkedin || "",
      twitter: initialData?.twitter || "",
      instagram: initialData?.instagram || "",
      profileImage: initialData?.profile_image || "",
      coverImage: initialData?.cover_image || "",
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    try {
      if (isEditing) {
        // Update existing card
        const { error } = await supabase
          .from('business_cards')
          .update({
            name: data.name,
            title: data.title,
            company: data.company || null,
            email: data.email,
            phone: data.phone,
            website: data.website || null,
            location: data.location || null,
            linkedin: data.linkedin || null,
            twitter: data.twitter || null,
            instagram: data.instagram || null,
            profile_image: data.profileImage || null,
            cover_image: data.coverImage || null,
          })
          .eq('id', initialData.id);
        
        if (error) throw error;
        toast.success("Business card updated successfully!");
      } else {
        // Create new card - note we're not setting user_id since we don't have auth yet
        const { error } = await supabase
          .from('business_cards')
          .insert([
            {
              name: data.name,
              title: data.title,
              company: data.company || null,
              email: data.email,
              phone: data.phone,
              website: data.website || null,
              location: data.location || null,
              linkedin: data.linkedin || null,
              twitter: data.twitter || null,
              instagram: data.instagram || null,
              profile_image: data.profileImage || null,
              cover_image: data.coverImage || null,
            }
          ]);
        
        if (error) throw error;
        toast.success("Business card created successfully!");
      }
      
      navigate("/cards");
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} card:`, error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} business card`);
    }
  };
  
  const formValues = form.watch();
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? "Edit" : "Create"} Your Digital Business Card
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Card Details</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <TabsContent value="details" className="space-y-4">
                  <CardBasicInfoSection control={form.control} />
                  <CardSocialSection control={form.control} />
                </TabsContent>
                
                <TabsContent value="appearance" className="space-y-4">
                  <CardAppearanceSection control={form.control} />
                </TabsContent>
                
                <div className="flex justify-end">
                  <Button type="submit">
                    {isEditing ? "Update" : "Create"} Card
                  </Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </div>
        
        <CardPreview formValues={formValues} />
      </div>
    </div>
  );
};

export default CardForm;
