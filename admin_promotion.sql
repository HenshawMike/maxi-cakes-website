-- ADMIN PROMOTION SCRIPT
-- Use this AFTER creating the user 'adminmaxi01@gmail.com' in the Supabase Dashboard.

-- 1. Ensure the triggering function exists (from previous script)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', COALESCE(new.raw_user_meta_data->>'role', 'user'))
  ON CONFLICT (id) DO UPDATE 
  SET role = EXCLUDED.role, full_name = EXCLUDED.full_name;
  
  IF (COALESCE(new.raw_user_meta_data->>'role', 'user') = 'admin') THEN
    INSERT INTO public.baker_profile (id, bio)
    VALUES (new.id, 'Welcome to my baking page!')
    ON CONFLICT (id) DO NOTHING;
  END IF;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Manually promote the user if they already exist
UPDATE public.profiles
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'adminmaxi01@gmail.com');

-- 3. Ensure a baker profile exists for this user
INSERT INTO public.baker_profile (id, bio)
SELECT id, 'Welcome to my baking page!'
FROM auth.users
WHERE email = 'adminmaxi01@gmail.com'
ON CONFLICT (id) DO NOTHING;
