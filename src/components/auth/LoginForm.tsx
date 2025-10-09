import { useState } from 'react';
import { signIn } from '../../utils/auth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle } from 'lucide-react';
import { TestCredentialsInfo } from './TestCredentialsInfo';

interface LoginFormProps {
  onSuccess: () => void;
  onToggleMode: () => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onSuccess, onToggleMode, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      onSuccess();
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao fazer login';
      
      // Better error messages for common issues
      if (errorMessage.includes('Invalid login credentials')) {
        setError('Email ou senha incorretos. Verifique suas credenciais ou use "Esqueceu a senha?"');
      } else if (errorMessage.includes('Email not confirmed')) {
        setError('Email não confirmado. Verifique sua caixa de entrada.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <div className="mb-6">
        <h2 className="text-center mb-2">Login</h2>
        <p className="text-center text-muted-foreground">
          Acesse sua conta no sistema de avaliação
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email institucional</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@universidade.ac.mz"
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-primary hover:underline"
            >
              Esqueceu a senha?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <div className="text-center pt-4 border-t">
          <p className="text-muted-foreground">
            Não tem uma conta?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-primary hover:underline"
            >
              Criar conta
            </button>
          </p>
        </div>
      </form>

      <TestCredentialsInfo />
    </div>
  );
}
