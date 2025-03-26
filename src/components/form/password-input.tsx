
import { useState } from "react";
import { EyeIcon, EyeOffIcon, KeyIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface PasswordInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
}

export function PasswordInput({ form, name, label, placeholder }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10 pr-10" 
                type={showPassword ? "text" : "password"} 
                placeholder={placeholder} 
                {...field} 
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Esconder senha" : "Mostrar senha"}
                </span>
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
