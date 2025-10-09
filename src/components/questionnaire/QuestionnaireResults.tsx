import { useState, useEffect } from 'react';
import { projectId } from '../../utils/supabase/info';
import { getCurrentSession } from '../../utils/auth';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { ArrowLeft, Download, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface QuestionnaireResultsProps {
  questionnaireId: string;
  onBack: () => void;
}

export function QuestionnaireResults({ questionnaireId, onBack }: QuestionnaireResultsProps) {
  const [questionnaire, setQuestionnaire] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, [questionnaireId]);

  const loadResults = async () => {
    try {
      const session = await getCurrentSession();
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9e435140/questionnaire/${questionnaireId}/results`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) {
        console.error('Failed to load results');
        return;
      }

      const data = await response.json();
      setQuestionnaire(data.questionnaire);
      setResults(data.results);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Carregando resultados...</p>
      </div>
    );
  }

  if (!questionnaire || !results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Erro ao carregar resultados</p>
      </div>
    );
  }

  const calculateAverage = (responses: any) => {
    const values = Object.entries(responses).map(([key, count]: any) => 
      parseInt(key) * count
    );
    const total = Object.values(responses).reduce((a: any, b: any) => a + b, 0);
    return total > 0 ? (values.reduce((a, b) => a + b, 0) / total).toFixed(2) : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2">{questionnaire.title}</h1>
              <p className="text-muted-foreground">{questionnaire.description}</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Resumo da Avaliação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl">{results.totalResponses}</div>
                  <p className="text-muted-foreground">Respostas Recebidas</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Prazo</p>
                <p>{new Date(questionnaire.deadline).toLocaleDateString('pt-PT')}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Status</p>
                <p className="text-green-600">{questionnaire.status === 'active' ? 'Ativo' : 'Encerrado'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions Results */}
        <div className="space-y-6">
          {results.questions.map((question: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Pergunta {index + 1}</CardTitle>
                <CardDescription>{question.text}</CardDescription>
              </CardHeader>
              <CardContent>
                {question.type === 'scale' && (
                  <div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span>Média de Avaliação</span>
                        <span className="text-2xl">
                          {calculateAverage(question.responses)}/5
                        </span>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={Object.entries(question.responses || {}).map(
                          ([value, count]) => ({
                            rating: `${value} estrela${value !== '1' ? 's' : ''}`,
                            count: count,
                          })
                        )}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rating" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#030213" name="Número de Respostas" />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {[1, 2, 3, 4, 5].map((rating) => {
                        const count = question.responses[rating] || 0;
                        const percentage =
                          results.totalResponses > 0
                            ? (count / results.totalResponses) * 100
                            : 0;
                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="w-20">{rating} estrela{rating !== 1 ? 's' : ''}</span>
                            <Progress value={percentage} className="flex-1" />
                            <span className="w-16 text-right text-muted-foreground">
                              {count} ({percentage.toFixed(0)}%)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {question.type === 'multiple-choice' && (
                  <div>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={Object.entries(question.responses || {}).map(
                          ([option, count]) => ({
                            option: option,
                            count: count,
                          })
                        )}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="option" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#030213" name="Número de Respostas" />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {Object.entries(question.responses || {}).map(
                        ([option, count]: any) => {
                          const percentage =
                            results.totalResponses > 0
                              ? (count / results.totalResponses) * 100
                              : 0;
                          return (
                            <div key={option} className="flex items-center gap-3">
                              <span className="flex-1">{option}</span>
                              <Progress value={percentage} className="flex-1" />
                              <span className="w-16 text-right text-muted-foreground">
                                {count} ({percentage.toFixed(0)}%)
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

                {question.type === 'open' && (
                  <div className="space-y-3">
                    <p className="text-muted-foreground mb-2">
                      {question.responses?.length || 0} respostas recebidas
                    </p>
                    <div className="max-h-96 overflow-y-auto space-y-3">
                      {question.responses?.map((response: string, responseIndex: number) => (
                        <div
                          key={responseIndex}
                          className="p-4 bg-gray-50 rounded-lg border"
                        >
                          <p className="text-muted-foreground mb-1">
                            Resposta Anônima {responseIndex + 1}
                          </p>
                          <p>{response}</p>
                        </div>
                      ))}
                      {(!question.responses || question.responses.length === 0) && (
                        <p className="text-muted-foreground text-center py-8">
                          Nenhuma resposta recebida ainda
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {results.totalResponses === 0 && (
          <Card>
            <CardHeader className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle>Nenhuma resposta recebida</CardTitle>
              <CardDescription>
                Aguarde até que os estudantes comecem a responder este questionário.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
