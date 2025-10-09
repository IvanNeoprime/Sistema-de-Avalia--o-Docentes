import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { AlertTriangle, Database, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { resetDatabase, getDatabaseStats } from '../../utils/resetDatabase';

export function DatabaseReset() {
  const [stats, setStats] = useState<{
    users: number;
    responses: number;
    questionnaires: number;
    institutions: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const loadStats = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getDatabaseStats();
      setStats(data);
    } catch (err) {
      setError('Erro ao carregar estatísticas');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    setError('');
    setSuccess(false);
    
    try {
      const result = await resetDatabase();
      
      if (result.success) {
        setSuccess(true);
        // Reload stats after reset
        await loadStats();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erro ao resetar base de dados');
    } finally {
      setResetting(false);
    }
  };

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-orange-600" />
          Reset da Base de Dados
        </CardTitle>
        <CardDescription>
          Limpar todos os dados de teste antes do deploy em produção
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Warning */}
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>ATENÇÃO:</strong> Esta ação é irreversível e irá deletar TODOS os usuários, 
            respostas e questionários. As instituições serão preservadas.
          </AlertDescription>
        </Alert>

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Estatísticas Atuais</h4>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={loadStats}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Carregando...
                </>
              ) : (
                'Atualizar'
              )}
            </Button>
          </div>

          {stats && (
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{stats.users}</div>
                <div className="text-xs text-muted-foreground">Usuários</div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600">{stats.responses}</div>
                <div className="text-xs text-muted-foreground">Respostas</div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-purple-600">{stats.questionnaires}</div>
                <div className="text-xs text-muted-foreground">Questionários</div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-orange-600">{stats.institutions}</div>
                <div className="text-xs text-muted-foreground">Instituições</div>
                <Badge variant="outline" className="mt-1">Preservadas</Badge>
              </div>
            </div>
          )}
        </div>

        {/* Success Message */}
        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Base de dados resetada com sucesso! O sistema está pronto para deploy em produção.
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Reset Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              className="w-full"
              disabled={resetting}
            >
              {resetting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Resetando...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Resetar Base de Dados
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <p>Esta ação irá deletar permanentemente:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Todos os {stats?.users || 0} usuários cadastrados</li>
                  <li>Todas as {stats?.responses || 0} respostas de avaliação</li>
                  <li>Todos os {stats?.questionnaires || 0} questionários criados</li>
                  <li>Todos os dados de autenticação</li>
                </ul>
                <p className="font-medium text-orange-600 mt-3">
                  As {stats?.institutions || 42} instituições serão preservadas.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Esta ação não pode ser desfeita. Use apenas antes do deploy inicial.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleReset}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Sim, resetar tudo
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Instructions */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h5 className="text-sm font-medium text-blue-900 mb-1">
            Quando usar este reset?
          </h5>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Antes do primeiro deploy em produção</li>
            <li>• Para limpar dados de teste/desenvolvimento</li>
            <li>• Quando precisar de um sistema completamente limpo</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
