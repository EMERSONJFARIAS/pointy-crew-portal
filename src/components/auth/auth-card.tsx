
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}

export function AuthCard({ children, className, title, description, footer }: AuthCardProps) {
  return (
    <Card className={cn("w-full max-w-md mx-auto card-shadow animate-fadeIn", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-center">{title}</CardTitle>
        {description && <CardDescription className="text-center">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
