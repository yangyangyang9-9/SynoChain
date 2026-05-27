# SynoChain AI 部署指南

## 1. Supabase 建表步骤

### 1.1 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com) 并登录
2. 点击 "New project" 创建新项目
3. 填写项目名称（如 synochain-ai），设置数据库密码并记住
4. 选择距离目标用户最近的区域
5. 等待项目初始化完成（约2分钟）

### 1.2 执行数据库建表 SQL

1. 进入 Supabase 项目控制台
2. 点击左侧菜单 "SQL Editor"
3. 点击 "New query" 创建新查询
4. 复制粘贴以下 SQL 并执行：

```sql
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

CREATE TABLE IF NOT EXISTS demands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  country TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

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

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE demands ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Resources viewable by all" ON resources
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own resources" ON resources
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resources" ON resources
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resources" ON resources
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Demands viewable by all" ON demands
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own demands" ON demands
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own demands" ON demands
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own demands" ON demands
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Matches viewable by all" ON ai_matches
  FOR SELECT USING (true);

CREATE POLICY "Users can read own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Premium resources for subscribers" ON premium_resources
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_subscribed = TRUE
      AND (users.subscription_expires_at IS NULL OR users.subscription_expires_at > NOW())
    )
  );

CREATE POLICY "Users can read own recommendations" ON ai_recommendations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own recommendations" ON ai_recommendations
  FOR UPDATE USING (auth.uid() = user_id);
```

5. 点击右下角 "Run" 按钮执行
6. 执行成功后，可在 "Table Editor" 中查看新建的表

### 1.3 获取 API 密钥

1. 在 Supabase 控制台左侧点击 "Project Settings"
2. 点击 "API"
3. 复制以下两个值：
   - **Project URL**（作为 `NEXT_PUBLIC_SUPABASE_URL`）
   - **anon public key**（作为 `NEXT_PUBLIC_SUPABASE_ANON_KEY`）
4. 继续向下滚动，找到 **service_role key**（作为 `SUPABASE_SERVICE_ROLE_KEY`）
5. 妥善保存这三个值，后续部署时会用到

---

## 2. Vercel 前端部署步骤

### 2.1 准备工作

1. 确保代码已推送到 GitHub 仓库
2. 准备好在 Supabase 获取的三个密钥

### 2.2 在 Vercel 导入项目

