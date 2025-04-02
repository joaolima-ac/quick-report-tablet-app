
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleCreateIncident = () => {
    navigate('/create');
  };

  const handleGoToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Ocorrências</h1>
          <p className="text-gray-600 mb-6">Registre e gerencie ocorrências de forma simples e rápida</p>
        </div>
        
        <div className="space-y-4">
          <Button
            className="w-full h-14 text-lg flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleCreateIncident}
          >
            <PlusCircle className="h-6 w-6" />
            Criar Ocorrência
          </Button>
          
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleGoToSettings}
          >
            Configurações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
