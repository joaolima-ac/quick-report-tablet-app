
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const [apiUrl, setApiUrl] = useState(() => {
    const savedConfig = localStorage.getItem('apiConfig');
    return savedConfig ? JSON.parse(savedConfig).apiUrl : '';
  });
  
  const [apiToken, setApiToken] = useState(() => {
    const savedConfig = localStorage.getItem('apiConfig');
    return savedConfig ? JSON.parse(savedConfig).apiToken : '';
  });
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiUrl) {
      toast.error("Por favor, informe a URL da API.");
      return;
    }
    
    localStorage.setItem('apiConfig', JSON.stringify({ apiUrl, apiToken }));
    toast.success("Configurações salvas com sucesso!");
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#181a24] p-4 transition-colors duration-300">
      <div className="max-w-md mx-auto bg-white dark:bg-[#212633] rounded-lg shadow-lg p-6 transition-colors duration-300">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="p-2 dark:text-[#ccd6e0] dark:hover:bg-[#212633]/50"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold ml-2 text-gray-900 dark:text-[#ccd6e0]">Configurações</h1>
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#ccd6e0] mb-1">
              URL da API <span className="text-red-500 dark:text-[#660033]">*</span>
            </label>
            <Input 
              value={apiUrl} 
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://api.exemplo.com" 
              required
              className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-[#ccd6e0]/70">
              Informe a URL completa da API para envio das ocorrências
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#ccd6e0] mb-1">
              Token de Autenticação
            </label>
            <Input 
              value={apiToken} 
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="Token de acesso à API" 
              type="password"
              className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-[#ccd6e0]/70">
              Informe o token de autenticação se a API exigir
            </p>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit"
              className="w-full bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
            >
              <Save className="h-4 w-4 mr-2" /> Salvar Configurações
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
