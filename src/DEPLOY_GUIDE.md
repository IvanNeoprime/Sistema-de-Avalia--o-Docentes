# 🚀 Guia de Deploy - Sistema de Avaliação Docente

## Preparação para Produção

Este documento contém todas as instruções para fazer o deploy do sistema em ambiente de produção.

---

## ✅ Checklist Pré-Deploy

Antes de fazer o deploy, certifique-se de:

- [ ] Resetar a base de dados (remover usuários de teste)
- [ ] Verificar configurações do Supabase
- [ ] Testar login e cadastro
- [ ] Verificar endpoints da API
- [ ] Validar dados das instituições
- [ ] Configurar domínio personalizado (opcional)
- [ ] Configurar backup automático
- [ ] Definir políticas de segurança

---

## 🗄️ Passo 1: Reset da Base de Dados

### Método 1: Usando a Interface (Recomendado)

1. **Faça login como gestor** no sistema atual
2. **Acesse o componente DatabaseReset** (disponível para gestores)
3. **Clique em "Atualizar"** para ver estatísticas atuais
4. **Clique em "Resetar Base de Dados"**
5. **Confirme a ação** no diálogo de confirmação
6. **Aguarde** a conclusão do processo

### Método 2: Via API Direta

Se preferir usar a API diretamente:

```bash
curl -X POST "https://[PROJECT_ID].supabase.co/functions/v1/make-server-9e435140/reset-database" \
  -H "Authorization: Bearer [ANON_KEY]" \
  -H "Content-Type: application/json" \
  -d '{"confirm":"RESET_ALL_DATA"}'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Database reset complete...",
  "deleted": {
    "users": 5,
    "responses": 12,
    "questionnaires": 3,
    "trackers": 8
  }
}
```

### O que é deletado:
- ✅ Todos os usuários de teste
- ✅ Todas as respostas de avaliação
- ✅ Todos os questionários
- ✅ Todos os trackers de conclusão
- ✅ Dados de autenticação do Supabase

### O que é preservado:
- ✅ 42 Instituições de ensino superior
- ✅ Configurações do sistema
- ✅ Estrutura da base de dados

---

## 🔐 Passo 2: Configuração do Supabase

### 2.1 Variáveis de Ambiente

Certifique-se que as seguintes variáveis estão configuradas:

```env
SUPABASE_URL=https://[PROJECT_ID].supabase.co
SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR_SERVICE_ROLE_KEY]
SUPABASE_DB_URL=[YOUR_DB_CONNECTION_STRING]
```

### 2.2 Políticas de Segurança (RLS)

O sistema usa Key-Value Store, mas é importante revisar:

1. **Acesse o Supabase Dashboard**
2. **Vá para Database > Tables**
3. **Selecione a tabela `kv_store_9e435140`**
4. **Verifique as políticas RLS**

### 2.3 Autenticação

Configure as opções de autenticação:

1. **Acesse Authentication > Settings**
2. **Configure:**
   - ✅ Email confirmation: Disabled (ou configure SMTP)
   - ✅ Email confirmations: Auto-confirm users
   - ✅ Password requirements: Mínimo 6 caracteres
   - ✅ Session timeout: 24 horas

### 2.4 SMTP (Opcional para Produção)

Para habilitar emails de recuperação de senha:

1. **Acesse Authentication > Email Templates**
2. **Configure SMTP provider** (SendGrid, Mailgun, etc.)
3. **Personalize templates** de email
4. **Teste envio** de email de recuperação

---

## 🌐 Passo 3: Deploy da Aplicação

### 3.1 Figma Make (Deploy Automático)

O sistema já está rodando no Figma Make. Para deploy:

1. **Projeto está pronto** - sem necessidade de build
2. **Sistema já deployado** automaticamente
3. **URL pública** já disponível

### 3.2 Deploy em Plataforma Externa (Opcional)

Se quiser fazer deploy em outra plataforma:

