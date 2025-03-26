
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "@/components/form/password-input";
import { UseFormReturn } from "react-hook-form";

interface AccountInfoSectionProps {
  form: UseFormReturn<any>;
}

export function AccountInfoSection({ form }: AccountInfoSectionProps) {
  return (
    <div className="space-y-5">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome de Usuário</FormLabel>
            <FormControl>
              <Input placeholder="Digite um nome de usuário" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <PasswordInput 
        form={form} 
        name="password" 
        label="Senha" 
        placeholder="Digite uma senha" 
      />
      
      <PasswordInput 
        form={form} 
        name="confirmPassword" 
        label="Confirmar Senha" 
        placeholder="Confirme sua senha" 
      />
    </div>
  );
}
