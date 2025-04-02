
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, X, Ambulance, Shield, Home, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const CreateIncident = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !incidentType) {
      toast.error("Título, descrição e tipo de ocorrência são obrigatórios.");
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
        incidentType,
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
      
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Erro ao enviar a ocorrência: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      setIsSubmitting(false);
    }
  };
  
  const getIncidentTypeIcon = (type: string) => {
    switch (type) {
      case 'medical':
        return <Ambulance className="h-5 w-5 text-red-500" />;
      case 'security':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'domestic':
        return <Home className="h-5 w-5 text-[#660033]" />;
      default:
        return <MoreHorizontal className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#181a24] p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto bg-white dark:bg-[#212633] rounded-xl shadow-xl p-8 transition-colors duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="p-3 dark:text-[#ccd6e0] dark:hover:bg-[#212633]/50"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-7 w-7" />
            </Button>
            <h1 className="text-3xl font-bold ml-3 text-gray-900 dark:text-[#ccd6e0]">Nova Ocorrência</h1>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Layout horizontal para aproveitar o espaço */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coluna da esquerda */}
            <div className="space-y-6">
              <div>
                <label className="block text-xl font-medium text-gray-700 dark:text-[#ccd6e0] mb-2">
                  Título <span className="text-red-500 dark:text-[#660033]">*</span>
                </label>
                <Input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Digite um título para a ocorrência"
                  required
                  className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20 text-lg h-14"
                />
              </div>
              
              {/* Tipo de Ocorrência */}
              <div>
                <label className="block text-xl font-medium text-gray-700 dark:text-[#ccd6e0] mb-3">
                  Tipo de Ocorrência <span className="text-red-500 dark:text-[#660033]">*</span>
                </label>
                <RadioGroup 
                  className="grid grid-cols-2 gap-4" 
                  onValueChange={setIncidentType}
                  value={incidentType}
                  required
                >
                  <div className="flex items-center space-x-3 border border-gray-200 dark:border-[#ccd6e0]/20 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-[#181a24]/70 transition-colors">
                    <RadioGroupItem value="medical" id="medical" className="h-5 w-5" />
                    <Label htmlFor="medical" className="flex items-center cursor-pointer">
                      <Ambulance className="h-7 w-7 mr-3 text-red-500" />
                      <span className="dark:text-[#ccd6e0] text-lg">Emergência Médica</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border border-gray-200 dark:border-[#ccd6e0]/20 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-[#181a24]/70 transition-colors">
                    <RadioGroupItem value="security" id="security" className="h-5 w-5" />
                    <Label htmlFor="security" className="flex items-center cursor-pointer">
                      <Shield className="h-7 w-7 mr-3 text-blue-500" />
                      <span className="dark:text-[#ccd6e0] text-lg">Emergência de Segurança</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border border-gray-200 dark:border-[#ccd6e0]/20 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-[#181a24]/70 transition-colors">
                    <RadioGroupItem value="domestic" id="domestic" className="h-5 w-5" />
                    <Label htmlFor="domestic" className="flex items-center cursor-pointer">
                      <Home className="h-7 w-7 mr-3 text-[#660033]" />
                      <span className="dark:text-[#ccd6e0] text-lg">Emergência de Violência Doméstica</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border border-gray-200 dark:border-[#ccd6e0]/20 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-[#181a24]/70 transition-colors">
                    <RadioGroupItem value="other" id="other" className="h-5 w-5" />
                    <Label htmlFor="other" className="flex items-center cursor-pointer">
                      <MoreHorizontal className="h-7 w-7 mr-3 text-gray-500 dark:text-[#ccd6e0]" />
                      <span className="dark:text-[#ccd6e0] text-lg">Outras Ocorrências</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <label className="block text-xl font-medium text-gray-700 dark:text-[#ccd6e0] mb-2">
                  Descrição <span className="text-red-500 dark:text-[#660033]">*</span>
                </label>
                <Textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva a ocorrência em detalhes"
                  rows={6}
                  required
                  className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20 text-lg"
                />
              </div>
            </div>
            
            {/* Coluna da direita - Informações de Contato */}
            <div className="border-t border-gray-200 dark:border-[#ccd6e0]/20 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <h2 className="text-2xl font-medium text-gray-800 dark:text-[#ccd6e0] mb-6">Informações de Contato (Opcional)</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xl font-medium text-gray-700 dark:text-[#ccd6e0] mb-2">
                    Nome
                  </label>
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20 text-lg h-14"
                  />
                </div>
                
                <div>
                  <label className="block text-xl font-medium text-gray-700 dark:text-[#ccd6e0] mb-2">
                    Telefone
                  </label>
                  <Input 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    type="tel"
                    className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20 text-lg h-14"
                  />
                </div>
                
                <div>
                  <label className="block text-xl font-medium text-gray-700 dark:text-[#ccd6e0] mb-2">
                    E-mail
                  </label>
                  <Input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    type="email"
                    className="dark:bg-[#181a24] dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20 text-lg h-14"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-6">
            <Button 
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="w-1/3 mr-3 text-lg h-14 dark:text-[#ccd6e0] dark:border-[#ccd6e0]/20 dark:hover:bg-[#212633]/50"
            >
              <X className="h-5 w-5 mr-2" /> Cancelar
            </Button>
            
            <Button 
              type="submit"
              className="w-2/3 ml-3 text-lg h-14 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
              disabled={isSubmitting}
            >
              <Send className="h-5 w-5 mr-2" /> {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIncident;
