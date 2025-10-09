# API Documentation - Sistema de Avaliação Docente

## Base URL
```
https://{projectId}.supabase.co/functions/v1/make-server-9e435140
```

## Authentication
Todas as rotas protegidas requerem o header:
```
Authorization: Bearer {access_token}
```

## Endpoints

### 1. Authentication

#### POST /signup
Cria novo usuário no sistema.

**Request Body:**
```json
{
  "email": "usuario@universidade.ac.mz",
  "password": "senha123",
  "name": "Nome Completo",
  "role": "student | teacher | manager",
  "institutionId": "uem",
  "departmentId": "optional"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "usuario@universidade.ac.mz",
    "name": "Nome Completo",
    "role": "student"
  }
}
```

#### GET /user
Obtém perfil do usuário atual.

**Headers:** Requer Authorization

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "name": "Nome",
    "email": "email@example.com",
    "role": "student",
    "institutionId": "uem",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Institutions

#### POST /institutions/init
Inicializa base de dados de instituições (manager only).

**Headers:** Requer Authorization

**Request Body:**
```json
{
  "institutions": [
    {
      "id": "uem",
      "name": "Universidade Eduardo Mondlane",
      "code": "UEM",
      "type": "public",
      "city": "Maputo",
      "province": "Maputo Cidade",
      "departments": ["Faculdade X", "Faculdade Y"]
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "count": 20
}
```

#### GET /institutions
Lista todas as instituições.

**Headers:** Requer Authorization

**Response:**
```json
{
  "institutions": [
    {
      "id": "uem",
      "name": "Universidade Eduardo Mondlane",
      "code": "UEM",
      "departments": ["..."]
    }
  ]
}
```

#### POST /institution/create
Cria nova instituição (manager only).

**Headers:** Requer Authorization

**Request Body:**
```json
{
  "name": "Nova Universidade",
  "code": "NU",
  "departments": ["Dept 1", "Dept 2"]
}
```

### 3. Questionnaires

#### POST /questionnaire/create
Cria novo questionário (teacher only).

**Headers:** Requer Authorization

**Request Body:**
```json
{
  "title": "Avaliação Semestre 1",
  "description": "Descrição do questionário",
  "questions": [
    {
      "type": "scale",
      "text": "Como avalia a clareza do docente?"
    },
    {
      "type": "multiple-choice",
      "text": "Material adequado?",
      "options": ["Sim", "Não", "Parcialmente"]
    },
    {
      "type": "open",
      "text": "Sugestões de melhoria?"
    }
  ],
  "deadline": "2024-12-31T23:59:59.000Z",
  "courseId": "course-id",
  "institutionId": "uem"
}
```

**Response:**
```json
{
  "success": true,
  "questionnaireId": "uuid"
}
```

#### GET /questionnaires
Lista questionários do usuário.

**Headers:** Requer Authorization

**Comportamento por role:**
- **Student**: Questionários da instituição (com status de conclusão)
- **Teacher**: Questionários criados pelo docente
- **Manager**: Todos da instituição

**Response:**
```json
{
  "questionnaires": [
    {
      "id": "uuid",
      "title": "Avaliação",
      "description": "...",
      "questions": [...],
      "deadline": "2024-12-31T23:59:59.000Z",
      "status": "active",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /questionnaire/:id/respond
Submete resposta anônima (student only).

**Headers:** Requer Authorization

**Request Body:**
```json
{
  "answers": [
    5,
    "Opção escolhida",
    "Resposta aberta aqui..."
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Response submitted anonymously"
}
```

**Importante:** 
- Resposta é armazenada com hash UUID aleatório
- Nenhuma informação de usuário é vinculada à resposta
- Tracker separado impede respostas duplicadas

#### GET /questionnaire/:id/results
Obtém resultados agregados (teacher/manager only).

**Headers:** Requer Authorization

**Response:**
```json
{
  "questionnaire": {
    "id": "uuid",
    "title": "Avaliação",
    "questions": [...]
  },
  "results": {
    "totalResponses": 25,
    "questions": [
      {
        "type": "scale",
        "text": "Pergunta",
        "responses": {
          "1": 2,
          "2": 3,
          "3": 5,
          "4": 8,
          "5": 7
        }
      },
      {
        "type": "open",
        "text": "Pergunta",
        "responses": [
          "Resposta anônima 1",
          "Resposta anônima 2"
        ]
      }
    ]
  }
}
```

### 4. Analytics

#### GET /analytics
Estatísticas institucionais (manager only).

**Headers:** Requer Authorization

**Response:**
```json
{
  "stats": {
    "totalQuestionnaires": 15,
    "activeQuestionnaires": 8,
    "totalResponses": 250,
    "totalStudents": 50,
    "totalTeachers": 10
  }
}
```

#### POST /demo/init
Inicializa dados de demonstração.

**Headers:** Requer Authorization

**Response:**
```json
{
  "success": true,
  "message": "Demo data initialized",
  "questionnaireId": "demo-questionnaire-001"
}
```

## Data Models

### User
```typescript
{
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'manager';
  institutionId?: string;
  departmentId?: string;
  createdAt: string;
}
```

### Institution
```typescript
{
  id: string;
  name: string;
  code: string;
  type: 'public' | 'private';
  city: string;
  province: string;
  departments: string[];
  createdAt: string;
  createdBy: string;
}
```

### Questionnaire
```typescript
{
  id: string;
  title: string;
  description: string;
  questions: Question[];
  deadline: string;
  courseId: string;
  institutionId: string;
  createdBy: string;
  createdAt: string;
  status: 'active' | 'closed';
}
```

### Question
```typescript
{
  type: 'open' | 'scale' | 'multiple-choice';
  text: string;
  options?: string[]; // Only for multiple-choice
}
```

### Response (Anonymous)
```typescript
{
  questionnaireId: string;
  answers: any[];
  timestamp: string;
  // NO userId - ensures anonymity
}
```

### Tracker (Separate from Response)
```typescript
{
  // Key: tracker_{userId}_{questionnaireId}
  completed: boolean;
  completedAt: string;
}
```

## Error Handling

### Common Error Responses

**401 Unauthorized:**
```json
{
  "error": "Unauthorized"
}
```

**403 Forbidden:**
```json
{
  "error": "Only teachers can create questionnaires"
}
```

**400 Bad Request:**
```json
{
  "error": "Missing required fields"
}
```

**404 Not Found:**
```json
{
  "error": "Questionnaire not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error creating questionnaire"
}
```

## Security & Privacy

### Anonymity System
1. **Response Storage**: Responses stored with random UUID hash
2. **No User Link**: No userId in response data
3. **Separate Tracking**: Duplicate prevention uses separate table
4. **Aggregated Results**: Only statistics shown to teachers

### Authentication
- Uses Supabase Auth with JWT tokens
- Tokens expire based on Supabase configuration
- Email confirmation auto-enabled (no email server required)

### Authorization
- Role-based access control
- Server validates user permissions
- Institution-scoped data access

## Rate Limiting
Currently no rate limiting implemented. Consider adding in production.

## Webhooks
Not implemented. Future enhancement.

## Changelog

### v1.0.0 (Current)
- ✅ Complete authentication system
- ✅ Three user roles with specific permissions
- ✅ Anonymous questionnaire responses
- ✅ Aggregated results viewing
- ✅ Institution management
- ✅ Analytics for managers
- ✅ Mozambique institutions database

### Planned Features
- Export functionality (PDF/Excel)
- Advanced filtering
- Email notifications
- Batch operations
- Advanced analytics with charts