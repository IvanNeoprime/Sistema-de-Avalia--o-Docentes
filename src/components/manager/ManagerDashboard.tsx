import { useState, useEffect } from 'react';
import { projectId } from '../../utils/supabase/info';
import { getCurrentSession } from '../../utils/auth';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Building2, Users, ClipboardList, TrendingUp, Plus, Eye, Database } from 'lucide-react';
import { QuestionnaireResults } from '../questionnaire/QuestionnaireResults';
import { InstitutionManager } from './InstitutionManager';
import { DatabaseReset } from '../common/DatabaseReset';

interface ManagerDashboardProps {
  user: any;
}

export function ManagerDashboard({ user }: ManagerDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [questionnaires, setQuestionnaires] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<'dashboard' | 'institutions' | 'questionnaire' | 'database-reset'>(
    'dashboard'
  );
  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const session = await getCurrentSession();

      // Load analytics
      const analyticsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9e435140/analytics`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setStats(analyticsData.stats);
      }

      // Load questionnaires
      const questionnairesResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9e435140/questionnaires`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (questionnairesResponse.ok) {
        const questionnairesData = await questionnairesResponse.json();
        setQuestionnaires(questionnairesData.questionnaires || []);
      }
    } catch (error) {
      console.error('Error loading manager data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (selectedView === 'institutions') {
    return (
      <InstitutionManager
        user={user}
        onBack={() => setSelectedView('dashboard')}
      />
    );
  }

  if (selectedView === 'database-reset') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <Button variant="outline" onClick={() => setSelectedView('dashboard')}>
              ← Voltar ao Dashboard
            </Button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <DatabaseReset />
        </div>
      </div>
    );
  }

  if (selectedView === 'questionnaire' && selectedQuestionnaireId) {
    return (
      <QuestionnaireResults
        questionnaireId={selectedQuestionnaireId}
        onBack={() => {
          setSelectedView('dashboard');
          setSelectedQuestionnaireId(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Painel de Gestão Institucional</h1>
              <p className="text-muted-foreground">Bem-vindo, {user.name}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedView('database-reset')}>
                <Database className="h-4 w-4 mr-2" />
                Reset Base de Dados
              </Button>
              <Button onClick={() => setSelectedView('institutions')}>
                <Building2 className="h-4 w-4 mr-2" />
                Gerir Instituições
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Questionários</CardTitle>
                <ClipboardList className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{stats?.totalQuestionnaires || 0}</div>
              <p className="text-muted-foreground mt-1">Total criados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Ativos</CardTitle>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{stats?.activeQuestionnaires || 0}</div>
              <p className="text-muted-foreground mt-1">Em andamento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Respostas</CardTitle>
                <ClipboardList className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{stats?.totalResponses || 0}</div>
              <p className="text-muted-foreground mt-1">Total recebidas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Estudantes</CardTitle>
                <Users className="h-5 w-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{stats?.totalStudents || 0}</div>
              <p className="text-muted-foreground mt-1">Registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Docentes</CardTitle>
                <Users className="h-5 w-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{stats?.totalTeachers || 0}</div>
              <p className="text-muted-foreground mt-1">Registrados</p>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Metrics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Métricas de Participação</CardTitle>
            <CardDescription>
              Análise de engajamento dos estudantes nas avaliações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats && stats.totalQuestionnaires > 0 && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span>Taxa de Resposta Média</span>
                      <span className="text-xl">
                        {stats.totalStudents > 0
                          ? Math.round(
                              (stats.totalResponses /
                                (stats.totalStudents * stats.activeQuestionnaires)) *
                                100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${
                            stats.totalStudents > 0
                              ? Math.min(
                                  (stats.totalResponses /
                                    (stats.totalStudents * stats.activeQuestionnaires)) *
                                    100,
                                  100
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-muted-foreground mb-1">Média de Respostas</p>
                      <p className="text-2xl">
                        {stats.totalQuestionnaires > 0
                          ? Math.round(stats.totalResponses / stats.totalQuestionnaires)
                          : 0}
                      </p>
                      <p className="text-sm text-muted-foreground">por questionário</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-muted-foreground mb-1">Taxa de Conclusão</p>
                      <p className="text-2xl">
                        {stats.totalQuestionnaires > 0
                          ? Math.round((stats.activeQuestionnaires / stats.totalQuestionnaires) * 100)
                          : 0}
                        %
                      </p>
                      <p className="text-sm text-muted-foreground">questionários ativos</p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-muted-foreground mb-1">Engajamento Docente</p>
                      <p className="text-2xl">
                        {stats.totalTeachers > 0
                          ? Math.round((stats.totalQuestionnaires / stats.totalTeachers) * 10) / 10
                          : 0}
                      </p>
                      <p className="text-sm text-muted-foreground">questionários por docente</p>
                    </div>
                  </div>
                </>
              )}

              {(!stats || stats.totalQuestionnaires === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  Aguardando dados de avaliações para gerar métricas
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Questionnaires */}
        <div>
          <h3 className="mb-4">Questionários Recentes</h3>
          {questionnaires.length > 0 ? (
            <div className="space-y-4">
              {questionnaires.slice(0, 10).map((q) => (
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
                          {q.status === 'active' ? (
                            <Badge className="bg-green-100 text-green-700">Ativo</Badge>
                          ) : (
                            <Badge variant="outline">Encerrado</Badge>
                          )}
                          <Badge variant="outline">
                            Prazo: {new Date(q.deadline).toLocaleDateString('pt-PT')}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedQuestionnaireId(q.id);
                          setSelectedView('questionnaire');
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Resultados
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader className="text-center py-12">
                <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <CardTitle>Nenhum questionário criado</CardTitle>
                <CardDescription>
                  Os docentes ainda não criaram questionários na instituição.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
