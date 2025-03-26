
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { RegisterFormData, registerSchema } from "@/lib/validators";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PersonalInfoSection } from "@/components/register/personal-info-section";
import { AccountInfoSection } from "@/components/register/account-info-section";
import { useToast } from "@/hooks/use-toast";

export function RegisterForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      cpf: "",
      position: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const onSubmit = (data: RegisterFormData) => {
    // This would normally connect to an authentication API
    console.log("Registration data:", data);
    
    // Simulate registration delay
    toast({
      title: "Processando cadastro...",
      description: "Por favor, aguarde enquanto criamos sua conta.",
    });
    
    setTimeout(() => {
      // Success message
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Sua conta foi criada. Você já pode fazer login.",
      });
      
      // Redirect to login
      navigate("/login");
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <PersonalInfoSection form={form} />
        <AccountInfoSection form={form} />
        
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </Button>
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Já possui uma conta? </span>
          <Link to="/login" className="font-medium text-primary hover:text-primary/90">
            Faça login
          </Link>
        </div>
      </form>
    </Form>
  );
}
