
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BusinessCard from "./BusinessCard";
import { BusinessCardProps } from "./BusinessCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
        // Create new card
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title*</FormLabel>
                          <FormControl>
                            <Input placeholder="Product Manager" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone*</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Social Media</h3>
                    
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                              <Input placeholder="https://twitter.com/username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram</FormLabel>
                            <FormControl>
                              <Input placeholder="https://instagram.com/username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="appearance" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="profileImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/profile.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/cover.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
        
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-medium mb-6">Preview</h2>
          <BusinessCard 
            id="preview"
            name={formValues.name || "Your Name"}
            title={formValues.title || "Your Title"}
            company={formValues.company || ""}
            email={formValues.email || "email@example.com"}
            phone={formValues.phone || "123-456-7890"}
            website={formValues.website}
            location={formValues.location}
            linkedin={formValues.linkedin}
            twitter={formValues.twitter}
            instagram={formValues.instagram}
            profileImage={formValues.profileImage}
            coverImage={formValues.coverImage}
          />
        </div>
      </div>
    </div>
  );
};

export default CardForm;
