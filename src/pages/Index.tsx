
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Settings, Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";

const Index = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference on initial load
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleCreateIncident = () => {
    navigate('/create');
  };

  const handleGoToSettings = () => {
    setShowPasswordDialog(true);
  };

  const handlePasswordSubmit = () => {
    const correctPassword = 'Spectr@2025!';
    
    if (password === correctPassword) {
      setShowPasswordDialog(false);
      setPassword('');
      navigate('/settings');
    } else {
      toast.error('Senha incorreta!');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#181a24] p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-[#212633] rounded-lg shadow-lg p-6 space-y-8 transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-[#ccd6e0] mb-2">Sistema de Ocorrências</h1>
          <p className="text-gray-600 dark:text-[#ccd6e0]/80 mb-6">Registre e gerencie ocorrências de forma simples e rápida</p>
        </div>
        
        <div className="space-y-4">
          <Button
            className="w-full h-14 text-lg flex items-center justify-center gap-2 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 dark:bg-[#0EA5E9] dark:hover:bg-[#0EA5E9]/80"
            onClick={handleCreateIncident}
          >
            <PlusCircle className="h-6 w-6" />
            Criar Ocorrência
          </Button>
          
          <Button
            variant="outline"
            className="w-full mt-4 border-gray-300 dark:border-[#ccd6e0]/20 dark:text-[#ccd6e0] dark:hover:bg-[#212633]/50"
            onClick={handleGoToSettings}
          >
            <Settings className="h-5 w-5 mr-2" />
            Configurações
          </Button>
          
          {/* Dark Mode Toggle moved below settings button */}
          <div className="flex items-center justify-center space-x-2 py-2 mt-4 border border-gray-200 dark:border-[#ccd6e0]/20 rounded-md p-3">
            <Sun className="h-5 w-5 text-gray-500 dark:text-[#ccd6e0]" />
            <Switch 
              checked={darkMode} 
              onCheckedChange={toggleDarkMode}
              className={darkMode ? "bg-[#0EA5E9]" : ""}
            />
            <Moon className="h-5 w-5 text-gray-500 dark:text-[#ccd6e0]" />
            <span className="text-sm text-gray-500 dark:text-[#ccd6e0]/80 ml-2">
              {darkMode ? "Modo Noturno" : "Modo Dia"}
            </span>
          </div>
        </div>
      </div>

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md dark:bg-[#212633] dark:text-[#ccd6e0]">
          <DialogHeader>
            <DialogTitle>Acesso às Configurações</DialogTitle>
            <DialogDescription className="dark:text-[#ccd6e0]/70">
              Digite a senha para acessar as configurações do sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePasswordSubmit();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowPasswordDialog(false)}
              className="dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handlePasswordSubmit}
              className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
