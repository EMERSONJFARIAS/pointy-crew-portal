
import { z } from "zod";

export const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

function isValidCPF(cpf: string): boolean {
  // Remove non-digits
  cpf = cpf.replace(/[^\d]/g, '');
  
  // Check if length is 11
  if (cpf.length !== 11) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;
  
  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;
  
  return true;
}

export const loginSchema = z.object({
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});

export const resetPasswordSchema = z.object({
  cpf: z.string()
    .regex(cpfRegex, "CPF inválido")
    .refine(isValidCPF, "CPF inválido"),
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres")
});

export const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string()
    .regex(cpfRegex, "CPF inválido")
    .refine(isValidCPF, "CPF inválido"),
  birthDate: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  position: z.string().min(1, "Cargo é obrigatório"),
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  password: z.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"),
  confirmPassword: z.string().min(6, "Confirme sua senha")
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
