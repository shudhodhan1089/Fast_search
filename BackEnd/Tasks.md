# TASKS.md

## Project Overview

This project is an AI-powered application with:

* Backend: ~80% completed
* Database: Supabase (already configured and working)
* Frontend: Not implemented yet
* Goal: Complete the backend, fix bugs, and build a production-ready frontend

---

# Agent Objectives

## Priority 1: Understand Existing Codebase

Before writing any code:

1. Explore the entire repository.
2. Understand architecture and folder structure.
3. Trace API flow.
4. Identify incomplete modules.
5. Review Supabase integration.
6. Generate a brief report of:

   * Existing features
   * Missing features
   * Potential bugs
   * Technical debt

Do NOT start large refactors before understanding the codebase.

---

## Priority 2: Bug Detection

Agent should:

* Search for runtime errors.
* Search for build errors.
* Search for TypeScript errors.
* Search for API issues.
* Search for broken imports.
* Search for missing environment variables.
* Search for Supabase integration issues.
* Search for authentication issues.
* Search for unhandled exceptions.

Document findings before applying fixes.

---

## Priority 3: Bug Fixing

When fixing bugs:

* Fix the smallest root cause.
* Avoid rewriting working code.
* Preserve existing architecture.
* Avoid introducing unnecessary dependencies.
* Keep fixes minimal and maintainable.

After every fix:

* Verify compilation.
* Verify affected functionality.
* Ensure no regression is introduced.

---

## Priority 4: Complete Remaining Backend

The backend is approximately 80% complete.

Agent should:

1. Identify unfinished features.
2. Complete only missing functionality.
3. Follow existing coding patterns.
4. Reuse current services and utilities.
5. Maintain Supabase compatibility.

Avoid:

* Rebuilding already working modules.
* Creating duplicate services.
* Replacing stable implementations.

---

## Priority 5: Frontend Development

Create a frontend from scratch.

Requirements:

* Inspired by Perplexity UX
* Not a clone
* Different visual identity
* Modern design
* Responsive
* Mobile friendly
* Clean typography
* Fast loading

Frontend should include:

### Core Pages

* Landing Page
* Chat Interface
* Settings
* Authentication
* Profile

### Design Goals

* Unique theme
* Dark mode support
* Professional appearance
* Smooth animations
* Minimal visual clutter

---

## Coding Rules

### Write Only Necessary Code

Agent must:

* Avoid overengineering
* Avoid premature optimization
* Avoid unnecessary abstractions
* Avoid speculative features

Only implement requirements that currently exist.

---

## Supabase Rules

Supabase is already configured and working.

Agent must:

* Reuse existing Supabase setup
* Reuse existing auth flow
* Reuse existing database schema
* Reuse existing environment variables

Do NOT:

* Recreate Supabase project
* Change database schema unnecessarily
* Replace Supabase with another provider

---

## File Modification Rules

Allowed:

* Fix existing files
* Add missing files
* Create frontend files
* Add tests when useful

Avoid:

* Large-scale refactors
* Renaming stable modules
* Deleting working code
* Changing architecture without justification

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

## Completion Checklist

Before marking a task complete:

* Project builds successfully
* No TypeScript errors
* No lint errors
* Backend endpoints functional
* Supabase integration functional
* Frontend functional
* Authentication working
* No duplicate code introduced
* Documentation updated if required

---

## Agent Workflow

1. Analyze codebase
2. Report findings
3. Fix bugs
4. Verify fixes
5. Complete backend
6. Build frontend
7. Test integrations
8. Final validation

Always prefer minimal safe changes over large refactors.
