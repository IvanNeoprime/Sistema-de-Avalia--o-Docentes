import { useState } from 'react';
import { mozambiqueInstitutions, mozambiqueProvinces, Institution } from '../../utils/institutions';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Building2, Search, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface InstitutionSelectorProps {
  value: string;
  onChange: (institutionId: string) => void;
  disabled?: boolean;
}

export function InstitutionSelector({ value, onChange, disabled }: InstitutionSelectorProps) {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [viewMode, setViewMode] = useState<'province' | 'all' | 'search'>('province');
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredInstitutions = (): Institution[] => {
    if (viewMode === 'province' && selectedProvince) {
      return mozambiqueInstitutions.filter(inst => inst.province === selectedProvince);
    }
    
    if (viewMode === 'search' && searchTerm) {
      const term = searchTerm.toLowerCase();
      return mozambiqueInstitutions.filter(inst => 
        inst.name.toLowerCase().includes(term) || 
        inst.code.toLowerCase().includes(term) ||
        inst.city.toLowerCase().includes(term) ||
        inst.province.toLowerCase().includes(term)
      );
    }
    
    return mozambiqueInstitutions;
  };

  const filteredInstitutions = getFilteredInstitutions();
  const selectedInstitution = mozambiqueInstitutions.find(inst => inst.id === value);

  return (
    <div className="space-y-4">
      {/* View Mode Selector */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={viewMode === 'province' ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            setViewMode('province');
            setSearchTerm('');
          }}
          disabled={disabled}
          className="flex-1"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Por Província
        </Button>
        <Button
          type="button"
          variant={viewMode === 'search' ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            setViewMode('search');
            setSelectedProvince('');
          }}
          disabled={disabled}
          className="flex-1"
        >
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
        <Button
          type="button"
          variant={viewMode === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            setViewMode('all');
            setSelectedProvince('');
            setSearchTerm('');
          }}
          disabled={disabled}
          className="flex-1"
        >
          <Building2 className="h-4 w-4 mr-2" />
          Ver Todas
        </Button>
      </div>

      {/* Province Filter */}
      {viewMode === 'province' && (
        <div className="space-y-2">
          <Label>Província *</Label>
          <Select
            value={selectedProvince}
            onValueChange={(province) => {
              setSelectedProvince(province);
              onChange(''); // Reset institution when province changes
            }}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a província" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {mozambiqueProvinces.map((province) => {
                const count = mozambiqueInstitutions.filter(
                  inst => inst.province === province
                ).length;
                return (
                  <SelectItem key={province} value={province}>
                    {province} ({count} {count === 1 ? 'instituição' : 'instituições'})
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Search Input */}
      {viewMode === 'search' && (
        <div className="space-y-2">
          <Label>Buscar Instituição</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Digite o nome, sigla ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={disabled}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Institution Selector */}
      {((viewMode === 'province' && selectedProvince) || 
        (viewMode === 'search' && searchTerm) || 
        viewMode === 'all') && (
        <div className="space-y-2">
          <Label>
            Instituição * 
            {filteredInstitutions.length > 0 && (
              <span className="text-muted-foreground ml-2">
                ({filteredInstitutions.length} {filteredInstitutions.length === 1 ? 'encontrada' : 'encontradas'})
              </span>
            )}
          </Label>
          
          {filteredInstitutions.length > 0 ? (
            <Select
              value={value}
              onValueChange={onChange}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione sua instituição" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                {filteredInstitutions.map((inst) => (
                  <SelectItem key={inst.id} value={inst.id}>
                    <div className="flex flex-col items-start py-1">
                      <div className="font-medium">{inst.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {inst.code} • {inst.city}, {inst.province}
                        {inst.type === 'public' ? ' • Pública' : ' • Privada'}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="p-4 text-center border rounded-md bg-gray-50">
              <p className="text-sm text-muted-foreground">
                Nenhuma instituição encontrada
              </p>
            </div>
          )}
        </div>
      )}

      {/* Selected Institution Preview */}
      {selectedInstitution && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-green-900">{selectedInstitution.name}</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">{selectedInstitution.code}</Badge>
                  <Badge variant="outline">
                    <MapPin className="h-3 w-3 mr-1" />
                    {selectedInstitution.city}, {selectedInstitution.province}
                  </Badge>
                  <Badge variant="outline">
                    {selectedInstitution.type === 'public' ? 'Pública' : 'Privada'}
                  </Badge>
                </div>
                {selectedInstitution.departments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">
                      {selectedInstitution.departments.length} departamento(s)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Text */}
      {!selectedProvince && viewMode === 'province' && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            💡 Selecione a província para ver as instituições disponíveis
          </p>
        </div>
      )}

      {viewMode === 'search' && !searchTerm && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            🔍 Digite para buscar entre 42 instituições de ensino superior
          </p>
        </div>
      )}
    </div>
  );
}
