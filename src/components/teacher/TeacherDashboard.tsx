import { useState, useEffect } from 'react';
import { projectId } from '../../utils/supabase/info';
import { getCurrentSession } from '../../utils/auth';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Plus, ClipboardList, Eye, Calendar } from 'lucide-react';
import { QuestionnaireBuilder } from '../questionnaire/QuestionnaireBuilder';
import { QuestionnaireResults } from '../questionnaire/QuestionnaireResults';

interface Questionnaire {
  id: string;
  title: string;
  description: string;
  deadline: string;
  questions: any[];
  status: string;
  createdAt: string;
}

interface TeacherDashboardProps {
  user: any;
}

export function TeacherDashboard({ user }: TeacherDashboardProps) {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState<string | null>(null);

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

  const handleQuestionnaireCreated = () => {
    setShowBuilder(false);
    loadQuestionnaires();
  };

  if (showBuilder) {
    return (
      <QuestionnaireBuilder
        user={user}
        onComplete={handleQuestionnaireCreated}
        onCancel={() => setShowBuilder(false)}
      />
    );
  }

  if (selectedQuestionnaireId) {
    return (
      <QuestionnaireResults
        questionnaireId={selectedQuestionnaireId}
        onBack={() => setSelectedQuestionnaireId(null)}
      />
    );
  }

  const activeQuestionnaires = questionnaires.filter(q => q.status === 'active');
  const closedQuestionnaires = questionnaires.filter(q => q.status !== 'active');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Bem-vindo, Prof. {user.name}</h1>
              <p className="text-muted-foreground">Dashboard do Docente</p>
            </div>
            <Button onClick={() => setShowBuilder(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Questionário
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
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
              <p className="text-muted-foreground mt-1">Questionários criados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Ativos</CardTitle>
                <Calendar className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{activeQuestionnaires.length}</div>
              <p className="text-muted-foreground mt-1">Em andamento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Encerrados</CardTitle>
                <ClipboardList className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{closedQuestionnaires.length}</div>
              <p className="text-muted-foreground mt-1">Finalizados</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Questionnaires */}
        {activeQuestionnaires.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4">Questionários Ativos</h3>
            <div className="space-y-4">
              {activeQuestionnaires.map((q) => (
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
                          <Badge variant="outline" className="text-green-600 border-green-300">
                            Prazo: {new Date(q.deadline).toLocaleDateString('pt-PT')}
                          </Badge>
                          <Badge className="bg-green-100 text-green-700">
                            Ativo
                          </Badge>
                        </div>
                      </div>
                      <Button onClick={() => setSelectedQuestionnaireId(q.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Resultados
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Closed Questionnaires */}
        {closedQuestionnaires.length > 0 && (
          <div>
            <h3 className="mb-4">Questionários Encerrados</h3>
            <div className="space-y-4">
              {closedQuestionnaires.map((q) => (
                <Card key={q.id} className="opacity-75">
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
                          <Badge variant="outline">
                            Encerrado
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => setSelectedQuestionnaireId(q.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Resultados
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loading && questionnaires.length === 0 && (
          <Card>
            <CardHeader className="text-center py-12">
              <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle>Nenhum questionário criado</CardTitle>
              <CardDescription>
                Crie seu primeiro questionário para começar a receber feedback dos estudantes.
              </CardDescription>
              <Button onClick={() => setShowBuilder(true)} className="mt-4 mx-auto">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Questionário
              </Button>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
