import { useState } from 'react';
import { projectId } from '../../utils/supabase/info';
import { getCurrentSession } from '../../utils/auth';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { AlertCircle, Shield, ArrowLeft, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Question {
  type: 'open' | 'scale' | 'multiple-choice';
  text: string;
  options?: string[];
}

interface QuestionnaireResponseProps {
  questionnaire: {
    id: string;
    title: string;
    description: string;
    questions: Question[];
  };
  onComplete: () => void;
  onCancel: () => void;
}

export function QuestionnaireResponse({
  questionnaire,
  onComplete,
  onCancel,
}: QuestionnaireResponseProps) {
  const [answers, setAnswers] = useState<any[]>(
    new Array(questionnaire.questions.length).fill('')
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnswerChange = (index: number, value: any) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const isComplete = answers.every((answer) => answer !== '');

  const handleSubmit = async () => {
    if (!isComplete) {
      setError('Por favor, responda todas as perguntas');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const session = await getCurrentSession();
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9e435140/questionnaire/${questionnaire.id}/respond`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ answers }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Error submitting response:', data.error);
        setError(data.error || 'Erro ao enviar resposta');
        return;
      }

      toast.success('Avaliação enviada com sucesso!', {
        description: 'Sua resposta foi registrada de forma anônima.',
      });
      
      onComplete();
    } catch (error) {
      console.error('Error submitting response:', error);
      setError('Erro ao enviar resposta. Tente novamente.');
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
          <h1 className="mb-2">{questionnaire.title}</h1>
          <p className="text-muted-foreground">{questionnaire.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Privacy Notice */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <CardTitle className="text-green-900">
                  Suas respostas são completamente anônimas
                </CardTitle>
                <CardDescription className="text-green-700">
                  Nenhuma informação pessoal será associada a esta avaliação. O docente
                  receberá apenas estatísticas agregadas.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {questionnaire.questions.map((question, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>
                  Pergunta {index + 1}
                  {question.type === 'open' && (
                    <span className="text-muted-foreground ml-2">(Resposta aberta)</span>
                  )}
                </CardTitle>
                <CardDescription>{question.text}</CardDescription>
              </CardHeader>
              <CardContent>
                {question.type === 'open' && (
                  <Textarea
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder="Digite sua resposta..."
                    rows={4}
                    disabled={loading}
                  />
                )}

                {question.type === 'scale' && (
                  <RadioGroup
                    value={answers[index]?.toString()}
                    onValueChange={(value) => handleAnswerChange(index, parseInt(value))}
                    disabled={loading}
                  >
                    <div className="grid grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div
                          key={value}
                          className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <RadioGroupItem value={value.toString()} id={`q${index}-${value}`} />
                          <Label
                            htmlFor={`q${index}-${value}`}
                            className="cursor-pointer"
                          >
                            {value}
                          </Label>
                          {value === 1 && (
                            <span className="text-xs text-muted-foreground">Péssimo</span>
                          )}
                          {value === 5 && (
                            <span className="text-xs text-muted-foreground">Excelente</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {question.type === 'multiple-choice' && question.options && (
                  <RadioGroup
                    value={answers[index]}
                    onValueChange={(value) => handleAnswerChange(index, value)}
                    disabled={loading}
                  >
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <RadioGroupItem
                            value={option}
                            id={`q${index}-opt${optionIndex}`}
                          />
                          <Label
                            htmlFor={`q${index}-opt${optionIndex}`}
                            className="cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {error && (
          <div className="flex items-start gap-2 p-4 mt-6 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4 mt-8 pb-8">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !isComplete} className="flex-1">
            <Send className="h-4 w-4 mr-2" />
            {loading ? 'Enviando...' : 'Enviar Avaliação Anônima'}
          </Button>
        </div>
      </div>
    </div>
  );
}
