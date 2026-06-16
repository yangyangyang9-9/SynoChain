-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  current_level INTEGER DEFAULT 1,
  lives INTEGER DEFAULT 3,
  coins INTEGER DEFAULT 0,
  skip_cards INTEGER DEFAULT 0,
  revive_cards INTEGER DEFAULT 0,
  speed_cards INTEGER DEFAULT 0,
  in_treatment BOOLEAN DEFAULT FALSE,
  treatment_end_time TIMESTAMPTZ,
  treatment_level INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 关卡历史记录表
CREATE TABLE level_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  level_id INTEGER NOT NULL,
  correct BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 签到表
CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 好友助力表
CREATE TABLE friend_helps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  helper_id UUID REFERENCES users(id) ON DELETE CASCADE,
  helped_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_users_current_level ON users(current_level DESC);
CREATE INDEX idx_users_coins ON users(coins DESC);
CREATE INDEX idx_level_history_user_id ON level_history(user_id);
CREATE INDEX idx_checkins_user_id ON checkins(user_id);
CREATE INDEX idx_checkins_created_at ON checkins(created_at);
CREATE INDEX idx_friend_helps_helper_id ON friend_helps(helper_id);
CREATE INDEX idx_friend_helps_created_at ON friend_helps(created_at);

-- 启用 RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE friend_helps ENABLE ROW LEVEL SECURITY;

-- 用户表策略
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- 关卡历史策略
CREATE POLICY "Users can view all history" ON level_history FOR SELECT USING (true);
CREATE POLICY "Users can insert own history" ON level_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 签到策略
CREATE POLICY "Users can view all checkins" ON checkins FOR SELECT USING (true);
CREATE POLICY "Users can insert own checkin" ON checkins FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 好友助力策略
CREATE POLICY "Users can view all helps" ON friend_helps FOR SELECT USING (true);
CREATE POLICY "Users can insert own help" ON friend_helps FOR INSERT WITH CHECK (auth.uid() = helper_id);
