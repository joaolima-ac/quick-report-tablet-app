
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference on initial load
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

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
    // Prompt for password
    const password = prompt('Por favor, digite a senha para acessar as configurações:');
    const correctPassword = 'Spectr@2025!';
    
    if (password === correctPassword) {
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
        
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-center space-x-2 py-2">
          <Sun className="h-5 w-5 text-gray-500 dark:text-[#ccd6e0]" />
          <Switch 
            checked={darkMode} 
            onCheckedChange={toggleDarkMode}
            className={darkMode ? "bg-[#00674F]" : ""}
          />
          <Moon className="h-5 w-5 text-gray-500 dark:text-[#ccd6e0]" />
          <span className="text-sm text-gray-500 dark:text-[#ccd6e0]/80 ml-2">
            {darkMode ? "Modo Noturno" : "Modo Dia"}
          </span>
        </div>
        
        <div className="space-y-4">
          <Button
            className="w-full h-14 text-lg flex items-center justify-center gap-2 bg-[#00674F] hover:bg-[#00674F]/90 dark:bg-[#00674F] dark:hover:bg-[#00674F]/80"
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
        </div>
      </div>
    </div>
  );
};

export default Index;
