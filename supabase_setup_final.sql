-- MAXI CAKES UNIFIED SCHEMA & ADMIN SEED

-- 1. Enable pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Create 'profiles' table (Required by AdminLogin.tsx & ProtectedRoute.tsx)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    full_name TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create 'baker_profile' table (Required by AdminBakerProfile.tsx)
CREATE TABLE IF NOT EXISTS public.baker_profile (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    bio TEXT,
    profile_image_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create 'cakes' table (Required by AdminContent.tsx)
CREATE TABLE IF NOT EXISTS public.cakes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create 'settings' table (Required by AdminSettings.tsx)
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Trigger to handle new user creation automatically
-- This ensures every user gets a profile entry
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', COALESCE(new.raw_user_meta_data->>'role', 'user'));
  
  -- Also create empty baker profile for admins
  IF (new.raw_user_meta_data->>'role' = 'admin') THEN
    INSERT INTO public.baker_profile (id, bio)
    VALUES (new.id, 'Welcome to my baking page!');
  END IF;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 7. Seed Admin User
DO $$
DECLARE
  new_user_id UUID := gen_random_uuid();
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'adminmaxi01@gmail.com') THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    )
    VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'adminmaxi01@gmail.com',
      crypt('M@xiCakes_9#21!Pro', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Admin Maxi", "role":"admin"}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  END IF;
END $$;

-- 8. Seed default settings
INSERT INTO public.settings (key, value)
VALUES ('whatsapp_number', '+2348073535850')
ON CONFLICT (key) DO NOTHING;

-- 9. RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.baker_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Baker Profile
DROP POLICY IF EXISTS "Baker profile is public" ON public.baker_profile;
CREATE POLICY "Baker profile is public" ON public.baker_profile FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can update baker profile" ON public.baker_profile;
CREATE POLICY "Admins can update baker profile" ON public.baker_profile FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Cakes
DROP POLICY IF EXISTS "Cakes are public" ON public.cakes;
CREATE POLICY "Cakes are public" ON public.cakes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage cakes" ON public.cakes;
CREATE POLICY "Admins can manage cakes" ON public.cakes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Settings
DROP POLICY IF EXISTS "Settings are public" ON public.settings;
CREATE POLICY "Settings are public" ON public.settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage settings" ON public.settings;
CREATE POLICY "Admins can manage settings" ON public.settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
