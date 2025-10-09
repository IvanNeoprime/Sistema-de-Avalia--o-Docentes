import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { getCurrentSession } from '../../utils/auth';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ClipboardList, CheckCircle2, Clock, Shield, HelpCircle } from 'lucide-react';
import { QuestionnaireResponse } from '../questionnaire/QuestionnaireResponse';
import { QuickStartGuide } from '../demo/QuickStartGuide';

interface Questionnaire {
  id: string;
  title: string;
  description: string;
  deadline: string;
  completed?: boolean;
  questions: any[];
}

interface StudentDashboardProps {
  user: any;
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  const loadQuestionnaires = async () => {
    try {
      const session = await getCurrentSession();
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9e435140/questionnaires`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) {
        console.error('Failed to load questionnaires');
        return;
      }

      const data = await response.json();
      setQuestionnaires(data.questionnaires || []);
    } catch (error) {
      console.error('Error loading questionnaires:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponseComplete = () => {
    setSelectedQuestionnaire(null);
    loadQuestionnaires();
  };

  if (selectedQuestionnaire) {
    return (
      <QuestionnaireResponse
        questionnaire={selectedQuestionnaire}
        onComplete={handleResponseComplete}
        onCancel={() => setSelectedQuestionnaire(null)}
      />
    );
  }

  const pendingQuestionnaires = questionnaires.filter(q => !q.completed);
  const completedQuestionnaires = questionnaires.filter(q => q.completed);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Bem-vindo, {user.name}</h1>
              <p className="text-muted-foreground">Dashboard do Estudante</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowGuide(true)}>
              <HelpCircle className="h-4 w-4 mr-2" />
              Guia Rápido
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Privacy Notice */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <CardTitle className="text-green-900">Garantia de Anonimato Total</CardTitle>
                <CardDescription className="text-green-700">
                  Suas respostas são completamente anônimas. Nenhuma informação pessoal é
                  associada às suas avaliações. Os docentes recebem apenas dados agregados.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Total</CardTitle>
                <ClipboardList className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{questionnaires.length}</div>
              <p className="text-muted-foreground mt-1">Questionários disponíveis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Pendentes</CardTitle>
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{pendingQuestionnaires.length}</div>
              <p className="text-muted-foreground mt-1">Aguardando resposta</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Concluídos</CardTitle>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{completedQuestionnaires.length}</div>
              <p className="text-muted-foreground mt-1">Já respondidos</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Questionnaires */}
        {pendingQuestionnaires.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4">Avaliações Pendentes</h3>
            <div className="space-y-4">
              {pendingQuestionnaires.map((q) => (
                <Card key={q.id} className="hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle>{q.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {q.description}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="secondary">
                            {q.questions?.length || 0} perguntas
                          </Badge>
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            Prazo: {new Date(q.deadline).toLocaleDateString('pt-PT')}
                          </Badge>
                        </div>
                      </div>
                      <Button onClick={() => setSelectedQuestionnaire(q)}>
                        Responder
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Questionnaires */}
        {completedQuestionnaires.length > 0 && (
          <div>
            <h3 className="mb-4">Avaliações Concluídas</h3>
            <div className="space-y-4">
              {completedQuestionnaires.map((q) => (
                <Card key={q.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle>{q.title}</CardTitle>
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <CardDescription className="mt-1">
                          {q.description}
                        </CardDescription>
                        <Badge variant="secondary" className="mt-3 bg-green-100 text-green-700">
                          Avaliação enviada com sucesso
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loading && questionnaires.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Nenhuma avaliação disponível</CardTitle>
              <CardDescription>
                Não há questionários disponíveis no momento. Volte mais tarde.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {showGuide && (
          <QuickStartGuide userRole="student" onClose={() => setShowGuide(false)} />
        )}
      </div>
    </div>
  );
}
