import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', logger(console.log));
app.use('*', cors());

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Helper to generate anonymous hash
function generateAnonymousHash(): string {
  return crypto.randomUUID();
}

// Helper to get authenticated user
async function getAuthenticatedUser(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return null;
  }
  
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) {
    return null;
  }
  
  return user;
}

// Signup endpoint
app.post('/make-server-9e435140/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, role, institutionId, departmentId } = body;

    if (!email || !password || !name || !role) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Error creating user during signup: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Store additional user data
    const userId = data.user!.id;
    await kv.set(`user_${userId}`, {
      id: userId,
      name,
      email,
      role, // 'student', 'teacher', 'manager'
      institutionId: institutionId || null,
      departmentId: departmentId || null,
      createdAt: new Date().toISOString(),
    });

    return c.json({ 
      success: true, 
      user: { id: userId, email, name, role } 
    });
  } catch (error) {
    console.log(`Error during signup: ${error}`);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Get current user profile
app.get('/make-server-9e435140/user', async (c) => {
  try {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user_${user.id}`);
    if (!userData) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    return c.json({ user: userData });
  } catch (error) {
    console.log(`Error getting user profile: ${error}`);
    return c.json({ error: 'Internal server error getting user' }, 500);
  }
});

// Create institution (manager only)
app.post('/make-server-9e435140/institution/create', async (c) => {
  try {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user_${user.id}`);
    if (!userData || userData.role !== 'manager') {
      return c.json({ error: 'Only managers can create institutions' }, 403);
    }

    const body = await c.req.json();
    const { name, code, departments } = body;

    const institutionId = crypto.randomUUID();
    await kv.set(`institution_${institutionId}`, {
      id: institutionId,
      name,
      code,
      departments: departments || [],
      createdAt: new Date().toISOString(),
      createdBy: user.id,
    });

    return c.json({ success: true, institutionId });
  } catch (error) {
    console.log(`Error creating institution: ${error}`);
    return c.json({ error: 'Internal server error creating institution' }, 500);
  }
});

// Initialize institutions data
app.post('/make-server-9e435140/institutions/init', async (c) => {
  try {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user_${user.id}`);
    if (!userData || userData.role !== 'manager') {
      return c.json({ error: 'Only managers can initialize institutions' }, 403);
    }

    const body = await c.req.json();
    const { institutions } = body;

    // Store each institution
    for (const inst of institutions) {
      const existing = await kv.get(`institution_${inst.id}`);
      if (!existing) {
        await kv.set(`institution_${inst.id}`, {
          ...inst,
          createdAt: new Date().toISOString(),
          createdBy: user.id,
        });
      }
    }

    return c.json({ success: true, count: institutions.length });
  } catch (error) {
    console.log(`Error initializing institutions: ${error}`);
    return c.json({ error: 'Internal server error initializing institutions' }, 500);
  }
});

// Get all institutions
app.get('/make-server-9e435140/institutions', async (c) => {
  try {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const institutions = await kv.getByPrefix('institution_');
    return c.json({ institutions });
  } catch (error) {
    console.log(`Error getting institutions: ${error}`);
    return c.json({ error: 'Internal server error getting institutions' }, 500);
  }
});

// Create questionnaire (teacher only)
app.post('/make-server-9e435140/questionnaire/create', async (c) => {
  try {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user_${user.id}`);
    if (!userData || userData.role !== 'teacher') {
      return c.json({ error: 'Only teachers can create questionnaires' }, 403);
    }

    const body = await c.req.json();
    const { title, description, questions, deadline, courseId, institutionId } = body;

    const questionnaireId = crypto.randomUUID();
    await kv.set(`questionnaire_${questionnaireId}`, {
      id: questionnaireId,
      title,
      description,
      questions, // Array of { type, text, options }
      deadline,
      courseId,
      institutionId: institutionId || userData.institutionId,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      status: 'active',
    });

    return c.json({ success: true, questionnaireId });
  } catch (error) {
    console.log(`Error creating questionnaire: ${error}`);
    return c.json({ error: 'Internal server error creating questionnaire' }, 500);
  }
});

