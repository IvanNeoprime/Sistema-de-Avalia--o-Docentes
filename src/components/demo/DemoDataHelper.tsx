import { projectId, publicAnonKey } from '../../utils/supabase/info';

/**
 * Helper component for demo purposes
 * This demonstrates sample credentials for testing the system
 */
export function DemoDataHelper() {
  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <h4 className="mb-2">Demo: Credenciais de Teste</h4>
      <div className="space-y-2 text-sm">
        <div className="p-2 bg-blue-50 rounded border border-blue-200">
          <p className="text-xs text-muted-foreground mb-1">Estudante</p>
          <p>estudante@uem.ac.mz</p>
          <p className="text-xs text-muted-foreground">senha: student123</p>
        </div>
        <div className="p-2 bg-green-50 rounded border border-green-200">
          <p className="text-xs text-muted-foreground mb-1">Docente</p>
          <p>docente@uem.ac.mz</p>
          <p className="text-xs text-muted-foreground">senha: teacher123</p>
        </div>
        <div className="p-2 bg-purple-50 rounded border border-purple-200">
          <p className="text-xs text-muted-foreground mb-1">Gestor</p>
          <p>gestor@uem.ac.mz</p>
          <p className="text-xs text-muted-foreground">senha: manager123</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Crie estas contas para testar o sistema completo
      </p>
    </div>
  );
}
