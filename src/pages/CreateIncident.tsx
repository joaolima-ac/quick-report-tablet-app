
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, X } from "lucide-react";
import { toast } from "sonner";

const CreateIncident = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast.error("Título e descrição são obrigatórios.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get API config from localStorage
      const apiConfig = localStorage.getItem('apiConfig');
      if (!apiConfig) {
        toast.error("Configuração da API não encontrada. Configure primeiro nas Configurações.");
        setIsSubmitting(false);
        return;
      }
      
      const { apiUrl, apiToken } = JSON.parse(apiConfig);
      
      if (!apiUrl) {
        toast.error("URL da API não configurada. Configure primeiro nas Configurações.");
        setIsSubmitting(false);
        return;
      }
      
      // Prepare data
      const incidentData = {
        title,
        description,
        contact: {
          name: name || "Anônimo",
          phone: phone || null,
          email: email || null
        },
        createdAt: new Date().toISOString()
      };
      
      // We'll simulate the API call for now
      console.log('Sending to API:', apiUrl);
      console.log('With token:', apiToken);
      console.log('Data:', incidentData);
      
      // Simulate API success
      setTimeout(() => {
        toast.success("Ocorrência enviada com sucesso!");
        setIsSubmitting(false);
        navigate('/');
      }, 1500);
      
      // Real API implementation would be:
      /*
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiToken ? `Bearer ${apiToken}` : ''
        },
        body: JSON.stringify(incidentData)
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao enviar: ${response.status}`);
      }
      
      toast.success("Ocorrência enviada com sucesso!");
      setIsSubmitting(false);
      navigate('/');
      */
      
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Erro ao enviar a ocorrência: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#181a24] p-4 transition-colors duration-300">
      <div className="max-w-md mx-auto bg-white dark:bg-[#212633] rounded-lg shadow-lg p-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="p-2 dark:text-[#ccd6e0] dark:hover:bg-[#212633]/50"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold ml-2 text-gray-900 dark:text-[#ccd6e0]">Nova Ocorrência</h1>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#ccd6e0] mb-1">
              Título <span className="text-red-500 dark:text-[#660033]">*</span>
            </label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite um título para a ocorrência"
              required
              className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#ccd6e0] mb-1">
              Descrição <span className="text-red-500 dark:text-[#660033]">*</span>
            </label>
            <Textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a ocorrência em detalhes"
              rows={5}
              required
              className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20"
            />
          </div>
          
          <div className="border-t border-gray-200 dark:border-[#ccd6e0]/20 pt-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-[#ccd6e0] mb-3">Informações de Contato (Opcional)</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#ccd6e0] mb-1">
                  Nome
                </label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#ccd6e0] mb-1">
                  Telefone
                </label>
                <Input 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  type="tel"
                  className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#ccd6e0] mb-1">
                  E-mail
                </label>
                <Input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  type="email"
                  className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="w-1/2 mr-2 dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20 dark:hover:bg-[#212633]/50"
            >
              <X className="h-4 w-4 mr-2" /> Cancelar
            </Button>
            
            <Button 
              type="submit"
              className="w-1/2 ml-2 bg-[#00674F] hover:bg-[#00674F]/90"
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4 mr-2" /> {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIncident;
