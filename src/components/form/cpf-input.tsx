
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputMask } from "@/components/ui-custom/input-mask";
import { UseFormReturn } from "react-hook-form";

interface CPFInputProps {
  form: UseFormReturn<any>;
}

export function CPFInput({ form }: CPFInputProps) {
  return (
    <FormField
      control={form.control}
      name="cpf"
      render={({ field }) => (
        <FormItem>
          <FormLabel>CPF</FormLabel>
          <FormControl>
            <InputMask
              mask="999.999.999-99"
              placeholder="000.000.000-00"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
