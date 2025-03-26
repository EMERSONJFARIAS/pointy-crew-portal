
import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface IconInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  icon: ReactNode;
}

export function IconInput({ form, name, label, placeholder, icon }: IconInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
                {icon}
              </div>
              <Input className="pl-10" placeholder={placeholder} {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
