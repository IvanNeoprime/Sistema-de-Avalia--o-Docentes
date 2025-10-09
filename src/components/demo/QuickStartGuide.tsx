import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { X, Info, UserCircle, GraduationCap, Building } from 'lucide-react';

interface QuickStartGuideProps {
  userRole: 'student' | 'teacher' | 'manager';
  onClose: () => void;
}

export function QuickStartGuide({ userRole, onClose }: QuickStartGuideProps) {
  const guides = {
    student: {
      icon: GraduationCap,
      title: 'Guia Rápido - Estudante',
      steps: [
        {
          title: 'Visualize questionários disponíveis',
          description: 'Na página inicial, você verá todos os questionários ativos da sua instituição.'
        },
        {
          title: 'Responda anonimamente',
          description: 'Clique em "Responder" e complete todas as perguntas. Suas respostas são 100% anônimas.'
        },
        {
          title: 'Envie sua avaliação',
          description: 'Após completar, clique em "Enviar Avaliação Anônima". Você não poderá responder novamente.'
        }
      ]
    },
    teacher: {
      icon: UserCircle,
      title: 'Guia Rápido - Docente',
      steps: [
        {
          title: 'Crie um questionário',
          description: 'Clique em "Criar Questionário" e defina título, descrição e prazo.'
        },
        {
          title: 'Adicione perguntas',
          description: 'Escolha entre perguntas abertas, escalas (1-5) ou múltipla escolha.'
        },
        {
          title: 'Visualize resultados',
          description: 'Após receber respostas, veja estatísticas agregadas clicando em "Ver Resultados".'
        }
      ]
    },
    manager: {
      icon: Building,
      title: 'Guia Rápido - Gestor',
      steps: [
        {
          title: 'Veja estatísticas institucionais',
          description: 'No dashboard, acompanhe métricas de questionários, respostas e participação.'
        },
        {
          title: 'Gerencie instituições',
          description: 'Clique em "Gerir Instituições" para visualizar todas as instituições cadastradas.'
        },
        {
          title: 'Analise resultados globais',
          description: 'Acesse resultados de todos os questionários da instituição para insights macro.'
        }
      ]
    }
  };

  const guide = guides[userRole];
  const Icon = guide.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>{guide.title}</CardTitle>
                <CardDescription>Aprenda a usar o sistema em 3 passos simples</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {guide.steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Dica importante:</p>
                <p>
                  Este sistema garante anonimato total. Para estudantes, suas respostas nunca são
                  associadas à sua identidade. Para docentes e gestores, apenas dados agregados são
                  mostrados.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>Entendido, começar!</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
