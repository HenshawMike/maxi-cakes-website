-- MAXI CAKES ADMIN ACCESS FIX (v2)
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Ensure required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Setup/Reset Admin User
DO $$
DECLARE
  target_email TEXT := 'adminmaxi01@gmail.com';
  target_password TEXT := 'M@xiCakes_9#21!Pro'; -- You can change this
  user_id UUID;
BEGIN
  -- Check if the user already exists in auth.users
  SELECT id INTO user_id FROM auth.users WHERE email = target_email;

  IF user_id IS NULL THEN
    -- Create new user if they don't exist
    user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role,
      created_at,
      updated_at
    )
    VALUES (
      user_id,
      '00000000-0000-0000-0000-000000000000',
      target_email,
      crypt(target_password, gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Admin Maxi", "role":"admin"}',
      'authenticated',
      'authenticated',
      now(),
      now()
    );
    RAISE NOTICE 'Created new admin user with ID: %', user_id;
  ELSE
    -- Update existing user: Ensure confirmed email and reset password
    UPDATE auth.users
    SET 
      encrypted_password = crypt(target_password, gen_salt('bf')),
      email_confirmed_at = now(),
      raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb,
      updated_at = now()
    WHERE id = user_id;
    RAISE NOTICE 'Updated existing admin user with ID: %', user_id;
  END IF;

  -- 3. Sync with public.profiles table
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (user_id, 'Admin Maxi', 'admin')
  ON CONFLICT (id) DO UPDATE 
  SET role = 'admin', full_name = EXCLUDED.full_name;

  -- 4. Ensure public.baker_profile entry
  INSERT INTO public.baker_profile (id, bio)
  VALUES (user_id, 'Welcome to my baking page!')
  ON CONFLICT (id) DO NOTHING;

END $$;
