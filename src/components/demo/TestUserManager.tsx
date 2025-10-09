import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Info, Users, Trash2, CheckCircle } from 'lucide-react';

export function TestUserManager() {
  const [showInfo, setShowInfo] = useState(false);

  const testUsers = [
    {
      role: 'Estudante',
      email: 'estudante@teste.ac.mz',
      password: 'teste123',
      description: 'Pode visualizar e responder questionários'
    },
    {
      role: 'Docente',
      email: 'docente@teste.ac.mz',
      password: 'teste123',
      description: 'Pode criar questionários e ver resultados'
    },
    {
      role: 'Gestor',
      email: 'gestor@teste.ac.mz',
      password: 'teste123',
      description: 'Pode gerir instituições e ver analytics'
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!showInfo ? (
        <Button
          onClick={() => setShowInfo(true)}
          className="shadow-lg"
          size="sm"
        >
          <Info className="h-4 w-4 mr-2" />
          Ajuda para Teste
        </Button>
      ) : (
        <Card className="w-80 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Usuários de Teste</CardTitle>
                <CardDescription>Credenciais para testes do sistema</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowInfo(false)}
              >
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Use estas credenciais para testar diferentes perfis de usuário.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              {testUsers.map((user, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg space-y-1">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <p className="font-medium">{user.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.description}</p>
                  <div className="pt-2 space-y-1">
                    <p className="text-xs">
                      <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p className="text-xs">
                      <span className="font-medium">Senha:</span> {user.password}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Problema com login?</strong> Se uma conta já existe, use a opção
                "Esqueceu a senha?" ou crie uma nova conta com email diferente.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}