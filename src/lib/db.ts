import { supabase } from './supabase';

export interface ProgressRow {
  track_id: string;
  step_id: string;
  is_completed: boolean;
}

export async function fetchUserProgress(userId: string): Promise<ProgressRow[]> {
  const { data, error } = await supabase
    .from('progress')
    .select('track_id, step_id, is_completed')
    .eq('user_id', userId);
  if (error) {
    console.error('fetchUserProgress failed', error);
    return [];
  }
  return data ?? [];
}

export async function fetchUserEnrollments(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('enrollments')
    .select('track_id')
    .eq('user_id', userId);
  if (error) {
    console.error('fetchUserEnrollments failed', error);
    return [];
  }
  return (data ?? []).map((row) => row.track_id);
}

export async function ensureEnrollment(userId: string, trackId: string): Promise<void> {
  const { error } = await supabase
    .from('enrollments')
    .upsert({ user_id: userId, track_id: trackId }, { onConflict: 'user_id,track_id' });
  if (error) console.error('ensureEnrollment failed', error);
}

export async function setStepProgress(
  userId: string,
  trackId: string,
  stepId: string,
  isCompleted: boolean
): Promise<void> {
  await ensureEnrollment(userId, trackId);
  const { error } = await supabase
    .from('progress')
    .upsert(
      {
        user_id: userId,
        track_id: trackId,
        step_id: stepId,
        is_completed: isCompleted,
        completed_at: isCompleted ? new Date().toISOString() : null,
      },
      { onConflict: 'user_id,track_id,step_id' }
    );
  if (error) console.error('setStepProgress failed', error);
}

export interface PortfolioSubmissionInput {
  userId: string;
  trackId: string;
  projectUrl: string;
  demoVideoUrl?: string;
  notes?: string;
}

export async function submitPortfolioProject(input: PortfolioSubmissionInput): Promise<{ error: string | null }> {
  const { error } = await supabase.from('portfolio_submissions').insert({
    user_id: input.userId,
    track_id: input.trackId,
    project_url: input.projectUrl,
    demo_video_url: input.demoVideoUrl || null,
    notes: input.notes || null,
  });
  return { error: error ? error.message : null };
}

export async function subscribeToNewsletter(email: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('newsletter_signups').insert({ email });
  if (error && error.code === '23505') {
    return { error: null }; // already subscribed, treat as success
  }
  return { error: error ? error.message : null };
}