// Get questionnaires for current user
app.get('/make-server-9e435140/questionnaires', async (c) => {
  try {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user_${user.id}`);
    const allQuestionnaires = await kv.getByPrefix('questionnaire_');

    let questionnaires = [];
    
    if (userData.role === 'teacher') {
      // Teachers see their own questionnaires
      questionnaires = allQuestionnaires.filter(q => q.createdBy === user.id);
    } else if (userData.role === 'student') {
      // Students see questionnaires from their institution
      questionnaires = allQuestionnaires.filter(q => 
        q.institutionId === userData.institutionId && 
        q.status === 'active'
      );
      
      // Add completion status for each questionnaire
      for (const q of questionnaires) {
        const tracker = await kv.get(`tracker_${user.id}_${q.id}`);
        q.completed = !!tracker;
      }
    } else if (userData.role === 'manager') {
      // Managers see all questionnaires in their institution
      questionnaires = allQuestionnaires.filter(q => 
        q.institutionId === userData.institutionId
      );
    }

    return c.json({ questionnaires });
  } catch (error) {
    console.log(`Error getting questionnaires: ${error}`);
    return c.json({ error: 'Internal server error getting questionnaires' }, 500);
  }
});

// Submit anonymous response (student only)
app.post('/make-server-9e435140/questionnaire/:id/respond', async (c) => {
  try {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user_${user.id}`);
    if (!userData || userData.role !== 'student') {
      return c.json({ error: 'Only students can submit responses' }, 403);
    }

    const questionnaireId = c.req.param('id');
    const body = await c.req.json();
    const { answers } = body;

    // Check if already responded
    const tracker = await kv.get(`tracker_${user.id}_${questionnaireId}`);
    if (tracker) {
      return c.json({ error: 'You have already responded to this questionnaire' }, 400);
    }

    // Store anonymous response with random hash (no user association)
    const responseHash = generateAnonymousHash();
    await kv.set(`response_${responseHash}`, {
      questionnaireId,
      answers,
      timestamp: new Date().toISOString(),
      // NO userId stored here - ensures complete anonymity
    });

    // Store tracker to prevent duplicate submissions (separate from response)
    await kv.set(`tracker_${user.id}_${questionnaireId}`, {
      completed: true,
      completedAt: new Date().toISOString(),
    });

    return c.json({ 
      success: true, 
      message: 'Response submitted anonymously' 
    });
  } catch (error) {
    console.log(`Error submitting response: ${error}`);
    return c.json({ error: 'Internal server error submitting response' }, 500);
  }
});

// Get questionnaire results (teacher/manager only)
app.get('/make-server-9e435140/questionnaire/:id/results', async (c) => {
  try {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user_${user.id}`);
    if (!userData || (userData.role !== 'teacher' && userData.role !== 'manager')) {
      return c.json({ error: 'Only teachers and managers can view results' }, 403);
    }

    const questionnaireId = c.req.param('id');
    const questionnaire = await kv.get(`questionnaire_${questionnaireId}`);
    
    if (!questionnaire) {
      return c.json({ error: 'Questionnaire not found' }, 404);
    }

    // Verify permission
    if (userData.role === 'teacher' && questionnaire.createdBy !== user.id) {
      return c.json({ error: 'You can only view results for your own questionnaires' }, 403);
    }

    // Get all anonymous responses for this questionnaire
    const allResponses = await kv.getByPrefix('response_');
    const responses = allResponses.filter(r => r.questionnaireId === questionnaireId);

    // Aggregate results
    const aggregated = {
      totalResponses: responses.length,
      questions: questionnaire.questions.map((q, index) => {
        const questionResponses = responses.map(r => r.answers[index]);
        
        if (q.type === 'scale' || q.type === 'multiple-choice') {
          // Count frequency
          const frequency = {};
          questionResponses.forEach(answer => {
            frequency[answer] = (frequency[answer] || 0) + 1;
          });
          return { ...q, responses: frequency };
        } else {
          // Open-ended responses
          return { ...q, responses: questionResponses };
        }
      }),
    };

    return c.json({ questionnaire, results: aggregated });
  } catch (error) {
    console.log(`Error getting results: ${error}`);
    return c.json({ error: 'Internal server error getting results' }, 500);
  }
});

// Create demo data endpoint
app.post('/make-server-9e435140/demo/init', async (c) => {
  try {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Create demo questionnaire for teachers
    const demoQuestionnaireId = 'demo-questionnaire-001';
    const existingQuestionnaire = await kv.get(`questionnaire_${demoQuestionnaireId}`);
    
    if (!existingQuestionnaire) {
      await kv.set(`questionnaire_${demoQuestionnaireId}`, {
        id: demoQuestionnaireId,
        title: 'Avaliação de Desempenho Docente - Semestre 1',
        description: 'Questionário para avaliar a qualidade de ensino e metodologias pedagógicas',
        questions: [
          {
            type: 'scale',
            text: 'Como avalia a clareza das explicações do docente?'
          },
          {
            type: 'scale',
            text: 'O docente demonstra domínio do conteúdo da disciplina?'
          },
          {
            type: 'scale',
            text: 'Como avalia a disponibilidade do docente para esclarecer dúvidas?'
          },
          {
            type: 'multiple-choice',
            text: 'O material didático fornecido é adequado?',
            options: ['Muito adequado', 'Adequado', 'Pouco adequado', 'Inadequado']
          },
          {
            type: 'open',
            text: 'Que sugestões tem para melhorar as aulas?'
          }
        ],
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        courseId: 'demo-course',
        institutionId: user.institutionId || 'uem',
        createdBy: user.id,
        createdAt: new Date().toISOString(),
        status: 'active',
      });
    }

    return c.json({ 
      success: true, 
      message: 'Demo data initialized',
      questionnaireId: demoQuestionnaireId
    });
  } catch (error) {
    console.log(`Error initializing demo data: ${error}`);
    return c.json({ error: 'Internal server error initializing demo data' }, 500);
  }
});

// Get analytics/stats (manager only)
app.get('/make-server-9e435140/analytics', async (c) => {
  try {
    const user = await getAuthenticatedUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user_${user.id}`);
    if (!userData || userData.role !== 'manager') {
      return c.json({ error: 'Only managers can view analytics' }, 403);
    }

    const allQuestionnaires = await kv.getByPrefix('questionnaire_');
    const allResponses = await kv.getByPrefix('response_');
    const allUsers = await kv.getByPrefix('user_');

    // Filter by institution
    const institutionQuestionnaires = allQuestionnaires.filter(
      q => q.institutionId === userData.institutionId
    );

    const institutionUsers = allUsers.filter(
      u => u.institutionId === userData.institutionId
    );

    const stats = {
      totalQuestionnaires: institutionQuestionnaires.length,
      activeQuestionnaires: institutionQuestionnaires.filter(q => q.status === 'active').length,
      totalResponses: allResponses.filter(r => 
        institutionQuestionnaires.some(q => q.id === r.questionnaireId)
      ).length,
      totalStudents: institutionUsers.filter(u => u.role === 'student').length,
      totalTeachers: institutionUsers.filter(u => u.role === 'teacher').length,
    };

    return c.json({ stats });
  } catch (error) {
    console.log(`Error getting analytics: ${error}`);
    return c.json({ error: 'Internal server error getting analytics' }, 500);
  }
});

