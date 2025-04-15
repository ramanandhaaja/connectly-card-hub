
import React from "react";
import { Control } from "react-hook-form";
import { CardFormField, CardFormSection } from "./CardFormSection";

interface CardAppearanceSectionProps {
  control: Control<any>;
}

const CardAppearanceSection = ({ control }: CardAppearanceSectionProps) => {
  return (
    <CardFormSection>
      <CardFormField
        control={control}
        name="profileImage"
        label="Profile Image URL"
        placeholder="https://example.com/profile.jpg"
      />
      
      <CardFormField
        control={control}
        name="coverImage"
        label="Cover Image URL"
        placeholder="https://example.com/cover.jpg"
      />
    </CardFormSection>
  );
};

export default CardAppearanceSection;
