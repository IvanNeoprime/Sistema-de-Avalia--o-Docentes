import { useState, useEffect } from 'react';
import { getCurrentUser, signOut, User } from './utils/auth';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { ManagerDashboard } from './components/manager/ManagerDashboard';
import { SystemStatus } from './components/common/SystemStatus';
import { Button } from './components/ui/button';
import { LogOut, GraduationCap } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot-password'>('login');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = async () => {
    await checkAuth();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="h-10 w-10 text-primary" />
              <h1>Sistema de Avaliação Docente</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Plataforma multi-institucional para avaliação anônima de docentes em
              instituições de ensino superior moçambicanas
            </p>
          </div>

          {/* Auth Forms */}
          {authMode === 'login' && (
            <LoginForm
              onSuccess={handleAuthSuccess}
              onToggleMode={() => setAuthMode('signup')}
              onForgotPassword={() => setAuthMode('forgot-password')}
            />
          )}
          {authMode === 'signup' && (
            <SignupForm
              onSuccess={handleAuthSuccess}
              onToggleMode={() => setAuthMode('login')}
            />
          )}
          {authMode === 'forgot-password' && (
            <ForgotPasswordForm onBack={() => setAuthMode('login')} />
          )}

          {/* System Status */}
          <div className="max-w-4xl mx-auto">
            <SystemStatus />
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-muted-foreground">
            <p>Sistema desenvolvido para garantir feedback anônimo e construtivo</p>
          </div>
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-lg">Avaliação Docente</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.role === 'student' && 'Estudante'}
                  {user.role === 'teacher' && 'Docente'}
                  {user.role === 'manager' && 'Gestor'}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {user.role === 'student' && <StudentDashboard user={user} />}
      {user.role === 'teacher' && <TeacherDashboard user={user} />}
      {user.role === 'manager' && <ManagerDashboard user={user} />}

      <Toaster />
    </div>
  );
}
