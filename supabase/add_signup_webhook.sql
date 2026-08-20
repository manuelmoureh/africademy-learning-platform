-- Notifies hello@afridemy.online (via api/notify/signup.ts -> Resend) whenever someone
-- signs up. Supabase's own "Database Webhooks" UI hit a platform bug on this project
-- (missing supabase_functions schema), so this calls pg_net directly instead - same
-- underlying mechanism the UI feature uses, just without the broken wrapper.
--
-- SECURITY: the original version of this file had the real SUPABASE_WEBHOOK_SECRET value
-- hardcoded below and committed to git - a leaked-secret bug caught in a later audit.
-- Do NOT hardcode the real secret here again. Replace YOUR_WEBHOOK_SECRET_HERE below with
-- your actual secret only in the SQL Editor before running - never re-commit this file
-- with a real value filled in.
create extension if not exists pg_net;

create or replace function public.notify_new_signup()
returns trigger as $$
begin
  perform net.http_post(
    url := 'https://www.afridemy.online/api/notify/signup',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', 'YOUR_WEBHOOK_SECRET_HERE'
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
