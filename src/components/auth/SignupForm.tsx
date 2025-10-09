import { useState } from 'react';
import { signUp } from '../../utils/auth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertCircle } from 'lucide-react';
import { InstitutionSelector } from './InstitutionSelector';

interface SignupFormProps {
  onSuccess: () => void;
  onToggleMode: () => void;
}

export function SignupForm({ onSuccess, onToggleMode }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    institutionId: '',
  });
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState<'general' | 'duplicate-email' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrorType(null);

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (!formData.role) {
      setError('Por favor, selecione seu tipo de usuário');
      return;
    }

    if (!formData.institutionId) {
      setError('Por favor, selecione sua instituição');
      return;
    }

    setLoading(true);

    try {
      await signUp(
        formData.email,
        formData.password,
        formData.name,
        formData.role,
        formData.institutionId || undefined
      );
      onSuccess();
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao criar conta';
      
      // Better error messages for common issues
      if (errorMessage.includes('already been registered')) {
        setError('Este email já está registrado no sistema.');
        setErrorType('duplicate-email');
      } else if (errorMessage.includes('Invalid email')) {
        setError('Email inválido. Por favor, use um email válido.');
        setErrorType('general');
      } else {
        setError(errorMessage);
        setErrorType('general');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <div className="mb-6">
        <h2 className="text-center mb-2">Criar Conta</h2>
        <p className="text-center text-muted-foreground">
          Registre-se no sistema de avaliação
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Seu nome"
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email institucional</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="exemplo@universidade.ac.mz"
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Tipo de usuário</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu papel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Estudante</SelectItem>
              <SelectItem value="teacher">Docente</SelectItem>
              <SelectItem value="manager">Gestor Institucional</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <InstitutionSelector
          value={formData.institutionId}
          onChange={(institutionId) => setFormData({ ...formData, institutionId })}
          disabled={loading}
        />

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Mínimo 6 caracteres"
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Repita a senha"
            required
            disabled={loading}
          />
        </div>

        {error && (
          <div className="flex flex-col gap-3 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-800">{error}</p>
                {errorType === 'duplicate-email' && (
                  <p className="text-red-700 mt-1">
                    Já tem uma conta com este email?
                  </p>
                )}
              </div>
            </div>
            {errorType === 'duplicate-email' && (
              <Button
                type="button"
                variant="outline"
                onClick={onToggleMode}
                className="w-full border-red-300 text-red-700 hover:bg-red-100"
              >
                Ir para o Login
              </Button>
            )}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Criando conta...' : 'Criar conta'}
        </Button>

        <div className="text-center pt-4 border-t">
          <p className="text-muted-foreground">
            Já tem uma conta?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-primary hover:underline"
            >
              Fazer login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
