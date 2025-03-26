
import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/register/register-form";

export default function Register() {
  return (
    <AuthLayout>
      <AuthCard
        title="Cadastro de Funcionário"
        description="Informe seus dados para criar uma conta"
      >
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
}
