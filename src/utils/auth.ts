import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './supabase/info';

const SUPABASE_URL = `https://${projectId}.supabase.co`;

export const supabase = createClient(SUPABASE_URL, publicAnonKey);

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'manager';
  institutionId?: string;
  departmentId?: string;
}

export async function signUp(
  email: string,
  password: string,
  name: string,
  role: string,
  institutionId?: string,
  departmentId?: string
) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/make-server-9e435140/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          email,
          password,
          name,
          role,
          institutionId,
          departmentId,
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to sign up');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return null;
  }
  return data.session;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getCurrentSession();
    if (!session) return null;

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/make-server-9e435140/user`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    return null;
  }
}
