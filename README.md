# ⚡ Fast Search AI

> An AI-powered web search assistant that delivers fast, accurate answers using live web search, open-source LLMs, conversation history, and intelligent follow-up questions.

---

## 🚀 Features

### 🔍 AI-Powered Search

* Search any topic using natural language.
* Real-time web search integration using Tavily.
* AI-generated concise answers.

### 💬 Conversation History

* Automatically saves conversations.
* View previous searches anytime.
* Continue conversations with follow-up questions.

### 🧠 Smart Follow-Up Suggestions

* AI generates relevant follow-up questions.
* One-click continuation of discussions.

### 🌐 Live Web Sources

* Retrieves information from the web.
* Displays source links used to generate responses.

### 🔐 Authentication

* Google Login
* GitHub Login
* Secure authentication using Supabase Auth.

### 📱 Responsive UI

* Mobile-friendly layout.
* Sidebar conversation navigation.
* Clean chat interface.

### 💾 Persistent Storage

* Conversations stored in PostgreSQL.
* Prisma ORM for database management.

---

# 🏗️ Architecture

```text
User
 │
 ▼
Frontend (React + Bun)
 │
 ▼
Express Backend (TypeScript + Bun)
 │
 ├── Tavily Search API
 │
 ├── Groq LLM API
 │
 └── PostgreSQL Database
         │
         ▼
       Prisma ORM
```

---

# 🛠️ Tech Stack

## Frontend

* ⚛️ React
* 🟦 TypeScript
* 🎨 Tailwind CSS
* 🧩 shadcn/ui
* 🔄 Axios
* 🔐 Supabase Auth
* ⚡ Bun

## Backend

* 🚀 Express.js
* 🟦 TypeScript
* ⚡ Bun Runtime
* 🔍 Tavily Search API
* 🤖 Groq SDK
* 🔐 Supabase Authentication

## Database

* 🐘 PostgreSQL
* 🔺 Prisma ORM

---

# 📂 Project Structure

```text
Fast_Search/
│
├── FrontEnd/
│   ├── src/
│   ├── components/
│   ├── services/
│   └── pages/
│
├── BackEnd/
│   ├── index.ts
│   ├── middleware.ts
│   ├── prompt.ts
│   └── prisma/
│
└── README.md
```

---

# 🔑 Environment Variables

This project requires your own API keys.

## Backend `.env`

```env
GROQ_API_KEY=your_groq_api_key

tavily_api_key=your_tavily_api_key

DATABASE_URL=your_postgresql_connection_string

SUPABASE_URL=your_supabase_url

SUPABASE_ANON_KEY=your_supabase_anon_key

SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Frontend `.env`

```env
VITE_SUPABASE_URL=your_supabase_url

VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

⚠️ Without valid API keys and database credentials the application will not function.

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>

cd Fast_Search
```

---

# 🖥️ Backend Setup

```bash
cd BackEnd

bun install
```

### Generate Prisma Client

```bash
bunx prisma generate
```

### Run Database Migrations

```bash
bunx prisma migrate dev
```

### Start Backend

```bash
bun index.ts
```

Backend runs on:

```text
http://localhost:3001
```

---

# 🎨 Frontend Setup

```bash
cd FrontEnd

bun install
```

### Start Frontend

```bash
bun dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 📸 Screenshots

## Login Page

> Add Screenshot Here

```text
<img width="1494" height="939" alt="image" src="https://github.com/user-attachments/assets/0b2dcd51-3334-411e-99b0-57df8e51c65a" />
/docs/screenshots/login.png
```

---

## Dashboard

> Add Screenshot Here

```text
<img width="1206" height="934" alt="image" src="https://github.com/user-attachments/assets/19bcb8a5-d648-4ce5-893e-6b4de586bbc5" />
/docs/screenshots/dashboard.png
```

---

## Search Results

> Add Screenshot Here

```text
<img width="1489" height="963" alt="image" src="https://github.com/user-attachments/assets/001a6c5c-7a1f-4e69-8dac-c1ae22427b2d" />
/docs/screenshots/search-results.png
```

---

---

# 🔄 Workflow

1. User logs in using Google or GitHub.
2. User enters a search query.
3. Backend performs a Tavily web search.
4. Search results are injected into a custom AI prompt.
5. Groq generates the final answer.
6. Response is stored in PostgreSQL.
7. Follow-up suggestions are generated.
8. User can continue the conversation.

---

# 🎯 Future Improvements

* 🌙 Dark Mode
* ⚡ Streaming Responses
* 📝 Markdown Rendering
* 📎 Rich Source Preview Cards
* 🗑️ Delete Conversations
* ✏️ Rename Conversations
* 📤 Export Chats
* 🔎 Search Conversation History
* 📱 PWA Support

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful, consider giving it a star ⭐ on GitHub.
