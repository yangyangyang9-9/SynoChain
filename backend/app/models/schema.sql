-- SynoChain AI 数据库完整Schema
-- 在 Supabase SQL Editor 中执行

-- 1. users 用户表
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  is_subscribed BOOLEAN DEFAULT FALSE,
  subscribed_at TIMESTAMP,
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. resources 资源表
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  contact TEXT,
  country TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. demands 需求表
CREATE TABLE IF NOT EXISTS demands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  country TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. ai_matches AI匹配结果表
CREATE TABLE IF NOT EXISTS ai_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  demand_id UUID REFERENCES demands(id) ON DELETE CASCADE,
  score FLOAT,
  reason TEXT,
  industry TEXT,
  recommendation TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. subscriptions 订阅表
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT DEFAULT 'premium',
  status TEXT DEFAULT 'active',
  amount DECIMAL(10,2),
  started_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. premium_resources 优质供应链资源库（5000+）
CREATE TABLE IF NOT EXISTS premium_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  industry TEXT,
  country TEXT,
  contact_info TEXT,
  source TEXT,
  verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. ai_recommendations AI推荐记录表
CREATE TABLE IF NOT EXISTS ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resource_id UUID,
  demand_id UUID,
  match_score FLOAT,
  reason TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 启用 Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE demands ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;

-- RLS 策略

-- users: 用户可读自己的数据
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- resources: 所有人可读，创建者可写
CREATE POLICY "Resources viewable by all" ON resources
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own resources" ON resources
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resources" ON resources
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resources" ON resources
  FOR DELETE USING (auth.uid() = user_id);

-- demands: 所有人可读，创建者可写
CREATE POLICY "Demands viewable by all" ON demands
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own demands" ON demands
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own demands" ON demands
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own demands" ON demands
  FOR DELETE USING (auth.uid() = user_id);

-- ai_matches: 所有人可读
CREATE POLICY "Matches viewable by all" ON ai_matches
  FOR SELECT USING (true);

-- subscriptions: 用户可读自己的
CREATE POLICY "Users can read own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- premium_resources: 仅订阅用户可读
CREATE POLICY "Premium resources for subscribers" ON premium_resources
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_subscribed = TRUE
      AND (users.subscription_expires_at IS NULL OR users.subscription_expires_at > NOW())
    )
  );

-- ai_recommendations: 用户可读自己的
CREATE POLICY "Users can read own recommendations" ON ai_recommendations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own recommendations" ON ai_recommendations
  FOR UPDATE USING (auth.uid() = user_id);