#### Vercel:
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel deploy --prod
```

#### Netlify:
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Docker:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔧 Passo 4: Configurações Pós-Deploy

### 4.1 Criar Primeiro Usuário Gestor

Após o reset, crie um gestor administrativo:

1. **Acesse a página de cadastro**
2. **Preencha os dados:**
   - Nome: Nome do Gestor Principal
   - Email: admin@instituicao.ac.mz
   - Tipo de usuário: **Gestor Institucional**
   - Província: Selecione a província
   - Instituição: Selecione a instituição principal
   - Senha: Crie uma senha forte (mínimo 6 caracteres)

3. **Faça login** com as credenciais criadas
4. **Verifique o dashboard** de gestor

### 4.2 Configurar Instituições Adicionais

Se necessário criar instituições customizadas:

1. **Login como gestor**
2. **Acesse "Gestão Institucional"**
3. **Clique em "Adicionar Instituição"**
4. **Preencha:**
   - Nome completo
   - Código/Sigla
   - Departamentos
   - Localização

### 4.3 Convidar Docentes e Estudantes

Instrua os usuários a:

1. **Acessar a página de cadastro**
2. **Selecionar tipo de usuário:**
   - Estudante ou Docente
3. **Selecionar instituição** (entre as 42 disponíveis)
4. **Criar conta** com email institucional (recomendado)

---

## 📊 Passo 5: Monitoramento

### 5.1 Verificar Estatísticas

Endpoint público para monitorar:

```bash
curl "https://[PROJECT_ID].supabase.co/functions/v1/make-server-9e435140/database-stats" \
  -H "Authorization: Bearer [ANON_KEY]"
```

**Resposta:**
```json
{
  "users": 0,
  "responses": 0,
  "questionnaires": 0,
  "institutions": 42
}
```

### 5.2 Logs do Servidor

Monitorar logs no Supabase:

1. **Acesse Edge Functions**
2. **Selecione `make-server-9e435140`**
3. **Visualize logs em tempo real**
4. **Configure alertas** para erros

### 5.3 Dashboard de Analytics

Como gestor, monitore:

- Total de usuários cadastrados
- Questionários ativos
- Taxa de resposta
- Distribuição por instituição

---

## 🔒 Passo 6: Segurança

### 6.1 Práticas Recomendadas

- ✅ **Nunca** compartilhe `SUPABASE_SERVICE_ROLE_KEY`
- ✅ Use **HTTPS** sempre (já configurado)
- ✅ Configure **rate limiting** no Supabase
- ✅ Ative **2FA** para contas de gestor
- ✅ Faça **backup regular** dos dados

### 6.2 Políticas de Senha

Recomendações para usuários:

- Mínimo 8 caracteres (sistema aceita 6)
- Combinação de letras e números
- Não compartilhar credenciais
- Trocar senha periodicamente

### 6.3 Anonimato das Respostas

Garantias do sistema:

- ✅ Respostas armazenadas com **hash aleatório**
- ✅ **Nenhuma** associação user_id ↔ resposta
- ✅ Apenas tracker de conclusão (separado)
- ✅ Impossível rastrear quem respondeu

---

## 🔄 Passo 7: Backup e Recuperação

### 7.1 Backup Automático (Supabase)

Supabase faz backup automático diário. Para configurar:

1. **Acesse Project Settings > Database**
2. **Verifique Backup Schedule**
3. **Configure retenção** (7, 14, 30 dias)

### 7.2 Backup Manual

Exportar dados via SQL:

```sql
-- Exportar usuários
SELECT * FROM kv_store_9e435140 
WHERE key LIKE 'user_%';

-- Exportar instituições
SELECT * FROM kv_store_9e435140 
WHERE key LIKE 'institution_%';

