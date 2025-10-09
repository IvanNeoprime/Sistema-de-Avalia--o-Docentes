import { useState, useEffect } from 'react';
import { projectId } from '../../utils/supabase/info';
import { getCurrentSession } from '../../utils/auth';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ArrowLeft, Plus, Building2, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface InstitutionManagerProps {
  user: any;
  onBack: () => void;
}

export function InstitutionManager({ user, onBack }: InstitutionManagerProps) {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    departments: '',
  });

  useEffect(() => {
    loadInstitutions();
  }, []);

  const loadInstitutions = async () => {
    try {
      const session = await getCurrentSession();
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9e435140/institutions`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) {
        console.error('Failed to load institutions');
        return;
      }

      const data = await response.json();
      setInstitutions(data.institutions || []);
    } catch (error) {
      console.error('Error loading institutions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInstitution = async () => {
    if (!formData.name || !formData.code) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      const session = await getCurrentSession();
      const departments = formData.departments
        .split(',')
        .map((d) => d.trim())
        .filter((d) => d);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9e435140/institution/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            code: formData.code,
            departments,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Error creating institution:', data.error);
        toast.error(data.error || 'Erro ao criar instituição');
        return;
      }

      toast.success('Instituição criada com sucesso!');
      setShowCreateDialog(false);
      setFormData({ name: '', code: '', departments: '' });
      loadInstitutions();
    } catch (error) {
      console.error('Error creating institution:', error);
      toast.error('Erro ao criar instituição. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Gestão de Instituições</h1>
              <p className="text-muted-foreground">
                Administre universidades e institutos na plataforma
              </p>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Instituição
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Instituição</DialogTitle>
                  <DialogDescription>
                    Adicione uma nova universidade ou instituto à plataforma
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da Instituição</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Ex: Universidade Eduardo Mondlane"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code">Código</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                      placeholder="Ex: UEM"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="departments">
                      Departamentos (separados por vírgula)
                    </Label>
                    <Input
                      id="departments"
                      value={formData.departments}
                      onChange={(e) =>
                        setFormData({ ...formData, departments: e.target.value })
                      }
                      placeholder="Ex: Engenharia, Ciências, Letras"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateDialog(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateInstitution} className="flex-1">
                      Criar Instituição
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {institutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {institutions.map((institution) => (
              <Card key={institution.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle>{institution.name}</CardTitle>
                        <CardDescription className="mt-1">
                          Código: {institution.code}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-muted-foreground mb-2">Departamentos</p>
                      <div className="flex flex-wrap gap-2">
                        {institution.departments && institution.departments.length > 0 ? (
                          institution.departments.map((dept: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {dept}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-muted-foreground">
                            Nenhum departamento cadastrado
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <p className="text-muted-foreground">
                        Criada em{' '}
                        {new Date(institution.createdAt).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle>Nenhuma instituição cadastrada</CardTitle>
              <CardDescription>
                Crie a primeira instituição para começar a utilizar a plataforma.
              </CardDescription>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="mt-4 mx-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeira Instituição
              </Button>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
