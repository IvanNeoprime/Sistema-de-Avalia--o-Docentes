# ⚡ Quick Start - Deploy em 5 Minutos

Se você tem pressa e quer fazer o deploy rapidamente, siga estes passos:

---

## 🚀 Passo a Passo Rápido

### 1️⃣ Reset da Base de Dados (2 minutos)

**Opção A - Via Interface:**
1. Faça login como gestor no sistema atual
2. Clique em "Reset Base de Dados"
3. Confirme a ação
4. Aguarde conclusão

**Opção B - Via API:**
```bash
curl -X POST "https://[PROJECT_ID].supabase.co/functions/v1/make-server-9e435140/reset-database" \
  -H "Authorization: Bearer [ANON_KEY]" \
  -H "Content-Type: application/json" \
  -d '{"confirm":"RESET_ALL_DATA"}'
```

### 2️⃣ Verificar Reset (30 segundos)

```bash
curl "https://[PROJECT_ID].supabase.co/functions/v1/make-server-9e435140/database-stats" \
  -H "Authorization: Bearer [ANON_KEY]"
```

**Deve retornar:**
```json
{
  "users": 0,
  "responses": 0,
  "questionnaires": 0,
  "institutions": 42
}
```

### 3️⃣ Criar Primeiro Gestor (2 minutos)

1. Acesse a página de cadastro
2. Preencha:
   - **Nome:** Seu nome completo
   - **Email:** seu.email@instituicao.ac.mz
   - **Tipo:** Gestor Institucional
   - **Província:** Selecione
   - **Instituição:** Escolha entre as 42
   - **Senha:** Mínimo 6 caracteres (use senha forte!)
3. Clique em "Criar conta"

### 4️⃣ Testar Login (30 segundos)

1. Faça login com as credenciais criadas
2. Verifique que o dashboard de gestor aparece
3. Veja as estatísticas (devem estar zeradas)

### 5️⃣ Pronto! 🎉

Sistema está rodando em produção!

---

## ✅ Verificação Rápida

Teste estas funcionalidades:

- [ ] Login/Logout funciona
- [ ] Dashboard de gestor carrega
- [ ] Estatísticas mostram 0 usuários
- [ ] 42 instituições disponíveis
- [ ] Pode criar novo usuário estudante
- [ ] Pode criar novo usuário docente

---

## 📚 Próximos Passos

Depois de fazer o deploy básico:

1. **Leia a documentação completa:** [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)
2. **Configure SMTP** (opcional): Para recuperação de senha automática
3. **Crie mais gestores:** Se houver múltiplas instituições
4. **Comunique usuários:** Envie link e instruções
5. **Configure monitoramento:** Alertas no Supabase
6. **Configure backup:** Verifique retenção de dados

---

## 🆘 Problemas?

### Reset não funciona
- Verifique que está usando as credenciais corretas
- Verifique que o endpoint está correto
- Consulte logs no Supabase Dashboard

### Não consigo criar gestor
- Verifique que o reset foi executado
- Limpe cache do navegador
- Tente em modo anônimo/incógnito

### Dashboard não carrega
- Verifique conexão com internet
- Abra console do navegador (F12)
- Veja se há erros JavaScript
- Consulte logs do servidor

### Mais ajuda?
Consulte: [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) seção "Troubleshooting"

---

## 📞 Checklist Final

Antes de considerar deploy completo:

- [ ] Reset executado com sucesso
- [ ] Estatísticas confirmam 0 usuários
- [ ] Primeiro gestor criado
- [ ] Login/logout testado
- [ ] Dashboard funcional
- [ ] Instituições disponíveis (42)

---

## 🎯 Métricas de Sucesso

Após 1 semana de produção, verifique:

- **Usuários cadastrados:** Crescendo?
- **Questionários criados:** Docentes ativos?
- **Taxa de resposta:** Estudantes participando?
- **Erros no sistema:** Nenhum ou poucos?
- **Performance:** Tempo de resposta OK?

---

## 📊 Comandos Úteis

### Ver estatísticas
```bash
curl "https://[PROJECT_ID].supabase.co/functions/v1/make-server-9e435140/database-stats" \
  -H "Authorization: Bearer [ANON_KEY]"
```

### Resetar (CUIDADO!)
```bash
curl -X POST "https://[PROJECT_ID].supabase.co/functions/v1/make-server-9e435140/reset-database" \
  -H "Authorization: Bearer [ANON_KEY]" \
  -H "Content-Type: application/json" \
  -d '{"confirm":"RESET_ALL_DATA"}'
```

---

## 🌟 Dicas Pro

1. **Use emails institucionais** - Mais profissional
2. **Senhas fortes** - Especialmente para gestores
3. **Monitore logs** - Primeiros dias são críticos
4. **Comunique claramente** - Instrua usuários sobre cadastro
5. **Backup antes de mudanças** - Sempre

---

## ✨ Recursos Avançados

Depois do deploy básico, explore:

- **Analytics detalhado** - Dashboard de gestor
- **Gestão de instituições** - Criar/editar instituições
- **Exportação de relatórios** - Resultados em formato exportável
- **Filtros avançados** - Por período, curso, departamento
- **Customização** - Ajustar perguntas dos questionários

---

**⏱️ Tempo total: ~5 minutos**  
**📊 Complexidade: Baixa**  
**🎯 Resultado: Sistema em produção**

---

**Para documentação completa, veja:**
- 📘 [RESUMO_DEPLOY.md](./RESUMO_DEPLOY.md) - Resumo executivo
- 📗 [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) - Guia completo
- 📙 [PRODUCTION_STATUS.md](./PRODUCTION_STATUS.md) - Status detalhado

**Última atualização:** Outubro 2025  
**Versão:** 2.1
