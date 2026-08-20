-- Notifies hello@afridemy.online (via api/notify/signup.ts -> Resend) whenever someone
-- signs up. Supabase's own "Database Webhooks" UI hit a platform bug on this project
-- (missing supabase_functions schema), so this calls pg_net directly instead - same
-- underlying mechanism the UI feature uses, just without the broken wrapper.
create extension if not exists pg_net;

create or replace function public.notify_new_signup()
returns trigger as $$
begin
  perform net.http_post(
    url := 'https://www.afridemy.online/api/notify/signup',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', 'e533d160790f85150fd38c40e8455e7620e372e71c5ab0f8'
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'profiles',
      'record', to_jsonb(new)
    )
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_profile_created_notify on public.profiles;
create trigger on_profile_created_notify
  after insert on public.profiles
  for each row execute procedure public.notify_new_signup();
