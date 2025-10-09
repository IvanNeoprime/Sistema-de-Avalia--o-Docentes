import { mozambiqueInstitutions } from './institutions';
import { projectId, publicAnonKey } from './supabase/info';
import { getCurrentSession } from './auth';

const SUPABASE_URL = `https://${projectId}.supabase.co`;

export async function initializeInstitutions(): Promise<boolean> {
  try {
    const session = await getCurrentSession();
    if (!session) {
      console.error('No active session for institution initialization');
      return false;
    }

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/make-server-9e435140/institutions/init`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          institutions: mozambiqueInstitutions,
        }),
      }
    );

    if (!response.ok) {
      console.error('Failed to initialize institutions');
      return false;
    }

    const data = await response.json();
    console.log(`Initialized ${data.count} institutions`);
    return true;
  } catch (error) {
    console.error('Error initializing institutions:', error);
    return false;
  }
}

export async function getInstitutions() {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return mozambiqueInstitutions; // Return local data if not authenticated
    }

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/make-server-9e435140/institutions`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      return mozambiqueInstitutions; // Fallback to local data
    }

    const data = await response.json();
    return data.institutions.length > 0 ? data.institutions : mozambiqueInstitutions;
  } catch (error) {
    console.error('Error getting institutions:', error);
    return mozambiqueInstitutions; // Fallback to local data
  }
}
