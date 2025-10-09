# Sistema de Avaliação de Docentes Multi-Institucional

## 📋 Visão Geral

Sistema completo para avaliação anônima de docentes em instituições de ensino superior moçambicanas. Desenvolvido com Next.js, TypeScript, Tailwind CSS, shadcn/ui e Supabase.

## ✨ Características Principais

### 🔒 Anonimato Total Garantido
- **Separação de identidade**: Respostas armazenadas com hash aleatório, sem associação ao usuário
- **Tracker independente**: Sistema separado apenas para evitar duplicação
- **Conformidade com privacidade**: Nenhum dado pessoal vinculado às avaliações

### 👥 Três Tipos de Usuários

#### 📚 Estudante
- Visualiza questionários disponíveis
- Responde avaliações anonimamente
- Sistema impede respostas duplicadas
- Interface intuitiva e mobile-first

#### 👨‍🏫 Docente
- Cria questionários personalizados
- Define perguntas abertas, escalas (1-5) ou múltipla escolha
- Visualiza resultados agregados
- Exporta relatórios (em desenvolvimento)

#### 🏛️ Gestor Institucional
- Analytics completo da instituição
- Visualiza todos os questionários
- Acesso a estatísticas agregadas
- Gerenciamento de instituições

## 🗄️ Base de Dados

### Instituições Pré-cadastradas

**Universidades Públicas:**
- Universidade Eduardo Mondlane (UEM) - Maputo
- Universidade Pedagógica (UP) - Maputo
- Universidade Zambeze (UniZambeze) - Beira
- Universidade Lúrio (UniLúrio) - Nampula
- Universidade Zumbe (UniZulu) - Quelimane
- Universidade do Rovuma (UniRovuma) - Montepuez
- ISRI - Maputo

**Universidades Privadas:**
- Universidade Católica de Moçambique (UCM)
- ISCTEM
- ISCIM
- USTM
- ISUTC
- ISPU
- ISM
- UMBB
- ISCED
- A Politécnica
- UniLicungo
- ISPG
- E muitas outras...

## 🚀 Como Usar

### 1. Criar Conta

1. Acesse a aplicação
2. Clique em "Criar conta"
3. Preencha:
   - Nome completo
   - Email institucional (ex: nome@universidade.ac.mz)
   - Tipo de usuário (Estudante, Docente ou Gestor)
   - Província e Instituição
   - Senha (mínimo 6 caracteres)
4. Confirme a senha
5. Clique em "Criar conta"

### 2. Fazer Login

1. Digite seu email e senha
2. Clique em "Entrar"

**Problemas com login?**
- Se você esqueceu a senha, clique em "Esqueceu a senha?"
- Se a conta já existe, use recuperação de senha
- Se o erro persistir, crie uma conta com email diferente

### 3. Recuperar Senha

1. Na tela de login, clique em "Esqueceu a senha?"
2. Digite seu email
3. Clique em "Enviar Email de Recuperação"
4. Verifique sua caixa de entrada
5. Siga as instruções no email

## 📝 Funcionalidades por Perfil

### Para Estudantes

1. **Ver Questionários Disponíveis**
   - Dashboard mostra todos os questionários ativos
   - Indicação de pendentes vs concluídos
   - Prazo de resposta visível

2. **Responder Avaliações**
   - Clique em "Responder"
   - Complete todas as perguntas
   - Tipos de resposta:
     - **Escala 1-5**: Selecione de Péssimo a Excelente
     - **Múltipla escolha**: Escolha uma opção
     - **Resposta aberta**: Digite sua resposta
   - Clique em "Enviar Avaliação Anônima"

3. **Garantia de Anonimato**
   - Aviso visível em todas as telas
   - Sua identidade nunca é revelada
   - Respostas não podem ser rastreadas

### Para Docentes

1. **Criar Questionário**
   - Clique em "Criar Questionário"
   - Preencha título e descrição
   - Defina prazo de resposta
   - Adicione perguntas:
     - Escala (1-5)
     - Múltipla escolha (defina opções)
     - Resposta aberta
   - Clique em "Criar Questionário"

