# ✅ Checklist de Verificação - Sistema Pronto para Deploy

Use este checklist antes de fazer deploy em produção.

---

## 🗄️ Base de Dados

- [ ] **Reset executado** - Base de dados limpa de usuários de teste
- [ ] **Estatísticas verificadas** - 0 usuários, 0 respostas, 0 questionários
- [ ] **Instituições preservadas** - 42 instituições presentes
- [ ] **Endpoint de stats respondendo** - `/database-stats` funcional

**Como verificar:**
```bash
curl "https://[PROJECT_ID].supabase.co/functions/v1/make-server-9e435140/database-stats" \
  -H "Authorization: Bearer [ANON_KEY]"
```

**Resposta esperada:**
```json
{
  "users": 0,
  "responses": 0,
  "questionnaires": 0,
  "institutions": 42
}
```

---

## 🔐 Configuração do Supabase

- [ ] **Variáveis de ambiente** - Todas configuradas
  - [ ] SUPABASE_URL
  - [ ] SUPABASE_ANON_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
  - [ ] SUPABASE_DB_URL

- [ ] **Edge Functions deployadas** - make-server-9e435140 ativo
- [ ] **Logs acessíveis** - Dashboard do Supabase
- [ ] **KV Store funcionando** - Tabela criada e acessível

**Como verificar:**
1. Acesse o Supabase Dashboard
2. Vá para Edge Functions
3. Verifique que `make-server-9e435140` está deployado
4. Teste um endpoint qualquer

---

## 🔑 Autenticação

- [ ] **Email confirmation** - Auto-confirm ativo ou SMTP configurado
- [ ] **Password policy** - Mínimo 6 caracteres
- [ ] **Session timeout** - Configurado (recomendado: 24h)
- [ ] **Signup habilitado** - Novos usuários podem se cadastrar

**Como verificar:**
1. Acesse Authentication > Settings
2. Verifique configurações de email
3. Teste criar uma conta nova
4. Teste fazer login

---

## 📝 Testes de Funcionalidades

### Cadastro
- [ ] **Estudante** - Consegue criar conta
- [ ] **Docente** - Consegue criar conta
- [ ] **Gestor** - Consegue criar conta
- [ ] **Seleção de instituição** - 3 métodos funcionando
  - [ ] Por província
  - [ ] Busca
  - [ ] Ver todas
- [ ] **Validações** - Campos obrigatórios funcionando
- [ ] **Confirmação visual** - Card verde aparece

### Login
- [ ] **Credenciais corretas** - Login funciona
- [ ] **Senha errada** - Erro apropriado
- [ ] **Email inexistente** - Erro apropriado
- [ ] **Session mantida** - Refresh mantém login
- [ ] **Logout** - Funciona corretamente

### Recuperação de Senha
- [ ] **Formulário acessível** - Link "Esqueci a senha" visível
- [ ] **Validação de email** - Aceita apenas emails válidos
- [ ] **Feedback** - Mensagem de confirmação aparece
- [ ] **SMTP ou auto-reset** - Sistema configurado

### Dashboards
- [ ] **Estudante** - Dashboard carrega corretamente
  - [ ] Ver questionários disponíveis
  - [ ] Responder questionário
  - [ ] Ver histórico
  
- [ ] **Docente** - Dashboard carrega corretamente
  - [ ] Criar questionário
  - [ ] Ver questionários criados
  - [ ] Ver resultados
  
- [ ] **Gestor** - Dashboard carrega corretamente
  - [ ] Ver analytics
  - [ ] Gerir instituições
  - [ ] Acesso ao reset da base de dados

### Questionários
- [ ] **Criação** - Docente consegue criar
- [ ] **Tipos de pergunta** - Scale, multiple-choice, open
- [ ] **Preview** - Visualização antes de publicar
- [ ] **Deadline** - Data limite funciona
- [ ] **Status** - Ativo/Inativo

### Respostas
- [ ] **Anonimato** - Sem rastreamento de usuário
- [ ] **Prevenção duplicata** - Não pode responder 2x
- [ ] **Validação** - Todas perguntas obrigatórias
- [ ] **Confirmação** - Mensagem de sucesso
- [ ] **Tracker** - Sistema de conclusão separado

