
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
    <div className="min-h-screen bg-gray-100 dark:bg-[#181a24] p-8 transition-colors duration-300">
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#212633] rounded-xl shadow-xl p-8 transition-colors duration-300">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            className="p-3 dark:text-[#ccd6e0] dark:hover:bg-[#212633]/50"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-7 w-7" />
          </Button>
          <h1 className="text-3xl font-bold ml-3 text-gray-900 dark:text-[#ccd6e0]">Configurações</h1>
        </div>
        
        <form onSubmit={handleSave} className="space-y-8">
          <div>
            <label className="block text-xl font-medium text-gray-700 dark:text-[#ccd6e0] mb-2">
              URL da API <span className="text-red-500 dark:text-[#660033]">*</span>
            </label>
            <Input 
              value={apiUrl} 
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://api.exemplo.com" 
              required
              className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20 text-lg h-14"
            />
            <p className="mt-2 text-lg text-gray-500 dark:text-[#ccd6e0]/70">
              Informe a URL completa da API para envio das ocorrências
            </p>
          </div>
          
          <div>
            <label className="block text-xl font-medium text-gray-700 dark:text-[#ccd6e0] mb-2">
              Token de Autenticação
            </label>
            <Input 
              value={apiToken} 
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="Token de acesso à API" 
              type="password"
              className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20 text-lg h-14"
            />
            <p className="mt-2 text-lg text-gray-500 dark:text-[#ccd6e0]/70">
              Informe o token de autenticação se a API exigir
            </p>
          </div>
          
          <div className="pt-6">
            <Button 
              type="submit"
              className="w-full h-16 text-xl bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
            >
              <Save className="h-6 w-6 mr-3" /> Salvar Configurações
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
