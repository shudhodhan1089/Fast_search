The backend is working and returning valid responses. Do not modify backend code, API routes, middleware, database logic, Tavily integration, Groq integration, Prisma code, authentication logic, response format, environment configuration, ports, or server startup code.

Do not open, read, print, summarize, modify,
or expose:

- .env
- .env.local
- .env.production
- .env.development
- any file containing secrets

Assume environment variables already exist.

Do not add new backend endpoints.
Do not change existing backend contracts.
Do not perform backend debugging.

STOP implementing new UI features.

The project has undergone multiple automated modifications and now requires stabilization.

Tasks:

1. Fix all runtime errors first.
2. Run the application.
3. Open browser console.
4. Resolve every red error before making any UI changes.
5. Verify all newly added components compile and render.
6. Check every component for:
   - missing imports
   - undefined variables
   - invalid hooks usage
   - incorrect React patterns

Files to inspect first:
- SourceList.tsx
- ChatWindow.tsx
- MessageBubble.tsx
- ConversationSidebar.tsx
- ChatInput.tsx

Do not add new features.
Do not redesign the interface.
Do not modify backend code.

Priority:
Runtime Stability > Build Success > UI Polish

After all runtime errors are resolved, identify the actual reason the UI appears unstyled and fix only that root cause.

Deliver:
- runtime errors fixed
- root cause of missing styling
- files modified
- successful build result