### Resultados
- [ ] **Agregação** - Resultados consolidados
- [ ] **Estatísticas** - Médias e frequências corretas
- [ ] **Gráficos** - Visualização funcional
- [ ] **Filtros** - Por período, curso, etc.
- [ ] **Sem identificação** - Impossível rastrear indivíduo

---

## 🔒 Segurança

- [ ] **HTTPS** - Forçado (automático no Supabase)
- [ ] **JWT validation** - Tokens verificados
- [ ] **Authorization** - Roles respeitados
- [ ] **CORS** - Configurado corretamente
- [ ] **Rate limiting** - Considerar ativar
- [ ] **Service Role Key** - Não exposta no frontend
- [ ] **SQL Injection** - Protegido (KV Store)
- [ ] **XSS** - React protege automaticamente

**Como verificar:**
1. Tente acessar endpoints protegidos sem token
2. Tente acessar como role errado
3. Verifique que SERVICE_ROLE_KEY não está no código frontend
4. Teste inputs com caracteres especiais

---

## 📱 Interface e UX

### Responsividade
- [ ] **Desktop** - Layout correto (>1024px)
- [ ] **Tablet** - Layout adaptado (768-1024px)
- [ ] **Mobile** - Layout mobile (< 768px)
- [ ] **Orientação** - Portrait e landscape

### Navegação
- [ ] **Links funcionando** - Todos os botões clicáveis
- [ ] **Voltar** - Navegação backwards
- [ ] **Breadcrumbs** - Onde aplicável
- [ ] **Estados** - Loading, error, empty, success

### Formulários
- [ ] **Validação inline** - Feedback imediato
- [ ] **Mensagens de erro** - Claras e úteis
- [ ] **Estados de loading** - Botões com spinner
- [ ] **Auto-focus** - Primeiro campo focado
- [ ] **Enter submete** - Teclado funcional

### Acessibilidade
- [ ] **Labels** - Todos inputs têm labels
- [ ] **Contraste** - Texto legível
- [ ] **Foco visível** - Outline ao navegar com tab
- [ ] **Aria labels** - Onde necessário
- [ ] **Navegação por teclado** - Funcional

---

## 📊 Performance

- [ ] **Tempo de carregamento** - < 3 segundos
- [ ] **Bundle size** - Otimizado
- [ ] **Lazy loading** - Componentes grandes
- [ ] **Caching** - Headers configurados
- [ ] **Images** - Otimizadas (se houver)

**Como verificar:**
1. Abra DevTools > Network
2. Recarregue página
3. Verifique tempo total
4. Verifique tamanho dos assets

---

## 📚 Documentação

- [ ] **README.md** - Atualizado com status de produção
- [ ] **DEPLOY_GUIDE.md** - Guia completo disponível
- [ ] **PRODUCTION_STATUS.md** - Status verificado
- [ ] **CHANGELOG.md** - Versão 2.1 documentada
- [ ] **API_DOCUMENTATION.md** - Endpoints documentados
- [ ] **GUIA_COMPLETO.md** - Manual do usuário
- [ ] **INSTITUICOES_MOCAMBIQUE.md** - Lista das 42 instituições
- [ ] **GUIA_SELECAO_INSTITUICAO.md** - Como escolher instituição

**Como verificar:**
1. Abra cada arquivo .md
2. Verifique que informações estão corretas
3. Teste links internos
4. Verifique formatação

---

## 🔧 Configurações Opcionais

### SMTP (Recomendado para produção)
- [ ] **Provider escolhido** - SendGrid, Mailgun, etc.
- [ ] **Credenciais configuradas** - No Supabase
- [ ] **Templates customizados** - Emails personalizados
- [ ] **Teste enviado** - Email de teste recebido

### Domínio Personalizado
- [ ] **DNS configurado** - Apontando para Supabase/Vercel
- [ ] **SSL ativo** - Certificado válido
- [ ] **Redirect HTTP→HTTPS** - Configurado

