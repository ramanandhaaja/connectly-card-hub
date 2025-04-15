
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
        description="Add a URL to your profile picture (recommended size: 200x200 pixels)"
      />
      
      <CardFormField
        control={control}
        name="coverImage"
        label="Cover Image URL"
        placeholder="https://example.com/cover.jpg"
        description="Add a URL to your cover image (recommended size: 800x200 pixels)"
      />
    </CardFormSection>
  );
};

export default CardAppearanceSection;
