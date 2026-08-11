-- Supabase Schema for Matrimony Web App

-- Create custom types
CREATE TYPE interest_status AS ENUM ('pending', 'accepted', 'declined');

-- Profiles Table (Extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT,
  date_of_birth DATE,
  height_cm INTEGER,
  location TEXT,
  education TEXT,
  profession TEXT,
  community TEXT,
  about_me TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  profile_completion_status TEXT DEFAULT 'onboarding', -- 'onboarding', 'active', 'banned'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Partner Preferences Table
CREATE TABLE public.partner_preferences (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  min_age INTEGER,
  max_age INTEGER,
  min_height_cm INTEGER,
  preferred_communities TEXT[],
  preferred_locations TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Photos Table
CREATE TABLE public.photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  is_blurred BOOLEAN DEFAULT TRUE, -- Blurred by default until mutual interest
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Interests Table (Connections)
CREATE TABLE public.interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status interest_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(sender_id, receiver_id)
);

-- Subscriptions Table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_name TEXT DEFAULT 'premium',
  status TEXT DEFAULT 'active',
  start_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) Setup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Anyone authenticated can read active profiles, users can update their own profile
CREATE POLICY "Profiles are viewable by authenticated users" ON public.profiles
  FOR SELECT USING (auth.role() = 'authenticated' AND profile_completion_status = 'active');

CREATE POLICY "Users can view their own profile regardless of status" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Partner Preferences: Users can read and update their own preferences
CREATE POLICY "Users can view own preferences" ON public.partner_preferences
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own preferences" ON public.partner_preferences
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own preferences" ON public.partner_preferences
  FOR UPDATE USING (auth.uid() = id);

-- Photos: Anyone authenticated can see photos, but only owners can manage them
CREATE POLICY "Photos are viewable by authenticated users" ON public.photos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert own photos" ON public.photos
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own photos" ON public.photos
  FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete own photos" ON public.photos
  FOR DELETE USING (auth.uid() = profile_id);

-- Interests: Users can read interests involving them, and send interests
CREATE POLICY "Users can view interests involving them" ON public.interests
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can insert interests" ON public.interests
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update interests received" ON public.interests
  FOR UPDATE USING (auth.uid() = receiver_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_interests_modtime
BEFORE UPDATE ON public.interests
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_preferences_modtime
BEFORE UPDATE ON public.partner_preferences
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Pre-registrations Table (For Marketing Page)
CREATE TABLE public.pre_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registered_as TEXT NOT NULL,
  full_name TEXT NOT NULL,
  gender TEXT,
  mobile_number TEXT NOT NULL,
  whatsapp_number TEXT,
  email TEXT,
  date_of_birth DATE,
  age INTEGER,
  city TEXT,
  district TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.pre_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for anyone" ON public.pre_registrations FOR INSERT WITH CHECK (true);
