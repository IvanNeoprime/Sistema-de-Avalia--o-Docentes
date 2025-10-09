/**
 * Database Reset Utility
 * 
 * This utility resets the database to a clean state for production deployment.
 * It removes all test users and responses while preserving institution data.
 * 
 * WARNING: This will DELETE ALL USER DATA. Use only for initial deployment.
 */

import { projectId, publicAnonKey } from './supabase/info';

export async function resetDatabase(): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-9e435140/reset-database`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirm: 'RESET_ALL_DATA',
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const result = await response.json();
    return { success: true, message: result.message };
  } catch (error) {
    console.error('Error resetting database:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to reset database' 
    };
  }
}

export async function getDatabaseStats(): Promise<{
  users: number;
  responses: number;
  questionnaires: number;
  institutions: number;
}> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-9e435140/database-stats`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get database stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting database stats:', error);
    return { users: 0, responses: 0, questionnaires: 0, institutions: 0 };
  }
}
