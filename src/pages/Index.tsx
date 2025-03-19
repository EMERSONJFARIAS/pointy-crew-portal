
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BarChart3Icon, ClockIcon, UsersIcon } from "lucide-react";

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading for smooth animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 border-b bg-white/50 backdrop-blur-sm fixed top-0 z-10">
        <div className="container max-w-screen-xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-semibold text-xl tracking-tight text-primary transition-colors hover:text-primary/90">
            Point Maker
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" size="sm">Entrar</Button>
            </Link>
            <Link to="/cadastro">
              <Button size="sm">Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        <section className="py-20 px-6">
          <div className="container max-w-screen-xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <motion.span 
                    className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -10 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Sistema de Marcação de Ponto
                  </motion.span>
                  <motion.h1 
                    className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Gerencie o ponto dos seus colaboradores com precisão
                  </motion.h1>
                  <motion.p 
                    className="text-lg text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Uma solução moderna e simples para registro e controle de ponto, acessível de qualquer dispositivo.
                  </motion.p>
                </div>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Link to="/cadastro">
                    <Button size="lg" className="group">
                      Começar agora
                      <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg">
                      Fazer login
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                className="relative rounded-xl bg-gradient-to-tr from-primary/5 to-primary/10 p-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="relative z-10 rounded-lg bg-white p-6 shadow-xl overflow-hidden border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Registro de Ponto</h3>
                    <ClockIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Entrada</p>
                          <p className="text-lg font-semibold">08:03</p>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          Registrado
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Saída para almoço</p>
                          <p className="text-lg font-semibold">12:01</p>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          Registrado
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Retorno do almoço</p>
                          <p className="text-lg font-semibold">13:05</p>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          Registrado
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Saída</p>
                          <p className="text-lg font-semibold">--:--</p>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                          Pendente
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="w-full">Registrar ponto</Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-6 bg-gray-50">
          <div className="container max-w-screen-xl mx-auto">
            <motion.div 
              className="text-center max-w-3xl mx-auto space-y-4 mb-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span variants={item} className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Funcionalidades
              </motion.span>
              <motion.h2 variants={item} className="text-3xl font-bold leading-tight md:text-4xl">
                Uma plataforma completa para gestão de ponto
              </motion.h2>
              <motion.p variants={item} className="text-lg text-muted-foreground">
                Descubra como nossa solução pode facilitar o dia a dia da sua empresa
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={item} className="bg-white rounded-xl p-6 border card-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ClockIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Registro simplificado</h3>
                <p className="text-muted-foreground">Registre pontos com apenas um clique, de qualquer dispositivo, a qualquer momento.</p>
              </motion.div>
              
              <motion.div variants={item} className="bg-white rounded-xl p-6 border card-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UsersIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestão de equipe</h3>
                <p className="text-muted-foreground">Acompanhe a jornada de trabalho dos seus colaboradores com painéis intuitivos.</p>
              </motion.div>
              
              <motion.div variants={item} className="bg-white rounded-xl p-6 border card-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Relatórios detalhados</h3>
                <p className="text-muted-foreground">Gere relatórios personalizados de horas trabalhadas, atrasos e ausências.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 bg-gray-900 text-gray-300">
        <div className="container max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Point Maker</h3>
              <p className="text-gray-400">
                Sistema de marcação de ponto moderno e intuitivo para empresas de todos os tamanhos.
              </p>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Links rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/cadastro" className="text-gray-400 hover:text-white transition-colors">
                    Cadastro
                  </Link>
                </li>
                <li>
                  <Link to="/recuperar-senha" className="text-gray-400 hover:text-white transition-colors">
                    Recuperar senha
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Termos de uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Política de privacidade
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  contato@timepulse.com.br
                </li>
                <li className="text-gray-400">
                  (11) 99999-9999
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Point Maker. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
