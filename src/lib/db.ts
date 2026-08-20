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

// Real, paid track unlocks - the source of truth App.tsx uses for isTrackUnlocked(),
// replacing the old purchasedTrackIds-only-in-memory stub. Rows only ever reach 'success'
// via the server (api/payments/verify.ts or webhook.ts), never written by the client.
export async function fetchUserPurchases(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('purchases')
    .select('track_id')
    .eq('user_id', userId)
    .eq('status', 'success');
  if (error) {
    console.error('fetchUserPurchases failed', error);
    return [];
  }
  return (data ?? []).map((row) => row.track_id);
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

// One rating per user per track. Displayed ratings on course cards are still hardcoded
// placeholders (see courses.ts) until enough real submissions exist to compute an average.
export async function submitTrackRating(userId: string, trackId: string, rating: number): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('track_ratings')
    .upsert({ user_id: userId, track_id: trackId, rating }, { onConflict: 'user_id,track_id' });
  return { error: error ? error.message : null };
}

export async function fetchUserTrackRating(userId: string, trackId: string): Promise<number | null> {
  const { data, error } = await supabase
    .from('track_ratings')
    .select('rating')
    .eq('user_id', userId)
    .eq('track_id', trackId)
    .maybeSingle();
  if (error) {
    console.error('fetchUserTrackRating failed', error);
    return null;
  }
  return data?.rating ?? null;
}

export async function updateProfile(
  userId: string,
  updates: { name?: string; location?: string }
): Promise<{ error: string | null }> {
  const { error } = await supabase.from('profiles').update(updates).eq('id', userId);
  return { error: error ? error.message : null };
}

// Uploads to the public 'avatars' Storage bucket at avatars/<userId>/avatar.<ext> (RLS in
// supabase/add_profile_avatar.sql only allows a user to write inside their own uid folder),
// then caches the resulting public URL on profiles.avatar_url so other pages don't need a
// Storage round-trip just to render it. upsert:true means re-uploading just replaces the file.
export async function uploadAvatar(userId: string, file: File): Promise<string | null> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
  if (uploadError) {
    console.error('uploadAvatar failed', uploadError);
    return null;
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  const publicUrl = `${data.publicUrl}?t=${Date.now()}`; // cache-bust so a re-upload shows immediately

  const { error: updateError } = await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', userId);
  if (updateError) console.error('uploadAvatar: failed to save avatar_url', updateError);

  return publicUrl;
}

export interface PortfolioSubmissionRow {
  id: string;
  track_id: string;
  project_url: string;
  demo_video_url: string | null;
  status: 'pending' | 'verified' | 'rejected';
  submitted_at: string;
}

export async function fetchUserPortfolioSubmissions(userId: string): Promise<PortfolioSubmissionRow[]> {
  const { data, error } = await supabase
    .from('portfolio_submissions')
    .select('id, track_id, project_url, demo_video_url, status, submitted_at')
    .eq('user_id', userId)
    .order('submitted_at', { ascending: false });
  if (error) {
    console.error('fetchUserPortfolioSubmissions failed', error);
    return [];
  }
  return data ?? [];
}