// Get database statistics (public endpoint for monitoring)
app.get('/make-server-9e435140/database-stats', async (c) => {
  try {
    const allUsers = await kv.getByPrefix('user_');
    const allResponses = await kv.getByPrefix('response_');
    const allQuestionnaires = await kv.getByPrefix('questionnaire_');
    const allInstitutions = await kv.getByPrefix('institution_');

    return c.json({
      users: allUsers.length,
      responses: allResponses.length,
      questionnaires: allQuestionnaires.length,
      institutions: allInstitutions.length,
    });
  } catch (error) {
    console.log(`Error getting database stats: ${error}`);
    return c.json({ error: 'Internal server error getting stats' }, 500);
  }
});

// Reset database endpoint (DANGEROUS - use only for initial deployment)
app.post('/make-server-9e435140/reset-database', async (c) => {
  try {
    const body = await c.req.json();
    
    // Require confirmation
    if (body.confirm !== 'RESET_ALL_DATA') {
      return c.json({ error: 'Confirmation required. Send { confirm: "RESET_ALL_DATA" }' }, 400);
    }

    // Delete all users (except institutions)
    const allUsers = await kv.getByPrefix('user_');
    for (const user of allUsers) {
      await kv.del(`user_${user.id}`);
      // Also delete from Supabase Auth
      try {
        await supabase.auth.admin.deleteUser(user.id);
      } catch (authError) {
        console.log(`Could not delete auth user ${user.id}: ${authError}`);
      }
    }

    // Delete all responses
    const allResponses = await kv.getByPrefix('response_');
    for (const response of allResponses) {
      const key = Object.keys(response)[0]; // Get the hash key
      if (key) {
        await kv.del(key);
      }
    }

    // Delete all trackers
    const allTrackers = await kv.getByPrefix('tracker_');
    for (const tracker of allTrackers) {
      const key = Object.keys(tracker)[0];
      if (key) {
        await kv.del(key);
      }
    }

    // Delete all questionnaires
    const allQuestionnaires = await kv.getByPrefix('questionnaire_');
    for (const questionnaire of allQuestionnaires) {
      await kv.del(`questionnaire_${questionnaire.id}`);
    }

    // Keep institutions - they are system data

    return c.json({ 
      success: true, 
      message: 'Database reset complete. All user data, responses, and questionnaires deleted. Institutions preserved.',
      deleted: {
        users: allUsers.length,
        responses: allResponses.length,
        questionnaires: allQuestionnaires.length,
        trackers: allTrackers.length,
      }
    });
  } catch (error) {
    console.log(`Error resetting database: ${error}`);
    return c.json({ error: 'Internal server error resetting database' }, 500);
  }
});

Deno.serve(app.fetch);