1. 访问 [vercel.com](https://vercel.com) 并登录（推荐使用 GitHub 账号）
2. 点击 "Add New" → "Project"
3. 选择你的 GitHub 仓库（synochain-ai）
4. 点击 "Import"

### 2.3 配置项目

1. **Framework Preset**：保持默认，Vercel 会自动识别为 Next.js
2. **Root Directory**：默认为 `./`（即仓库根目录），保持不变
3. **Build Command**：默认 `npm run build`，保持不变
4. **Output Directory**：默认 `.next`，保持不变

### 2.4 配置环境变量

在 "Environment Variables" 区域添加以下变量：

| 变量名 | 值（填入你实际的值） |
|--------|----------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | 你的 Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 你的 Supabase anon key |
| `NEXT_PUBLIC_API_URL` | Railway 后端部署后获得的 URL |

### 2.5 部署

1. 点击 "Deploy" 按钮
2. 等待构建完成（约 1-3 分钟）
3. 部署成功后，Vercel 会提供一个域名（如 `synochain-ai.vercel.app`）
4. 可以在 "Domains" 设置中绑定自定义域名

### 2.6 后续更新

每次推送代码到 GitHub 主分支时，Vercel 会自动重新部署。也可以在 Vercel 控制台手动触发 Redeploy。

---

## 3. Railway 后端部署步骤

### 3.1 准备工作

1. 确保后端代码包含 `backend/railway.json` 和 `backend/Dockerfile`
2. 准备所有环境变量（API 密钥等）

### 3.2 在 Railway 部署

#### 方式一：通过 GitHub 部署（推荐）

1. 访问 [railway.app](https://railway.app) 并登录（使用 GitHub 账号）
2. 点击 "New Project" → "Deploy from GitHub repo"
3. 选择你的仓库
4. Railway 会自动检测 `backend/railway.json` 配置

#### 方式二：通过 CLI 部署

1. 安装 Railway CLI：
   ```bash
   npm install -g @railway/cli
   ```
2. 登录：
   ```bash
   railway login
   ```
3. 进入 `backend/` 目录：
   ```bash
   cd backend
   ```
4. 初始化项目：
   ```bash
   railway init
   ```
5. 部署：
   ```bash
   railway up
   ```

### 3.3 配置环境变量

在 Railway 项目控制台中：

1. 点击你的服务（Service）
2. 点击 "Variables" 标签
3. 添加以下环境变量：

| 变量名 | 说明 |
|--------|------|
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key |
| `SUPABASE_ANON_KEY` | Supabase anon key |
| `DASHSCOPE_API_KEY` | 阿里云 DashScope API Key |
| `OPENROUTER_API_KEY` | OpenRouter API Key |
| `ZAI_API_KEY` | Z-AI API Key |
| `NVIDIA_API_KEY` | NVIDIA API Key |
| `MODELSCOPE_API_KEY` | ModelScope API Key |
| `SECRET_KEY` | JWT 签名密钥（建议使用随机字符串） |

### 3.4 获取后端 URL

1. 部署成功后，点击 "Settings"
2. 在 "Domains" 区域可以看到 Railway 自动生成的域名
3. 格式如：`synochain-ai-backend.up.railway.app`
4. 复制此 URL，作为前端 `NEXT_PUBLIC_API_URL` 的值

### 3.5 验证后端健康状态

部署完成后，在浏览器中访问：

```
https://你的railway域名/api/health
```

如果返回 `{"status": "ok"}` 则表示后端运行正常。

---

## 4. 环境变量配置清单

以下是完整的部署环境变量清单，请逐个确认：

### Vercel（前端）

| 变量名 | 必填 | 示例值 |
|--------|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | 是 | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 是 | `eyJhbGci...` |
| `NEXT_PUBLIC_API_URL` | 是 | `https://xxxxx.up.railway.app` |

### Railway（后端）

| 变量名 | 必填 | 示例值 |
|--------|------|--------|
| `SUPABASE_URL` | 是 | `https://xxxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | 是 | `eyJhbGci...` |
| `SUPABASE_ANON_KEY` | 是 | `eyJhbGci...` |
| `DASHSCOPE_API_KEY` | 否 | `sk-...` |
| `OPENROUTER_API_KEY` | 否 | `sk-or-v1-...` |
| `ZAI_API_KEY` | 否 | 你的 Z-AI 密钥 |
| `NVIDIA_API_KEY` | 否 | `nvapi-...` |
| `MODELSCOPE_API_KEY` | 否 | 你的 ModelScope 密钥 |
| `SECRET_KEY` | 是 | 随机字符串（至少32字符） |

> **注意**：AI 模型相关的 API Key（DASHSCOPE、OPENROUTER 等）为可选项，根据你需要使用的 AI 模型供应商决定是否填写。至少填写一个 AI API Key 以确保 AI 匹配功能可用。

---

## 5. 验证部署成功的方法

### 5.1 验证前端部署

1. 访问 Vercel 生成的域名（如 `https://synochain-ai.vercel.app`）
2. 确认首页正常加载，无白屏或报错
3. 尝试注册/登录功能，确认 Supabase 连接正常
4. 浏览各个页面，确认路由正常

### 5.2 验证后端部署

1. 访问健康检查接口：
   ```
   curl https://你的railway域名/api/health
   ```
   期望返回：`{"status": "ok"}`

2. 测试 API 接口（以获取资源列表为例）：
   ```
   curl https://你的railway域名/api/resources
   ```

### 5.3 验证前后端联通

1. 在前端页面进行需要调用后端 API 的操作（如提交资源或需求）
2. 打开浏览器开发者工具（F12）→ Network 标签
3. 观察 API 请求是否成功（状态码 200）
4. 检查数据是否正确写入 Supabase 数据库

### 5.4 验证数据库

1. 登录 Supabase 控制台
2. 打开 "Table Editor"
3. 检查各表是否有新数据写入
4. 确认 RLS 策略正常工作（不同权限用户只能看到应有数据）

---

## 6. 常见问题排查

### 问题 1：Vercel 构建失败

**可能原因**：
- TypeScript 类型错误
- ESLint 检查不通过
- 依赖安装失败

**解决方法**：
1. 本地执行 `npm run build` 检查错误
2. 修复所有 TypeScript 和 ESLint 错误后重新推送
3. 查看 Vercel 构建日志中的具体错误信息

### 问题 2：前端无法连接后端 API

**可能原因**：
- `NEXT_PUBLIC_API_URL` 环境变量未正确设置
- 后端未启动或已停止
- CORS 跨域限制

**解决方法**：
1. 检查 Vercel 环境变量是否正确设置
2. 确认 Railway 服务处于 "Active" 状态
3. 检查后端是否配置了正确的 CORS 允许来源
4. 在 Vercel 中重新部署使环境变量生效

### 问题 3：Supabase 连接失败

**可能原因**：
- 密钥配置错误
- RLS 策略阻止了请求
- 表尚未创建

**解决方法**：
1. 确认 `NEXT_PUBLIC_SUPABASE_URL` 格式正确（以 `https://` 开头，不含尾部斜杠）
2. 确认 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 是 anon key 而非 service_role key
3. 检查 SQL Editor 中所有表是否正确创建
4. 暂时关闭 RLS 测试，确认后重新启用

### 问题 4：Railway 部署后服务无法启动

**可能原因**：
- `requirements.txt` 中的依赖有兼容性问题
- 环境变量缺失
- 端口配置错误

**解决方法**：
1. 查看 Railway 部署日志（Deployments → View Logs）
2. 确保所有必需的环境变量已配置
3. Railway 会自动注入 `$PORT` 环境变量，不要手动指定端口号
4. 检查 `backend/app/main.py` 文件是否存在且代码正确

### 问题 5：Railway 服务自动休眠

**说明**：Railway 免费套餐的 Web 服务在不活动后会休眠。

**解决方法**：
- 升级到 Railway 付费套餐
- 或使用 UptimeRobot 等服务定时向你的后端 URL 发送请求以保持唤醒

### 问题 6：CORS 跨域错误

**可能原因**：FastAPI 未配置正确的 CORS 中间件。

**解决方法**：
确认 `backend/app/main.py` 中包含以下代码：

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://你的vercel域名.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 附录：快速部署检查清单

- [ ] Supabase 项目已创建
- [ ] 数据库表已通过 SQL 创建（7张表）
- [ ] RLS 策略已启用
- [ ] 所有环境变量已记录
- [ ] GitHub 仓库代码已就位
- [ ] Vercel 项目已导入并配置环境变量
- [ ] Vercel 构建部署成功
- [ ] Railway 项目已创建并配置环境变量
- [ ] Railway 后端部署成功
- [ ] 健康检查接口返回正常
- [ ] 前后端联通测试通过
- [ ] 数据库写入测试通过