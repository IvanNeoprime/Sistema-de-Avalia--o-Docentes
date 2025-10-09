import { useState } from 'react';
import { projectId } from '../../utils/supabase/info';
import { getCurrentSession } from '../../utils/auth';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Question {
  type: 'open' | 'scale' | 'multiple-choice';
  text: string;
  options?: string[];
}

interface QuestionnaireBuilderProps {
  user: any;
  onComplete: () => void;
  onCancel: () => void;
}

export function QuestionnaireBuilder({ user, onComplete, onCancel }: QuestionnaireBuilderProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { type: 'scale', text: '' },
  ]);
  const [loading, setLoading] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { type: 'scale', text: '' }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, updates: Partial<Question>) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], ...updates };
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    if (!newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options = [];
    }
    newQuestions[questionIndex].options!.push('');
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options![optionIndex] = value;
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options = newQuestions[questionIndex].options!.filter(
      (_, i) => i !== optionIndex
    );
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    if (!title || !description || !deadline) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (questions.length === 0) {
      toast.error('Adicione pelo menos uma pergunta');
      return;
    }

    const invalidQuestions = questions.filter((q) => !q.text.trim());
    if (invalidQuestions.length > 0) {
      toast.error('Todas as perguntas devem ter texto');
      return;
    }

    setLoading(true);

    try {
      const session = await getCurrentSession();
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9e435140/questionnaire/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            title,
            description,
            deadline,
            questions,
            institutionId: user.institutionId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Error creating questionnaire:', data.error);
        toast.error(data.error || 'Erro ao criar questionário');
        return;
      }

      toast.success('Questionário criado com sucesso!');
      onComplete();
    } catch (error) {
      console.error('Error creating questionnaire:', error);
      toast.error('Erro ao criar questionário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button variant="ghost" onClick={onCancel} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="mb-2">Criar Novo Questionário</h1>
          <p className="text-muted-foreground">
            Configure as perguntas para receber feedback anônimo dos estudantes
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Questionário</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Avaliação de Metodologias de Ensino"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o objetivo desta avaliação..."
                rows={3}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Prazo de Resposta</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={loading}
              />
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Perguntas</h3>
            <Button onClick={addQuestion} variant="outline" disabled={loading}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Pergunta
            </Button>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pergunta {index + 1}</CardTitle>
                    {questions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(index)}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tipo de Pergunta</Label>
                    <Select
                      value={question.type}
                      onValueChange={(value: any) =>
                        updateQuestion(index, { type: value })
                      }
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Resposta Aberta</SelectItem>
                        <SelectItem value="scale">Escala (1-5)</SelectItem>
                        <SelectItem value="multiple-choice">Múltipla Escolha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Texto da Pergunta</Label>
                    <Textarea
                      value={question.text}
                      onChange={(e) => updateQuestion(index, { text: e.target.value })}
                      placeholder="Digite a pergunta..."
                      rows={2}
                      disabled={loading}
                    />
                  </div>

                  {question.type === 'multiple-choice' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Opções</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(index)}
                          disabled={loading}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Opção
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {question.options?.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex gap-2">
                            <Input
                              value={option}
                              onChange={(e) =>
                                updateOption(index, optionIndex, e.target.value)
                              }
                              placeholder={`Opção ${optionIndex + 1}`}
                              disabled={loading}
                            />
                            {question.options!.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOption(index, optionIndex)}
                                disabled={loading}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            )}
                          </div>
                        ))}
                        {(!question.options || question.options.length === 0) && (
                          <p className="text-muted-foreground">
                            Nenhuma opção adicionada. Clique em "Adicionar Opção".
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pb-8">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Salvando...' : 'Criar Questionário'}
          </Button>
        </div>
      </div>
    </div>
  );
}
