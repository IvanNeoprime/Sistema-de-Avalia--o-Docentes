import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle2, Database, Shield, Users } from 'lucide-react';

export function SystemStatus() {
  const features = [
    {
      icon: Shield,
      title: 'Anonimato Total',
      description: 'Sistema de separação de identidade implementado',
      status: 'Ativo'
    },
    {
      icon: Database,
      title: 'Base de Dados Completa',
      description: '20+ instituições de Moçambique cadastradas',
      status: 'Ativo'
    },
    {
      icon: Users,
      title: 'Três Perfis',
      description: 'Estudante, Docente e Gestor funcionais',
      status: 'Ativo'
    },
    {
      icon: CheckCircle2,
      title: 'Sistema Pronto',
      description: 'Todos os recursos principais implementados',
      status: 'Ativo'
    }
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-center">Status do Sistema</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Icon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-green-900">{feature.title}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-sm text-green-700">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}