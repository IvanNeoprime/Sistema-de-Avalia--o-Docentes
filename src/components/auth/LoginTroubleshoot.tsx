import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { HelpCircle, X, AlertCircle, CheckCircle2 } from 'lucide-react';

export function LoginTroubleshoot() {
  const [showHelp, setShowHelp] = useState(false);

  const issues = [
    {
      problem: '"Email já registrado"',
      solution: 'Use a opção "Esqueceu a senha?" na tela de login para recuperar seu acesso.',
      icon: AlertCircle
    },
    {
      problem: '"Credenciais inválidas"',
      solution: 'Verifique se o email e senha estão corretos. Se esqueceu, use "Esqueceu a senha?"',
      icon: AlertCircle
    },
    {
      problem: 'Esqueci minha senha',
      solution: 'Clique em "Esqueceu a senha?" na tela de login e siga as instruções enviadas ao seu email.',
      icon: CheckCircle2
    },
    {
      problem: 'Quero criar nova conta',
      solution: 'Use um email diferente do anterior ou recupere a senha da conta existente.',
      icon: CheckCircle2
    }
  ];

  if (!showHelp) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setShowHelp(true)}
          variant="outline"
          className="shadow-lg bg-white"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Problemas com login?
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Resolução de Problemas</CardTitle>
              <CardDescription>Soluções para problemas comuns de autenticação</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowHelp(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {issues.map((issue, index) => {
            const Icon = issue.icon;
            return (
              <Alert key={index}>
                <Icon className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium mb-1">{issue.problem}</p>
                  <p className="text-sm">{issue.solution}</p>
                </AlertDescription>
              </Alert>
            );
          })}

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">
              <strong>Dica importante:</strong> O sistema garante total segurança e privacidade.
              Todas as avaliações de estudantes são completamente anônimas.
            </p>
            <Button onClick={() => setShowHelp(false)} className="w-full">
              Entendi, fechar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}