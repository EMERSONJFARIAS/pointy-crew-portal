
import { UseFormReturn } from "react-hook-form";
import { UserIcon, BriefcaseIcon } from "lucide-react";
import { IconInput } from "@/components/form/icon-input";
import { DateInput } from "@/components/form/date-input";
import { CPFInput } from "@/components/form/cpf-input";

interface PersonalInfoSectionProps {
  form: UseFormReturn<any>;
}

export function PersonalInfoSection({ form }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-5">
      <IconInput 
        form={form} 
        name="name" 
        label="Nome Completo" 
        placeholder="Digite seu nome completo"
        icon={<UserIcon className="h-4 w-4" />}
      />
      
      <CPFInput form={form} />
      
      <DateInput 
        form={form} 
        name="birthDate" 
        label="Data de Nascimento" 
      />
      
      <IconInput 
        form={form} 
        name="position" 
        label="Cargo" 
        placeholder="Digite seu cargo"
        icon={<BriefcaseIcon className="h-4 w-4" />}
      />
    </div>
  );
}
