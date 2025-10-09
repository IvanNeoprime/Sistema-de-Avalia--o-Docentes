import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle2, Database, Building2 } from 'lucide-react';
import { initializeInstitutions } from '../../utils/initInstitutions';

interface InitialSetupProps {
  user: any;
  onComplete: () => void;
}

export function InitialSetup({ user, onComplete }: InitialSetupProps) {
  const [initializing, setInitializing] = useState(false);
  const [step, setStep] = useState<'welcome' | 'initializing' | 'complete'>('welcome');

  const handleInitialize = async () => {
    setStep('initializing');
    setInitializing(true);

    try {
      // Initialize institutions if user is manager
      if (user.role === 'manager') {
        await initializeInstitutions();
      }

      // Wait a bit for dramatic effect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStep('complete');
    } catch (error) {
      console.error('Error during initialization:', error);
    } finally {
      setInitializing(false);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  if (step === 'complete') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Sistema Pronto!</CardTitle>
            <CardDescription>
              Tudo está configurado e pronto para uso.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleContinue} className="w-full">
              Começar a usar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'initializing') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Database className="h-6 w-6 text-blue-600 animate-pulse" />
            </div>
            <CardTitle>Inicializando Sistema...</CardTitle>
            <CardDescription>
              Preparando a base de dados com informações das instituições de Moçambique.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <CardTitle>Bem-vindo ao Sistema de Avaliação Docente</CardTitle>
          <CardDescription>
            Sistema completo para avaliação anônima de docentes em instituições de ensino superior moçambicanas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Anonimato Total Garantido</p>
                <p className="text-sm text-muted-foreground">
                  Separação completa entre identidade e respostas na base de dados
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Base de Dados Completa</p>
                <p className="text-sm text-muted-foreground">
                  Todas as instituições de ensino superior de Moçambique pré-cadastradas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Questionários Personalizados</p>
                <p className="text-sm text-muted-foreground">
                  Docentes podem criar avaliações com perguntas abertas, escalas e múltipla escolha
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Análises em Tempo Real</p>
                <p className="text-sm text-muted-foreground">
                  Estatísticas agregadas e insights para melhoria contínua
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              {user.role === 'student' && 'Como estudante, você pode avaliar seus docentes de forma anônima.'}
              {user.role === 'teacher' && 'Como docente, você pode criar questionários e ver feedback agregado.'}
              {user.role === 'manager' && 'Como gestor, você tem acesso a analytics institucionais e pode gerenciar instituições.'}
            </p>
            <Button onClick={handleInitialize} className="w-full" disabled={initializing}>
              {initializing ? 'Inicializando...' : 'Inicializar Sistema'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
