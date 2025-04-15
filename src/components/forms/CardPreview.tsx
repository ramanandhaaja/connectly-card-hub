
import React from "react";
import BusinessCard, { BusinessCardProps } from "@/components/BusinessCard";

interface CardPreviewProps {
  formValues: Partial<BusinessCardProps>;
}

const CardPreview = ({ formValues }: CardPreviewProps) => {
  return (
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
        variant="extended"
      />
    </div>
  );
};

export default CardPreview;
