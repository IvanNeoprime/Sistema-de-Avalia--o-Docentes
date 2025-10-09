# Sistema de Avaliação de Docentes Multi-Institucional

Plataforma web moderna desenvolvida para instituições de ensino superior moçambicanas, permitindo aos estudantes avaliarem seus docentes de forma completamente anônima.

## 🚀 Status de Produção

✅ **PRONTO PARA DEPLOY**  
📊 **42 Instituições** de ensino superior cadastradas  
🗄️ **Base de dados limpa** - Sem dados de teste  
📚 **Documentação completa** - Guias de deploy e uso

### 📖 Documentação de Deploy

🎯 **[RESUMO_DEPLOY.md](./RESUMO_DEPLOY.md)** - **COMECE AQUI!** Resumo executivo  
📘 **[DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)** - Guia completo passo a passo  
📊 **[PRODUCTION_STATUS.md](./PRODUCTION_STATUS.md)** - Status e checklist  
✅ **[VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md)** - Verificação final

## 🎯 Características Principais

### 🔒 Anonimato Total
- Respostas completamente anônimas e desassociadas da identidade do estudante
- Separação total entre dados de autenticação e respostas
- Apenas estatísticas agregadas são visíveis para docentes e gestores

### 👥 Três Níveis de Acesso

#### 📚 Estudante
- Visualizar questionários disponíveis
- Responder avaliações anonimamente
- Acompanhar avaliações pendentes e concluídas
- Garantia visual de anonimato

#### 👨‍🏫 Docente
- Criar questionários personalizados
- Perguntas abertas, escalas (1-5) e múltipla escolha
- Visualizar resultados agregados e estatísticas
- Gráficos e análises detalhadas
- Exportação de relatórios

#### 👨‍💼 Gestor Institucional
- Gerenciar instituições e departamentos
- Visualizar métricas consolidadas
- Monitorar taxas de participação
- Analytics em tempo real

## 🚀 Como Usar

### 1. Criar Contas de Teste

Para testar o sistema completo, crie três contas diferentes:

**Gestor** (criar primeiro):
- Email: gestor@uem.ac.mz
- Senha: manager123
- Tipo: Gestor Institucional

**Docente**:
- Email: docente@uem.ac.mz
- Senha: teacher123
- Tipo: Docente

**Estudante**:
- Email: estudante@uem.ac.mz
- Senha: student123
- Tipo: Estudante

### 2. Fluxo de Uso Recomendado

1. **Como Gestor:**
   - Fazer login com conta de gestor
   - Criar uma instituição (ex: "Universidade Eduardo Mondlane", código "UEM")
   - Adicionar departamentos (ex: Engenharia, Ciências, Letras)

2. **Como Docente:**
   - Fazer login com conta de docente
   - Criar um questionário de avaliação
   - Definir título, descrição e prazo
   - Adicionar perguntas (escalas, abertas, múltipla escolha)
   - Publicar questionário

3. **Como Estudante:**
   - Fazer login com conta de estudante
   - Visualizar questionários disponíveis
   - Responder de forma anônima
   - Ver confirmação de envio anônimo

4. **Como Docente (Resultados):**
   - Voltar ao dashboard de docente
   - Clicar em "Ver Resultados" no questionário
   - Analisar estatísticas agregadas
   - Ver gráficos e médias
   - Ler feedback qualitativo (sem identificação)

5. **Como Gestor (Analytics):**
   - Acessar dashboard de gestor
   - Visualizar métricas de participação
   - Monitorar engajamento
   - Ver todos os questionários da instituição

## 🏗️ Arquitetura Técnica

### Frontend
- **React** com TypeScript
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes
- **Recharts** para gráficos
- **Lucide React** para ícones

### Backend
- **Supabase** (Auth, Database)
- **Hono** web server em Edge Functions
- **Key-Value Store** para dados estruturados

### Segurança
- Autenticação via Supabase Auth
- Separação total entre usuário e respostas
- Hashing anônimo para respostas
- CORS configurado
- Tokens JWT para autorização

## 📊 Tipos de Perguntas

### Escala (1-5)
Perfeito para avaliações quantitativas:
- 1 = Péssimo
- 5 = Excelente

### Múltipla Escolha
Opções predefinidas para respostas objetivas

### Resposta Aberta
Feedback qualitativo e sugestões detalhadas

## 🎨 Design

### Paleta de Cores
- Branco (#FFFFFF) - Fundo principal
- Preto (#000000) - Texto primário
- Cinzas (#F5F5F5, #E5E5E5, #9CA3AF) - Elementos secundários

### Responsividade
- Mobile-first (otimizado para Android)
- Breakpoints: 320px, 768px, 1024px
- Touch-friendly UI

## 🔐 Privacidade e Anonimato

### Como Funciona

1. **Autenticação Separada:** Login identifica o usuário apenas para controle de acesso
2. **Tracker Separado:** Sistema marca questionário como "respondido" sem vincular à resposta
3. **Hash Anônimo:** Respostas armazenadas com UUID aleatório
4. **Sem Identificação:** Zero conexão entre identidade do usuário e conteúdo da resposta
5. **Agregação:** Docentes veem apenas estatísticas consolidadas

## 📱 Mobile-First

Sistema otimizado para dispositivos móveis:
- Carregamento rápido (< 2s)
- Interface touch-friendly
- Funciona em conexões 3G
- Adaptado para telas pequenas

## 🚧 Limitações Conhecidas

- Exportação PDF está preparada mas requer implementação adicional
- Sistema de notificações por email requer configuração SMTP
- Backups automáticos usam o sistema Supabase padrão

## 📈 Métricas de Sucesso

O sistema rastreia:
- Taxa de participação dos estudantes
- Número de questionários criados
- Respostas totais recebidas
- Engajamento por instituição
- Média de respostas por questionário

## 🛠️ Desenvolvimento Futuro

### Fase 2 (Planejada)
- Notificações por email
- Templates de questionários
- Exportação avançada (PDF/Excel)
- Comparativos temporais

### Fase 3 (Planejada)
- Integração com sistemas acadêmicos
- Benchmarking entre instituições
- Recursos de acessibilidade avançados
- Aplicativo móvel nativo

## 📞 Suporte

Para questões sobre o sistema:
1. Verifique as credenciais de teste no canto inferior direito
2. Certifique-se de criar contas com os emails exatos
3. Teste o fluxo completo: Gestor → Docente → Estudante → Resultados

---

**Desenvolvido com foco em anonimato, usabilidade e impacto educacional positivo para Moçambique 🇲🇿**
