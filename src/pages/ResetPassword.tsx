
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { KeyIcon, UserIcon } from "lucide-react";
import { ResetPasswordFormData, resetPasswordSchema } from "@/lib/validators";
import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputMask } from "@/components/ui-custom/input-mask";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function ResetPassword() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      cpf: "",
      username: "",
    },
  });
  
  const onSubmit = (data: ResetPasswordFormData) => {
    // This would normally connect to an authentication API
    console.log("Reset password request:", data);
    
    // Simulate authentication delay
    toast({
      title: "Processando solicitação...",
      description: "Por favor, aguarde enquanto verificamos seus dados.",
    });
    
    setTimeout(() => {
      // Success message
      toast({
        title: "Solicitação enviada com sucesso",
        description: "Verifique seu e-mail para instruções de redefinição de senha.",
      });
      
      // Redirect to login
      navigate("/login");
    }, 1500);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Recuperação de Senha"
        description="Informe seus dados para recuperar sua senha"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de Usuário</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Seu nome de usuário" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Enviando..." : "Recuperar Senha"}
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Lembrou sua senha? </span>
              <Link to="/login" className="font-medium text-primary hover:text-primary/90">
                Voltar para o login
              </Link>
            </div>
          </form>
        </Form>
      </AuthCard>
    </AuthLayout>
  );
}
