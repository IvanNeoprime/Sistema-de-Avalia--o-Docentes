// Base de dados completa de Instituições de Ensino Superior de Moçambique

export interface Institution {
  id: string;
  name: string;
  code: string;
  type: 'public' | 'private';
  city: string;
  province: string;
  departments: string[];
}

export const mozambiqueInstitutions: Institution[] = [
  // Universidades Públicas
  {
    id: 'uem',
    name: 'Universidade Eduardo Mondlane',
    code: 'UEM',
    type: 'public',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Faculdade de Agronomia e Engenharia Florestal',
      'Faculdade de Arquitectura e Planeamento Físico',
      'Faculdade de Ciências',
      'Faculdade de Direito',
      'Faculdade de Economia',
      'Faculdade de Educação',
      'Faculdade de Engenharia',
      'Faculdade de Letras e Ciências Sociais',
      'Faculdade de Medicina',
      'Faculdade de Veterinária'
    ]
  },
  {
    id: 'up',
    name: 'Universidade Pedagógica',
    code: 'UP',
    type: 'public',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Faculdade de Ciências da Educação e Psicologia',
      'Faculdade de Ciências Naturais e Matemática',
      'Faculdade de Ciências Sociais',
      'Faculdade de Educação Física e Desporto',
      'Faculdade de Línguas'
    ]
  },
  {
    id: 'unizambeze',
    name: 'Universidade Zambeze',
    code: 'UniZambeze',
    type: 'public',
    city: 'Beira',
    province: 'Sofala',
    departments: [
      'Faculdade de Ciências e Tecnologias',
      'Faculdade de Economia e Gestão',
      'Faculdade de Engenharia',
      'Faculdade de Ciências Sociais'
    ]
  },
  {
    id: 'unilurio',
    name: 'Universidade Lúrio',
    code: 'UniLúrio',
    type: 'public',
    city: 'Nampula',
    province: 'Nampula',
    departments: [
      'Faculdade de Ciências Agrárias',
      'Faculdade de Ciências Naturais',
      'Faculdade de Ciências de Saúde',
      'Faculdade de Engenharia',
      'Faculdade de Ciências Sociais'
    ]
  },
  {
    id: 'unizulu',
    name: 'Universidade Zumbe',
    code: 'UniZulu',
    type: 'public',
    city: 'Quelimane',
    province: 'Zambézia',
    departments: [
      'Faculdade de Ciências Agrárias',
      'Faculdade de Economia e Gestão',
      'Faculdade de Engenharia',
      'Faculdade de Educação'
    ]
  },
  {
    id: 'unirv',
    name: 'Universidade do Rovuma',
    code: 'UniRovuma',
    type: 'public',
    city: 'Montepuez',
    province: 'Cabo Delgado',
    departments: [
      'Faculdade de Ciências Agrárias',
      'Faculdade de Ciências Naturais e Matemática',
      'Faculdade de Ciências Sociais',
      'Faculdade de Educação'
    ]
  },
  {
    id: 'isri',
    name: 'Instituto Superior de Relações Internacionais',
    code: 'ISRI',
    type: 'public',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Departamento de Relações Internacionais',
      'Departamento de Diplomacia',
      'Departamento de Estudos Estratégicos'
    ]
  },
  {
    id: 'acipol',
    name: 'Academia de Ciências Policiais',
    code: 'ACIPOL',
    type: 'public',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Curso de Ciências Policiais',
      'Curso de Criminalística',
      'Curso de Segurança Pública'
    ]
  },
  {
    id: 'isedef',
    name: 'Instituto Superior de Estudos de Defesa',
    code: 'ISEDEF',
    type: 'public',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Curso de Ciências Militares',
      'Curso de Estratégia e Defesa',
      'Curso de Relações Internacionais'
    ]
  },
  {
    id: 'isced_maputo',
    name: 'Instituto Superior de Ciências de Educação de Maputo',
    code: 'ISCED-Maputo',
    type: 'public',
    city: 'Matola',
    province: 'Maputo',
    departments: [
      'Curso de Ensino de Matemática',
      'Curso de Ensino de Português',
      'Curso de Ensino de Inglês',
      'Curso de Informática na Educação'
    ]
  },
  {
    id: 'isced_gaza',
    name: 'Instituto Superior de Ciências de Educação de Gaza',
    code: 'ISCED-Gaza',
    type: 'public',
    city: 'Xai-Xai',
    province: 'Gaza',
    departments: [
      'Curso de Ensino de Matemática',
      'Curso de Ensino de Física',
      'Curso de Ensino de Português',
      'Curso de Ensino de História'
    ]
  },
  {
    id: 'isced_inhambane',
    name: 'Instituto Superior de Ciências de Educação de Inhambane',
    code: 'ISCED-Inhambane',
    type: 'public',
    city: 'Inhambane',
    province: 'Inhambane',
    departments: [
      'Curso de Ensino de Biologia',
      'Curso de Ensino de Química',
      'Curso de Ensino de Geografia',
      'Curso de Ensino de Inglês'
    ]
  },
  {
    id: 'isced_beira',
    name: 'Instituto Superior de Ciências de Educação da Beira',
    code: 'ISCED-Beira',
    type: 'public',
    city: 'Beira',
    province: 'Sofala',
    departments: [
      'Curso de Ensino de Matemática',
      'Curso de Ensino de Português',
      'Curso de Ensino de Inglês',
      'Curso de Ensino de Geografia'
    ]
  },
  {
    id: 'isced_manica',
    name: 'Instituto Superior de Ciências de Educação de Manica',
    code: 'ISCED-Manica',
    type: 'public',
    city: 'Chimoio',
    province: 'Manica',
    departments: [
      'Curso de Ensino Primário',
      'Curso de Ensino de Línguas',
      'Curso de Educação Física',
      'Curso de Pedagogia'
    ]
  },
  {
    id: 'isced_tete',
    name: 'Instituto Superior de Ciências de Educação de Tete',
    code: 'ISCED-Tete',
    type: 'public',
    city: 'Tete',
    province: 'Tete',
    departments: [
      'Curso de Ensino de Matemática',
      'Curso de Ensino de Ciências',
      'Curso de Pedagogia'
    ]
  },
  {
    id: 'isced_quelimane',
    name: 'Instituto Superior de Ciências de Educação de Quelimane',
    code: 'ISCED-Quelimane',
    type: 'public',
    city: 'Quelimane',
    province: 'Zambézia',
    departments: [
      'Curso de Ensino de Ciências',
      'Curso de Ensino de Línguas',
      'Curso de Pedagogia',
      'Curso de Psicologia Educacional'
    ]
  },
  {
    id: 'isced_nampula',
    name: 'Instituto Superior de Ciências de Educação de Nampula',
    code: 'ISCED-Nampula',
    type: 'public',
    city: 'Nampula',
    province: 'Nampula',
    departments: [
      'Curso de Ensino de Matemática',
      'Curso de Ensino de Física',
      'Curso de Ensino de Biologia',
      'Curso de Ensino de História'
    ]
  },
  {
    id: 'isced_montepuez',
    name: 'Instituto Superior de Ciências de Educação de Montepuez',
    code: 'ISCED-Montepuez',
    type: 'public',
    city: 'Montepuez',
    province: 'Cabo Delgado',
    departments: [
      'Curso de Ensino de Ciências',
      'Curso de Ensino de Letras',
      'Curso de Educação Física'
    ]
  },
  {
    id: 'isced_niassa',
    name: 'Instituto Superior de Ciências de Educação do Niassa',
    code: 'ISCED-Niassa',
    type: 'public',
    city: 'Lichinga',
    province: 'Niassa',
    departments: [
      'Curso de Ensino Primário',
      'Curso de Ensino de Línguas',
      'Curso de Gestão Educacional'
    ]
  },

  // Universidades Privadas
  {
    id: 'ucm',
    name: 'Universidade Católica de Moçambique',
    code: 'UCM',
    type: 'private',
    city: 'Beira',
    province: 'Sofala',
    departments: [
      'Faculdade de Economia e Gestão',
      'Faculdade de Educação e Comunicação',
      'Faculdade de Ciências de Saúde',
      'Faculdade de Direito',
      'Faculdade de Engenharia'
    ]
  },
  {
    id: 'isctem',
    name: 'Instituto Superior de Ciências e Tecnologia de Moçambique',
    code: 'ISCTEM',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Faculdade de Ciências e Tecnologia',
      'Faculdade de Gestão de Empresas',
      'Faculdade de Ciências Jurídicas',
      'Faculdade de Arquitectura'
    ]
  },
  {
    id: 'iscim',
    name: 'Instituto Superior de Comunicação e Imagem de Moçambique',
    code: 'ISCIM',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Curso de Jornalismo',
      'Curso de Marketing',
      'Curso de Relações Públicas',
      'Curso de Design Gráfico'
    ]
  },
  {
    id: 'ustm',
    name: 'Universidade São Tomás de Moçambique',
    code: 'USTM',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Faculdade de Ciências Económicas e Empresariais',
      'Faculdade de Ciências Sociais',
      'Faculdade de Direito',
      'Faculdade de Educação'
    ]
  },
  {
    id: 'isutc',
    name: 'Instituto Superior de Transportes e Comunicações',
    code: 'ISUTC',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Departamento de Engenharia Civil',
      'Departamento de Engenharia Electrotécnica',
      'Departamento de Telecomunicações',
      'Departamento de Transportes'
    ]
  },
  {
    id: 'ispu',
    name: 'Instituto Superior Politécnico e Universitário',
    code: 'ISPU',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Faculdade de Engenharia',
      'Faculdade de Ciências Económicas',
      'Faculdade de Direito',
      'Faculdade de Arquitectura'
    ]
  },
  {
    id: 'ismm',
    name: 'Instituto Superior Monitor',
    code: 'ISM',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Curso de Informática',
      'Curso de Contabilidade e Auditoria',
      'Curso de Gestão de Empresas',
      'Curso de Marketing'
    ]
  },
  {
    id: 'umbb',
    name: 'Universidade Mussa Bin Bique',
    code: 'UMBB',
    type: 'private',
    city: 'Nampula',
    province: 'Nampula',
    departments: [
      'Faculdade de Ciências Jurídicas',
      'Faculdade de Economia e Gestão',
      'Faculdade de Educação',
      'Faculdade de Ciências de Saúde'
    ]
  },
  {
    id: 'isced',
    name: 'Instituto Superior de Ciências de Educação à Distância',
    code: 'ISCED',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Departamento de Ensino à Distância',
      'Departamento de Ciências da Educação',
      'Departamento de Línguas',
      'Departamento de Matemática'
    ]
  },
  {
    id: 'apolitecnica',
    name: 'A Politécnica',
    code: 'AP',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Faculdade de Ciências Sociais e Humanas',
      'Faculdade de Ciências e Tecnologia',
      'Faculdade de Engenharia',
      'Faculdade de Gestão'
    ]
  },
  {
    id: 'unilicungo',
    name: 'Universidade do Licungo',
    code: 'UniLicungo',
    type: 'private',
    city: 'Quelimane',
    province: 'Zambézia',
    departments: [
      'Faculdade de Ciências Económicas',
      'Faculdade de Direito',
      'Faculdade de Educação',
      'Faculdade de Ciências de Saúde'
    ]
  },
  {
    id: 'ispg',
    name: 'Instituto Superior Politécnico de Gaza',
    code: 'ISPG',
    type: 'private',
    city: 'Xai-Xai',
    province: 'Gaza',
    departments: [
      'Curso de Informática',
      'Curso de Contabilidade',
      'Curso de Gestão',
      'Curso de Secretariado'
    ]
  },
  {
    id: 'iscisa',
    name: 'Instituto Superior de Ciências de Saúde',
    code: 'ISCISA',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Curso de Medicina',
      'Curso de Enfermagem',
      'Curso de Farmácia',
      'Curso de Análises Clínicas'
    ]
  },
  {
    id: 'universitas',
    name: 'Universitas - Universidade Técnica de Moçambique',
    code: 'Universitas',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Faculdade de Engenharia',
      'Faculdade de Economia',
      'Faculdade de Direito',
      'Faculdade de Arquitectura'
    ]
  },
  {
    id: 'isctac',
    name: 'Instituto Superior de Ciências e Tecnologia Alberto Chipande',
    code: 'ISCTAC',
    type: 'private',
    city: 'Nampula',
    province: 'Nampula',
    departments: [
      'Faculdade de Ciências e Tecnologia',
      'Faculdade de Economia e Gestão',
      'Faculdade de Direito'
    ]
  },
  {
    id: 'ispbn',
    name: 'Instituto Superior Politécnico Beneficência de Nampula',
    code: 'ISPBN',
    type: 'private',
    city: 'Nampula',
    province: 'Nampula',
    departments: [
      'Curso de Informática',
      'Curso de Gestão',
      'Curso de Contabilidade'
    ]
  },
  {
    id: 'ispt',
    name: 'Instituto Superior Politécnico de Tete',
    code: 'ISPT',
    type: 'private',
    city: 'Tete',
    province: 'Tete',
    departments: [
      'Curso de Engenharia de Minas',
      'Curso de Geologia',
      'Curso de Gestão Ambiental'
    ]
  },
  {
    id: 'isputev',
    name: 'Instituto Superior Politécnico Universidade Técnica de Vilankulo',
    code: 'ISPUTEV',
    type: 'private',
    city: 'Vilankulo',
    province: 'Inhambane',
    departments: [
      'Curso de Turismo e Hotelaria',
      'Curso de Gestão',
      'Curso de Informática'
    ]
  },
  {
    id: 'iscisa_pemba',
    name: 'Instituto Superior de Ciências de Saúde de Pemba',
    code: 'ISCISA-Pemba',
    type: 'private',
    city: 'Pemba',
    province: 'Cabo Delgado',
    departments: [
      'Curso de Enfermagem',
      'Curso de Medicina',
      'Curso de Farmácia'
    ]
  },
  {
    id: 'ispg_chokwe',
    name: 'Instituto Superior Politécnico de Chókwè',
    code: 'ISP-Chókwè',
    type: 'private',
    city: 'Chókwè',
    province: 'Gaza',
    departments: [
      'Curso de Agronomia',
      'Curso de Veterinária',
      'Curso de Gestão Agrícola'
    ]
  },
  {
    id: 'esnec',
    name: 'Escola Superior de Negócios e Empreendedorismo de Chibuto',
    code: 'ESNEC',
    type: 'private',
    city: 'Chibuto',
    province: 'Gaza',
    departments: [
      'Curso de Gestão de Empresas',
      'Curso de Empreendedorismo',
      'Curso de Marketing'
    ]
  },
  {
    id: 'ispu_matola',
    name: 'Instituto Superior Politécnico e Universitário da Matola',
    code: 'ISPU-Matola',
    type: 'private',
    city: 'Matola',
    province: 'Maputo',
    departments: [
      'Curso de Engenharia Mecânica',
      'Curso de Engenharia Civil',
      'Curso de Arquitectura'
    ]
  },
  {
    id: 'umi',
    name: 'Universidade Metodista de Inhambane',
    code: 'UMI',
    type: 'private',
    city: 'Inhambane',
    province: 'Inhambane',
    departments: [
      'Faculdade de Teologia',
      'Faculdade de Educação',
      'Faculdade de Ciências Sociais'
    ]
  },
  {
    id: 'ispuma',
    name: 'Instituto Superior Politécnico Universitário de Manica',
    code: 'ISPUMA',
    type: 'private',
    city: 'Chimoio',
    province: 'Manica',
    departments: [
      'Curso de Engenharia',
      'Curso de Economia',
      'Curso de Direito'
    ]
  },
  {
    id: 'ispm',
    name: 'Instituto Superior de Gestão e Empreendedorismo Gwaza Muthini',
    code: 'ISGEGM',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Curso de Gestão de Empresas',
      'Curso de Recursos Humanos',
      'Curso de Marketing',
      'Curso de Finanças'
    ]
  },
  {
    id: 'ispol',
    name: 'Instituto Superior Politécnico Atlântico',
    code: 'ISPOL',
    type: 'private',
    city: 'Beira',
    province: 'Sofala',
    departments: [
      'Curso de Engenharia Informática',
      'Curso de Gestão de Empresas',
      'Curso de Contabilidade'
    ]
  },
  {
    id: 'ispmaxixe',
    name: 'Instituto Superior Politécnico de Maxixe',
    code: 'ISP-Maxixe',
    type: 'private',
    city: 'Maxixe',
    province: 'Inhambane',
    departments: [
      'Curso de Contabilidade',
      'Curso de Gestão',
      'Curso de Marketing'
    ]
  },
  {
    id: 'ispemba',
    name: 'Instituto Superior Politécnico de Pemba',
    code: 'ISP-Pemba',
    type: 'private',
    city: 'Pemba',
    province: 'Cabo Delgado',
    departments: [
      'Curso de Gestão Petrolífera',
      'Curso de Geologia',
      'Curso de Engenharia'
    ]
  },
  {
    id: 'isptl',
    name: 'Instituto Superior Politécnico de Lichinga',
    code: 'ISP-Lichinga',
    type: 'private',
    city: 'Lichinga',
    province: 'Niassa',
    departments: [
      'Curso de Informática',
      'Curso de Gestão',
      'Curso de Contabilidade'
    ]
  },
  {
    id: 'ispt_mocuba',
    name: 'Instituto Superior Politécnico de Mocuba',
    code: 'ISP-Mocuba',
    type: 'private',
    city: 'Mocuba',
    province: 'Zambézia',
    departments: [
      'Curso de Agronomia',
      'Curso de Gestão',
      'Curso de Contabilidade'
    ]
  },
  {
    id: 'ies',
    name: 'Instituto de Educação Superior',
    code: 'IES',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Curso de Gestão',
      'Curso de Contabilidade',
      'Curso de Recursos Humanos'
    ]
  },
  {
    id: 'iscjs',
    name: 'Instituto Superior de Ciências Jurídicas e Sociais',
    code: 'ISCJS',
    type: 'private',
    city: 'Maputo',
    province: 'Maputo Cidade',
    departments: [
      'Curso de Direito',
      'Curso de Relações Públicas',
      'Curso de Ciências Sociais'
    ]
  }
];

// Helper functions
export function getInstitutionsByProvince(province: string): Institution[] {
  return mozambiqueInstitutions.filter(inst => inst.province === province);
}

export function getInstitutionsByType(type: 'public' | 'private'): Institution[] {
  return mozambiqueInstitutions.filter(inst => inst.type === type);
}

export function getInstitutionById(id: string): Institution | undefined {
  return mozambiqueInstitutions.find(inst => inst.id === id);
}

export const mozambiqueProvinces = [
  'Maputo Cidade',
  'Maputo',
  'Gaza',
  'Inhambane',
  'Sofala',
  'Manica',
  'Tete',
  'Zambézia',
  'Nampula',
  'Cabo Delgado',
  'Niassa'
];