2. **Visualizar Resultados**
   - Clique em "Ver Resultados" no questionário
   - Veja estatísticas agregadas:
     - Total de respostas
     - Frequência de escolhas (escalas e múltipla escolha)
     - Respostas abertas anônimas
   - Análise gráfica (em desenvolvimento)

### Para Gestores

1. **Dashboard Institucional**
   - Métricas em tempo real:
     - Total de questionários
     - Questionários ativos
     - Total de respostas
     - Estudantes e docentes cadastrados

2. **Gerenciar Instituições**
   - Clique em "Gerir Instituições"
   - Visualize todas as instituições
   - Filtre por província ou tipo
   - Adicione novas instituições

3. **Analytics**
   - Visão macro da instituição
   - Comparativos entre departamentos
   - Relatórios exportáveis (em desenvolvimento)

## 🔐 Arquitetura de Segurança

### Sistema de Anonimato

```
┌─────────────┐         ┌──────────────┐
│   Usuário   │────────▶│   Resposta   │
│  (user_id)  │         │ (hash_UUID)  │
└─────────────┘         └──────────────┘
      │                        │
      │                        │ SEM LIGAÇÃO
      │                        │
      ▼                        ▼
┌─────────────┐         ┌──────────────┐
│   Tracker   │         │   Respostas  │
│ (evita dup) │         │  (anônimas)  │
└─────────────┘         └──────────────┘
```

### Separação de Dados

1. **Tabela de Usuários**: Armazena perfis e identidades
2. **Tabela de Respostas**: Armazena respostas com hash aleatório (SEM userId)
3. **Tabela de Trackers**: Apenas marca se usuário respondeu (separada das respostas)

## 🛠️ Tecnologias

- **Frontend**: React + TypeScript
- **Estilização**: Tailwind CSS v4
- **Componentes**: shadcn/ui
- **Backend**: Supabase (Auth + Edge Functions + KV Store)
- **Servidor**: Hono (Edge Runtime)
- **Icons**: Lucide React

## 📱 Design

- **Mobile-first**: Totalmente responsivo
- **Paleta minimalista**: Branco, preto, cinzas
- **Tipografia**: Inter
- **Acessibilidade**: WCAG 2.1 AA

## 🐛 Resolução de Problemas

### "Email já registrado"
- Use a opção "Esqueceu a senha?" para recuperar acesso
- Ou crie conta com email diferente

### "Credenciais inválidas"
- Verifique se email e senha estão corretos
- Tente recuperar senha
- Certifique-se de que a conta foi criada

### Não consigo ver questionários (Estudante)
- Verifique se sua instituição está correta no perfil
- Aguarde docentes criarem questionários
- Atualize a página

### Não consigo ver resultados (Docente)
- Aguarde pelo menos uma resposta
- Verifique se o questionário está ativo
- Atualize a página

## 📊 Status do Projeto

### ✅ Implementado
- [x] Sistema de autenticação completo
- [x] Login, logout e recuperação de senha
- [x] Três dashboards funcionais
- [x] Criação de questionários
- [x] Resposta anônima de questionários
- [x] Visualização de resultados agregados
- [x] Base de dados de instituições moçambicanas
- [x] Analytics para gestores
- [x] Sistema de anonimato garantido
- [x] Design responsivo

### 🚧 Em Desenvolvimento
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Gráficos avançados com recharts
- [ ] Sistema de notificações
- [ ] Dashboard administrativo avançado
- [ ] Filtros e pesquisa avançada

## 🤝 Suporte

Para problemas ou dúvidas:
1. Verifique este guia
2. Use a função "Esqueceu a senha?" para problemas de login
3. Crie uma nova conta com email diferente se necessário

## 📄 Licença

Sistema desenvolvido para uso educacional e institucional.

---

**Desenvolvido para melhorar a qualidade de ensino em Moçambique através de feedback construtivo e anônimo** 🇲🇿