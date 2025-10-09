import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { X, CheckCircle, Users, ClipboardList, BarChart, Building2 } from 'lucide-react';

interface WelcomeGuideProps {
  onClose?: () => void;
}

export function WelcomeGuide({ onClose }: WelcomeGuideProps = {}) {
  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Bem-vindo ao Sistema de Avaliação Docente</CardTitle>
              <CardDescription>
                Guia rápido de primeiros passos
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              1. Criar Conta de Gestor
            </h3>
            <div className="pl-7 space-y-2">
              <p className="text-sm text-muted-foreground">
                Comece criando uma conta de Gestor Institucional para administrar a plataforma.
              </p>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <p className="text-sm">📧 gestor@uem.ac.mz</p>
                <p className="text-sm">🔑 manager123</p>
                <p className="text-xs text-muted-foreground mt-1">Tipo: Gestor Institucional</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              2. Criar Instituição
            </h3>
            <div className="pl-7 space-y-2">
              <p className="text-sm text-muted-foreground">
                Como gestor, crie sua instituição (ex: "Universidade Eduardo Mondlane", código "UEM").
                Adicione departamentos como Engenharia, Ciências, etc.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-green-500" />
              3. Criar Conta de Docente
            </h3>
            <div className="pl-7 space-y-2">
              <p className="text-sm text-muted-foreground">
                Saia da conta de gestor e crie uma conta de docente.
              </p>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-sm">📧 docente@uem.ac.mz</p>
                <p className="text-sm">🔑 teacher123</p>
                <p className="text-xs text-muted-foreground mt-1">Tipo: Docente</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-orange-500" />
              4. Criar Questionário
            </h3>
            <div className="pl-7 space-y-2">
              <p className="text-sm text-muted-foreground">
                Como docente, crie um questionário com perguntas de escala (1-5),
                múltipla escolha ou abertas.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              5. Criar Conta de Estudante
            </h3>
            <div className="pl-7 space-y-2">
              <p className="text-sm text-muted-foreground">
                Saia e crie uma conta de estudante para responder questionários.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm">📧 estudante@uem.ac.mz</p>
                <p className="text-sm">🔑 student123</p>
                <p className="text-xs text-muted-foreground mt-1">Tipo: Estudante</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <BarChart className="h-5 w-5 text-indigo-500" />
              6. Responder e Ver Resultados
            </h3>
            <div className="pl-7 space-y-2">
              <p className="text-sm text-muted-foreground">
                Como estudante, responda o questionário anonimamente.
                Depois volte à conta de docente para ver os resultados agregados.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">
                  <strong>Garantia de Anonimato:</strong> Todas as respostas são completamente
                  anônimas. Nenhuma informação pessoal é associada às avaliações.
                </p>
              </div>
            </div>
          </div>

          <Button onClick={handleClose} className="w-full">
            Começar a Usar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
