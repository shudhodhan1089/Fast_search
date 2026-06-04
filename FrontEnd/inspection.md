# Inspection.md

## Objective

A runtime issue exists in the application.

Frontend successfully loads and authentication appears functional, but one or more backend requests are returning errors.

Your task is to identify and fix the issue through code inspection, logging, runtime testing, and request tracing.

---

## Scope

You may inspect:

* FrontEnd folder
* BackEnd folder
* Source code
* Route handlers
* Middleware
* Components
* Hooks
* API services
* Prisma queries
* TypeScript types
* Build configuration
* Runtime logs
* Browser network requests
* Console output

---

## Restricted Files

Do NOT inspect, open, modify, print, or request contents of:

* .env
* .env.local
* .env.production
* .env.development
* any secret/config file containing credentials
* API keys
* access tokens
* refresh tokens

Assume required environment variables already exist.

Do not spend time validating secrets.

Do not recommend checking API keys unless a direct code error proves that the application cannot access a required variable.

Focus on application logic and integration issues.

---

## Investigation Process

Trace requests end-to-end:

Frontend
→ API Layer
→ Axios/Fetch
→ Authorization Header
→ Express Route
→ Middleware
→ Business Logic
→ Database
→ Response

Determine where the request fails.

---

## Required Checks

### Frontend

Verify:

* API endpoints are correct
* Request payloads match backend expectations
* Authorization headers are attached
* Response parsing matches backend responses
* State updates are correct
* Conversation IDs are handled correctly

### Backend

Verify:

* Route registration
* Middleware execution
* Request body validation
* Prisma queries
* Response serialization
* Error handling
* TypeScript types

### Integration

Verify:

* Frontend request shape matches backend contract
* Backend response shape matches frontend expectations
* Conversation flow works
* Follow-up flow works

---

## Logging Rules

You may add temporary logs.

Examples:

* request received
* request body
* route entered
* middleware completed
* database query completed
* response sent

Remove unnecessary logs after identifying the issue.

---

## Implementation Rules

Do not:

* redesign UI
* refactor unrelated code
* rewrite working components
* introduce new features
* create new architecture

Fix only issues directly related to the failing functionality.

---

## Deliverables

Provide:

1. Exact root cause
2. File(s) involved
3. Line(s) involved
4. Fix applied
5. Validation performed
6. Build status
7. Remaining issues (if any)

---

## Execution Policy

Work continuously.

Do not stop after finding a possible cause.

Verify the cause.

Apply the fix.

Retest.

Continue until:

* issue is resolved, or
* a confirmed blocker exists

Avoid unnecessary code exploration.

Avoid repeated file reading.

Prioritize execution, validation, and resolution.
