
import React from "react";
import { Control } from "react-hook-form";
import { CardFormField, CardFormSection } from "./CardFormSection";

interface CardSocialSectionProps {
  control: Control<any>;
}

const CardSocialSection = ({ control }: CardSocialSectionProps) => {
  return (
    <CardFormSection title="Social Media">
      <CardFormField
        control={control}
        name="linkedin"
        label="LinkedIn"
        placeholder="https://linkedin.com/in/username"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardFormField
          control={control}
          name="twitter"
          label="Twitter"
          placeholder="https://twitter.com/username"
        />
        
        <CardFormField
          control={control}
          name="instagram"
          label="Instagram"
          placeholder="https://instagram.com/username"
        />
      </div>
    </CardFormSection>
  );
};

export default CardSocialSection;
