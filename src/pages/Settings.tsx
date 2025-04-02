
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const [apiUrl, setApiUrl] = useState('');
  const [apiToken, setApiToken] = useState('');
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiUrl) {
      toast.error("Por favor, informe a URL da API.");
      return;
    }
    
    // Here you would typically save the settings to local storage or similar
    localStorage.setItem('apiConfig', JSON.stringify({ apiUrl, apiToken }));
    toast.success("Configurações salvas com sucesso!");
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="p-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold ml-2">Configurações</h1>
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL da API <span className="text-red-500">*</span>
            </label>
            <Input 
              value={apiUrl} 
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://api.exemplo.com" 
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Informe a URL completa da API para envio das ocorrências
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token de Autenticação
            </label>
            <Input 
              value={apiToken} 
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="Token de acesso à API" 
              type="password"
            />
            <p className="mt-1 text-sm text-gray-500">
              Informe o token de autenticação se a API exigir
            </p>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
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
