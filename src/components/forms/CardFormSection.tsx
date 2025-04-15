
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface CardFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

export const CardFormField = ({ control, name, label, placeholder, required = false }: CardFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}{required && '*'}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface CardFormSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const CardFormSection = ({ title, children, className = "" }: CardFormSectionProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h3 className="font-medium">{title}</h3>}
      {children}
    </div>
  );
};
