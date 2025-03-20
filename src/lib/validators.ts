
import { z } from "zod";

export const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

function isValidCPF(cpf: string): boolean {
  // Remove non-digits
  const cleanCPF = cpf.replace(/[^\d]/g, '');
  
  // Check if length is 11
  if (cleanCPF.length !== 11) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cleanCPF)) return false;
  
  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;
  if (firstDigit !== parseInt(cleanCPF.charAt(9))) return false;
  
  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;
  if (secondDigit !== parseInt(cleanCPF.charAt(10))) return false;
  
  return true;
}

export const loginSchema = z.object({
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});

export const resetPasswordSchema = z.object({
  cpf: z.string()
    .regex(cpfRegex, "CPF inválido. Formato esperado: 000.000.000-00")
    .refine(isValidCPF, "CPF inválido. Verifique os dígitos."),
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres")
});

export const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string()
    .regex(cpfRegex, "CPF inválido. Formato esperado: 000.000.000-00")
    .refine(isValidCPF, "CPF inválido. Verifique os dígitos."),
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
