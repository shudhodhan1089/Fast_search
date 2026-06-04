# FrontendTasks.md

## Project Context

Fast Search is an AI-powered search engine.

Backend Stack:

* Bun
* TypeScript
* Express
* Prisma
* PostgreSQL
* Tavily
* Groq
* Supabase Auth

Frontend Stack:

* React
* TypeScript
* Bun
* React Router
* Axios
* Tailwind
* shadcn/ui

Goal:

Build a Perplexity-inspired search experience.

---

# Existing Routes

GET /Conversations

Returns:

[
{
id,
title,
slug
}
]

---

GET /Conversation/:conversationId

Returns:

{
id,
title,
messages:[]
}

---

POST /fast_search_ask

Request:

{
query:string
}

Response:

{
answer:string,
sources:[
{
url:string
}
],
conversationId:string
}

---

POST /Conversation/follow_up

Request:

{
conversationId:string,
query:string
}

Response:

{
answer:string,
sources:[
{
url:string
}
]
}

---

# Authentication

Use Supabase.

If user is not authenticated:

Redirect to:

/auth

If authenticated:

Redirect to:

/

Create reusable hook:

useAuth()

Responsibilities:

* getUser()
* getSession()
* logout()

Do not repeatedly call auth APIs on every render.

---

# Dashboard Layout

Desktop:

---

| Sidebar | Chat Area                              |
|          |                                       |
----------------------------------------------------

Sidebar Width:

280px

Mobile:

Drawer sidebar.

---

# Sidebar

Component:

ConversationSidebar.tsx

Responsibilities:

* Load conversations
* Show titles
* Highlight active conversation
* Allow selecting conversation

API:

GET /Conversations

Sort newest first.

---

# Chat Area

Component:

ChatWindow.tsx

Responsibilities:

* Display messages
* Display answer
* Display sources
* Display loading state

---

# Message Component

Create:

MessageBubble.tsx

Supports:

User

Assistant

Different styling for each role.

---

# New Search

Component:

ChatInput.tsx

Flow:

User enters query.

POST /fast_search_ask

Immediately show:

User message

Then:

Loading state

Then:

Assistant answer

Store:

conversationId

Set active conversation.

---

# Follow Up Search

If active conversation exists:

POST /Conversation/follow_up

Body:

{
conversationId,
query
}

Append messages.

Do not replace previous messages.

---

# Load Existing Conversation

Clicking conversation:

GET /Conversation/:id

Display:

All messages

Chronological order

Oldest first.

---

# Sources UI

Component:

SourceList.tsx

Display:

Sources

example.com

another-site.com

Open links in new tab.

Use URL hostname as display label.

Example:

https://openai.com/blog

Display:

openai.com

---

# Loading States

Create:

LoadingMessage.tsx

Display:

Searching the web...

while awaiting backend response.

Disable send button while loading.

Prevent duplicate requests.

---

# Error Handling

Handle:

401

403

404

500

Network failures

Display toast notifications.

Never crash UI.

---

# Dashboard Improvements

Current Dashboard repeatedly runs getUser().

Fix useEffect dependency issues.

Authentication check should execute only once.

Avoid unnecessary API calls.

---

# API Layer

Create:

services/api.ts

Contains:

getConversations()

getConversation()

askQuestion()

followUp()

No direct axios calls inside components.

---

# Type Definitions

Create:

types/conversation.ts

Conversation

Message

Source

ApiResponse

No use of any.

---

# UX Requirements

Auto-scroll to newest message.

Press Enter to submit.

Shift+Enter for newline.

Preserve active conversation on refresh.

Show empty state:

"Ask anything to start a conversation"

when no messages exist.

---

Do not open, read, print, summarize, modify,
or expose:

- .env
- .env.local
- .env.production
- .env.development
- any file containing secrets

Assume environment variables already exist.
Use only variable names when coding.

# Out Of Scope

Do NOT implement:

* Voice search
* Streaming responses
* Markdown rendering
* Conversation deletion
* Dark mode

Focus on functionality first.

All data must come from backend APIs.

No mock data.
