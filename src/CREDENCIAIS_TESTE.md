# 🔑 Credenciais de Teste - Sistema de Avaliação Docente

## 📝 Instruções Gerais

Este documento contém as credenciais de teste para experimentar o sistema. Siga a ordem recomendada para testar todas as funcionalidades.

---

## 👤 1. Gestor Institucional

**Função:** Administrar a plataforma, criar instituições e visualizar analytics

```
Email: gestor@uem.ac.mz
Senha: manager123
Tipo: Gestor Institucional
Instituição: Universidade Eduardo Mondlane (UEM)
```

### O que testar como Gestor:
- ✅ Visualizar dashboard com estatísticas gerais
- ✅ Criar novas instituições
- ✅ Adicionar departamentos
- ✅ Visualizar todos os questionários da instituição
- ✅ Ver métricas de engajamento
- ✅ Acessar resultados de questionários

---

## 👨‍🏫 2. Docente

**Função:** Criar questionários e visualizar resultados agregados

```
Email: docente@uem.ac.mz
Senha: teacher123
Tipo: Docente
Instituição: Universidade Eduardo Mondlane (UEM)
```

### O que testar como Docente:
- ✅ Criar novo questionário
- ✅ Adicionar perguntas de diferentes tipos:
  - Escala (1-5)
  - Múltipla escolha
  - Resposta aberta
- ✅ Definir prazo para respostas
- ✅ Visualizar questionários criados
- ✅ Ver resultados em gráficos
- ✅ Analisar estatísticas agregadas

---

## 🎓 3. Estudante

**Função:** Responder questionários de forma anônima

```
Email: estudante@uem.ac.mz
Senha: student123
Tipo: Estudante
Instituição: Universidade Eduardo Mondlane (UEM)
```

### O que testar como Estudante:
- ✅ Ver questionários disponíveis
- ✅ Responder questionários anonimamente
- ✅ Visualizar questionários já respondidos
- ✅ Confirmar que não pode responder duas vezes
- ✅ Ver aviso de anonimato total

---

## 🔄 Fluxo de Teste Recomendado

### Passo 1: Login como Gestor
1. Faça login com as credenciais de gestor
2. Explore o dashboard de analytics
3. Veja as instituições cadastradas
4. (Opcional) Crie uma nova instituição

### Passo 2: Sair e Login como Docente
1. Faça logout
2. Faça login com as credenciais de docente
3. Clique em "Criar Questionário"
4. Preencha:
   - **Título:** "Avaliação de Metodologias - 2025"
   - **Descrição:** "Avaliar a qualidade do ensino e metodologias pedagógicas"
   - **Prazo:** Escolha uma data futura
5. Adicione pelo menos 3 perguntas:
   - 1 pergunta de escala
   - 1 pergunta de múltipla escolha (com 3-4 opções)
   - 1 pergunta aberta
6. Salve o questionário

### Passo 3: Sair e Login como Estudante
1. Faça logout
2. Faça login com as credenciais de estudante
3. Veja o questionário criado na lista de "Pendentes"
4. Clique em "Responder"
5. Leia o aviso de anonimato
6. Responda todas as perguntas
7. Envie a avaliação
8. Confirme que o questionário agora aparece como "Concluído"
9. Tente responder novamente (deve aparecer erro)

### Passo 4: Voltar como Docente para Ver Resultados
1. Faça logout
2. Faça login novamente como docente
3. Clique em "Ver Resultados" no questionário
4. Analise:
   - Número total de respostas
   - Gráficos de barras para perguntas de escala e múltipla escolha
   - Respostas anônimas para perguntas abertas
   - Média de avaliação
5. Confirme que não há nenhuma identificação do estudante

### Passo 5: Verificar Analytics como Gestor
1. Faça logout
2. Faça login como gestor
3. Veja as métricas atualizadas:
   - Total de questionários
   - Total de respostas
   - Taxa de resposta
   - Engajamento de estudantes e docentes

---

## 🎨 Criar Novos Usuários

Você pode criar novos usuários para testar com diferentes instituições:

### Template de Registro:

```
Nome: [Seu Nome]
Email: [nome]@[instituicao].ac.mz
Senha: [mínimo 6 caracteres]
Tipo: [Estudante/Docente/Gestor]
Província: [Escolha uma das 11 províncias]
Instituição: [Escolha da lista filtrada]
```