### Backup
- [ ] **Backup automático** - Ativo no Supabase
- [ ] **Retenção definida** - 7, 14 ou 30 dias
- [ ] **Teste de restore** - Backup funciona

### Monitoramento
- [ ] **Alertas configurados** - Para erros críticos
- [ ] **Dashboard analytics** - Métricas visíveis
- [ ] **Logs centralizados** - Fácil acesso

---

## 🧪 Cenários de Teste Completos

### Cenário 1: Novo Estudante
1. [ ] Acessa página de cadastro
2. [ ] Seleciona tipo "Estudante"
3. [ ] Escolhe província
4. [ ] Seleciona instituição
5. [ ] Preenche dados
6. [ ] Cria conta com sucesso
7. [ ] Faz login
8. [ ] Vê dashboard de estudante
9. [ ] Vê questionários disponíveis
10. [ ] Responde um questionário
11. [ ] Não consegue responder novamente
12. [ ] Faz logout

### Cenário 2: Novo Docente
1. [ ] Acessa página de cadastro
2. [ ] Seleciona tipo "Docente"
3. [ ] Escolhe instituição (usando busca)
4. [ ] Cria conta
5. [ ] Faz login
6. [ ] Vê dashboard de docente
7. [ ] Cria novo questionário
8. [ ] Adiciona 3 tipos de perguntas
9. [ ] Define deadline
10. [ ] Publica questionário
11. [ ] Aguarda respostas (ou cria estudante para responder)
12. [ ] Visualiza resultados
13. [ ] Vê analytics

### Cenário 3: Novo Gestor
1. [ ] Acessa página de cadastro
2. [ ] Seleciona tipo "Gestor Institucional"
3. [ ] Escolhe instituição (ver todas)
4. [ ] Cria conta
5. [ ] Faz login
6. [ ] Vê dashboard completo
7. [ ] Visualiza estatísticas institucionais
8. [ ] Acessa gestão de instituições
9. [ ] Cria nova instituição (teste)
10. [ ] Acessa reset da base de dados
11. [ ] Visualiza estatísticas antes do reset
12. [ ] (NÃO executar reset neste teste)

### Cenário 4: Anonimato
1. [ ] Estudante responde questionário
2. [ ] Docente vê resultados
3. [ ] Verifica que não há identificação do estudante
4. [ ] Verifica que apenas dados agregados aparecem
5. [ ] Tenta acessar dados brutos (deve falhar)
6. [ ] Confirma impossibilidade de rastreamento

---

## 🎯 Critérios de Aprovação

### Obrigatórios (Bloqueadores)
- ✅ Base de dados resetada (0 usuários de teste)
- ✅ 42 instituições cadastradas
- ✅ Cadastro funcionando para 3 tipos de usuário
- ✅ Login/Logout funcional
- ✅ Anonimato das respostas garantido
- ✅ Dashboards carregando corretamente
- ✅ Questionários podem ser criados e respondidos
- ✅ Sem erros no console em uso normal

### Recomendados (Não-bloqueadores)
- ⚠️ SMTP configurado
- ⚠️ Domínio personalizado
- ⚠️ Rate limiting ativo
- ⚠️ Backup testado
- ⚠️ Monitoramento com alertas

---

## 📋 Assinatura de Aprovação

Após completar todos os itens obrigatórios:

**Data de Verificação:** _______________

**Verificado por:** _______________

**Aprovado para Deploy:** [ ] SIM  [ ] NÃO

**Observações:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## 🚀 Deploy Final

Quando todos os critérios obrigatórios estiverem ✅:

1. **Fazer backup final** dos dados atuais (se houver)
2. **Executar reset** da base de dados
3. **Criar gestor principal** com credenciais seguras
4. **Verificar** que sistema está acessível
5. **Comunicar usuários** sobre disponibilidade
6. **Monitorar** primeiros acessos

---

**Última Atualização:** Outubro 2025  
**Versão do Checklist:** 2.1  
**Sistema:** Avaliação de Docentes Multi-Institucional
