import { Alert, AlertDescription } from '../ui/alert';
import { Info } from 'lucide-react';

export function TestCredentialsInfo() {
  return (
    <Alert className="mt-4 bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-900">
        <p className="font-medium mb-2">Testando o sistema?</p>
        <p className="text-sm mb-2">
          Se você já criou uma conta anteriormente e esqueceu a senha, use a opção{' '}
          <strong>"Esqueceu a senha?"</strong> acima.
        </p>
        <p className="text-sm">
          Para criar uma nova conta de teste, use um email diferente como:{' '}
          <code className="bg-blue-100 px-1 py-0.5 rounded">seunome@teste.ac.mz</code>
        </p>
      </AlertDescription>
    </Alert>
  );
}