### Exemplos de Emails por Instituição:

**Universidade Católica (UCM - Beira):**
- gestor@ucm.ac.mz
- docente@ucm.ac.mz
- estudante@ucm.ac.mz

**Universidade Lúrio (Nampula):**
- gestor@unilurio.ac.mz
- docente@unilurio.ac.mz
- estudante@unilurio.ac.mz

**Instituto Superior Politécnico e Universitário (ISPU - Maputo):**
- gestor@ispu.ac.mz
- docente@ispu.ac.mz
- estudante@ispu.ac.mz

---

## 🔐 Recuperação de Senha

Para testar a funcionalidade de recuperação de senha:

1. Na tela de login, clique em "Esqueceu a senha?"
2. Digite o email cadastrado
3. **Nota:** Como não há servidor de email configurado, a senha será resetada automaticamente para "reset123"
4. Use a nova senha para fazer login

---

## 🛡️ Segurança e Anonimato

### Como o sistema garante anonimato:

1. **Separação de Identidade:**
   - As respostas são armazenadas com um hash aleatório
   - Não há conexão entre userId e resposta

2. **Tracker Separado:**
   - Um registro separado rastreia se o usuário já respondeu
   - Este tracker não é acessível aos docentes
   - Serve apenas para prevenir respostas duplicadas

3. **Dados Agregados:**
   - Docentes veem apenas estatísticas agregadas
   - Não há acesso a respostas individuais identificáveis
   - Mesmo respostas abertas são mostradas como "Resposta Anônima #X"

---

## 📱 Testar Responsividade

O sistema é mobile-first. Teste em:

- 📱 Mobile (375px - 767px)
- 📱 Tablet (768px - 1023px)
- 💻 Desktop (1024px+)

### Features Responsivas:
- Menu adaptativo
- Cards reorganizam em grid
- Tabelas com scroll horizontal em mobile
- Botões com tamanho touch-friendly

---

## 🆘 Problemas Comuns

### "Email já registrado"
- Use outro email ou faça login com o existente

### "Instituição não encontrada"
- Certifique-se de selecionar a província primeiro
- As instituições são filtradas por província

### "Não consigo ver questionários"
- Certifique-se de que está logado como estudante
- Verifique se há questionários criados na sua instituição
- Questionários só aparecem para estudantes da mesma instituição

### "Erro ao enviar resposta"
- Verifique se respondeu todas as perguntas
- Confirme que não respondeu este questionário antes

---

## 📊 Dados de Demonstração

Para uma experiência completa, recomendamos:

1. Criar **pelo menos 3 estudantes** diferentes
2. Fazer todos responderem o mesmo questionário
3. Isso permite ver gráficos e estatísticas mais representativas
4. Métricas de engajamento ficam mais interessantes com mais dados

---

## ✅ Checklist de Testes

Use esta lista para garantir que testou todas as funcionalidades:

### Autenticação
- [ ] Login de gestor
- [ ] Login de docente
- [ ] Login de estudante
- [ ] Logout
- [ ] Criar nova conta
- [ ] Recuperação de senha

### Gestor
- [ ] Ver dashboard de analytics
- [ ] Visualizar lista de instituições
- [ ] Criar nova instituição
- [ ] Ver questionários da instituição
- [ ] Ver resultados de questionários

### Docente
- [ ] Criar questionário
- [ ] Adicionar perguntas de escala
- [ ] Adicionar perguntas de múltipla escolha
- [ ] Adicionar perguntas abertas
- [ ] Definir prazo
- [ ] Visualizar questionários criados
- [ ] Ver resultados com gráficos
- [ ] Ver estatísticas agregadas

### Estudante
- [ ] Ver questionários disponíveis
- [ ] Responder questionário
- [ ] Ver aviso de anonimato
- [ ] Confirmar resposta enviada
- [ ] Ver questionário como concluído
- [ ] Tentar responder novamente (deve falhar)

### Geral
- [ ] Interface responsiva em mobile
- [ ] Interface responsiva em tablet
- [ ] Interface responsiva em desktop
- [ ] Sistema de notificações (toast)
- [ ] Navegação entre páginas
- [ ] Performance geral do sistema

---

**Última Atualização:** Outubro 2025  
**Versão do Sistema:** 2.0