-- Exportar questionários
SELECT * FROM kv_store_9e435140 
WHERE key LIKE 'questionnaire_%';
```

### 7.3 Restauração

Para restaurar após problemas:

1. **Acesse Supabase Dashboard**
2. **Database > Backups**
3. **Selecione backup** desejado
4. **Clique em "Restore"**

---

## 📈 Passo 8: Escalabilidade

### 8.1 Limites Atuais

**Plano Free do Supabase:**
- 500 MB de database storage
- 1 GB de file storage
- 50 MB de edge functions
- 2 GB de bandwidth/mês

### 8.2 Quando Fazer Upgrade?

Considere upgrade quando:

- Mais de 1000 usuários ativos
- Mais de 10.000 respostas/mês
- Storage > 400 MB
- Bandwidth consistentemente alto

### 8.3 Planos Supabase

- **Free:** $0/mês
- **Pro:** $25/mês (8 GB database, 100 GB bandwidth)
- **Team:** $599/mês (uso empresarial)

---

## 🧪 Passo 9: Testes Pós-Deploy

### 9.1 Teste de Cadastro

- [ ] Criar estudante
- [ ] Criar docente
- [ ] Criar gestor
- [ ] Verificar emails diferentes
- [ ] Testar todas as 42 instituições

### 9.2 Teste de Autenticação

- [ ] Login com credenciais corretas
- [ ] Login com senha errada
- [ ] Recuperação de senha
- [ ] Logout
- [ ] Sessão expirada

### 9.3 Teste de Funcionalidades

**Estudante:**
- [ ] Ver questionários disponíveis
- [ ] Responder questionário
- [ ] Verificar que não pode responder 2x
- [ ] Ver histórico

**Docente:**
- [ ] Criar questionário
- [ ] Editar perguntas
- [ ] Ver resultados
- [ ] Ver analytics

**Gestor:**
- [ ] Ver dashboard completo
- [ ] Ver todos os questionários
- [ ] Ver estatísticas institucionais
- [ ] Gerenciar instituição

---

## 🐛 Passo 10: Troubleshooting

### Problema: Usuários não conseguem fazer login

**Solução:**
1. Verificar se email foi confirmado
2. Verificar senha (mínimo 6 caracteres)
3. Checar logs do Supabase Auth
4. Resetar senha via "Esqueci a senha"

### Problema: Questionários não aparecem

**Solução:**
1. Verificar se questionário está ativo
2. Verificar se instituição corresponde
3. Verificar prazo (deadline)
4. Checar logs do servidor

### Problema: Respostas não são salvas

**Solução:**
1. Verificar conexão com servidor
2. Checar se usuário já respondeu
3. Verificar logs de erro no console
4. Validar estrutura das respostas

### Problema: Estatísticas não atualizam

**Solução:**
1. Forçar refresh da página
2. Verificar cache do browser
3. Checar endpoint /analytics
4. Verificar permissões (apenas gestor)

---

## 📚 Recursos Adicionais

### Documentação do Sistema

- [README.md](./README.md) - Visão geral
- [CHANGELOG.md](./CHANGELOG.md) - Histórico de mudanças
- [GUIA_COMPLETO.md](./GUIA_COMPLETO.md) - Manual completo
- [INSTITUICOES_MOCAMBIQUE.md](./INSTITUICOES_MOCAMBIQUE.md) - Lista de instituições
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Documentação da API

### Documentação Externa

- [Supabase Docs](https://supabase.com/docs)
- [Hono Framework](https://hono.dev)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📞 Suporte

### Contatos

Para questões técnicas:
- Documentação do sistema (arquivos .md)
- Supabase Support: support@supabase.com
- Community: GitHub Issues

### Logs e Debug

Sempre inclua ao reportar problemas:
1. Logs do browser console
2. Logs do Supabase Edge Functions
3. Passos para reproduzir
4. Screenshots se relevante

---

## ✅ Checklist Final de Deploy

Antes de considerar o deploy completo:

- [ ] Base de dados resetada
- [ ] Variáveis de ambiente configuradas
- [ ] SMTP configurado (ou auto-confirm ativo)
- [ ] Primeiro gestor criado
- [ ] Testes de cadastro realizados
- [ ] Testes de login realizados
- [ ] Testes de questionário realizados
- [ ] Backup configurado
- [ ] Monitoramento ativo
- [ ] Documentação revisada
- [ ] Usuários instruídos sobre acesso

---

## 🎉 Sistema Pronto!

Após completar todos os passos, seu sistema está pronto para uso em produção com:

- ✅ **42 instituições** de ensino superior de Moçambique
- ✅ **Base de dados limpa** sem dados de teste
- ✅ **Sistema de avaliação** completamente anônimo
- ✅ **3 tipos de usuários** (estudante, docente, gestor)
- ✅ **Dashboards específicos** para cada perfil
- ✅ **Analytics e relatórios** inteligentes
- ✅ **Interface moderna** e responsiva
- ✅ **Segurança robusta** com Supabase

**Boa sorte com seu deploy! 🚀**

---

**Última Atualização:** Outubro 2025  
**Versão do Sistema:** 2.0  
**Status:** Pronto para Produção ✅
