
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 border-b bg-white/50 backdrop-blur-sm fixed top-0 z-10">
        <div className="container max-w-screen-xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-semibold text-xl tracking-tight text-primary transition-colors hover:text-primary/90">
            Point Maker
          </Link>
        </div>
      </header>
      <main className={cn(
        "flex-1 flex items-center justify-center p-6 pt-20", 
        className
      )}>
        <div className="w-full max-w-md animate-slideUp" style={{ animationDelay: "0.1s" }}>
          {children}
        </div>
      </main>
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Point Maker. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
