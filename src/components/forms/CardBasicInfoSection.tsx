
import React from "react";
import { Control } from "react-hook-form";
import { CardFormField, CardFormSection } from "./CardFormSection";

interface CardBasicInfoSectionProps {
  control: Control<any>;
}

const CardBasicInfoSection = ({ control }: CardBasicInfoSectionProps) => {
  return (
    <CardFormSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardFormField
          control={control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          required
        />
        
        <CardFormField
          control={control}
          name="title"
          label="Job Title"
          placeholder="Product Manager"
          required
        />
      </div>
      
      <CardFormField
        control={control}
        name="company"
        label="Company"
        placeholder="Company Name"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardFormField
          control={control}
          name="email"
          label="Email"
          placeholder="john@example.com"
          required
        />
        
        <CardFormField
          control={control}
          name="phone"
          label="Phone"
          placeholder="+1 (555) 123-4567"
          required
        />
      </div>
      
      <CardFormField
        control={control}
        name="website"
        label="Website"
        placeholder="https://example.com"
      />
      
      <CardFormField
        control={control}
        name="location"
        label="Location"
        placeholder="San Francisco, CA"
      />
    </CardFormSection>
  );
};

export default CardBasicInfoSection;
