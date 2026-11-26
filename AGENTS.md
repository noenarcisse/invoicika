# AGENTS.md

This file provides guidance to DevinAi when working in this repository.

## Project Overview

This project is a testing campaign for the Invoicika fullstack app. We're working in a waterflow setup, so the app won't be updated in this current cycle. We're reporting bugs and writing tests to make sure things are working smoothly or proving some bugs seens and their steps to be repeated and fixed (validation & regression in the long run).

"Invoicika is an invoice management system built with Angular 16, ASP.NET Core Web API 10.0, and PostgreSQL. This system provides full-fledged invoicing capabilities, including unlimited invoice creation, customer management, PDF generation. 
The frontend is built with Angular and utilizes NG-Zorro UI components for a modern, responsive design."

In this testing campaign, the mailing system is out of scope. Anything that's not implemented doesn't satisfy entry criteria and will not be covered by default.

The focus is a risk based testing strategy with a compliance check list. Test case are sorted by dev experience as a lot of critical bugs exists in the current state of the app.

### Authorization
- You always work on the worktree "invoicika-devin" on your branch "test-qa-devin"
- You are never allowed to read .env files
- never delete files directly; if a deletion is required, use only the recycle-bin command:  "Add-Type -AssemblyName Microsoft.VisualBasic
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile($file, 'OnlyErrorDialogs', 'SendToRecycleBin')"
- You are never allowed to install dependencies unless asked to do so

## Roles

You work in ONE role per session. The role is given in the task prompt ("role: QA" or "role: DEV").
If no role is given, ask before acting. Never mix both roles in the same session or the same commit.

| | QA | DEV |
|---|---|---|
| Goal | Write tests, report bugs, prove bugs with reproducible steps | Fix app bugs reported by QA |
| Allowed to modify | `TESTS_External/`, `Backend/*.Tests` | `Backend/` (except `*.Tests`), `Frontend/` |
| Forbidden to modify | `Backend/` (app code), `Frontend/` | Tests, to make them pass (unless explicitly asked) |
| Start from | `test-qa` | `main` |
| Branch name | `qa-agent/TC_XXX_XXX-slug` | `dev/TC_XXX_XXX-slug` |
| Merges into | `test-qa` (via PR validated by the user) | `main` (via PR validated by the user) |
| Commit type | `test` | `fix` |

Hard rules:
- `dev` branches are NEVER merged into `test-qa`. Fixes reach `test-qa` only through `main`, when the user starts a new cycle.
- Never edit `AGENTS.md` unless asked. It lives on `main`.
- Only the user creates, merges or deletes long-lived branches (`main`, `test-qa`, `develop`).

## Switching role (same worktree)

Before changing role or branch:
1. `git status` must be clean. Commit or stash first, ask the user if unsure.
2. Create or checkout the branch of the new role from the right base (see table).
3. Rebuild and reset: `./cli.exe -b` then `./cli.exe -r`. Containers may still run the code of the other branch.
4. Confirm the current branch and role in your first message.

## Role QA

Context: waterflow setup. The app is frozen during the current cycle, so bugs must stay reproducible.
We report bugs and write tests proving them (validation, then regression in the long run).

- Never modify app code (`Backend/` except `*.Tests`, `Frontend/`). If a test fails because of an app bug, document it, do not fix it.
- A test that proves a bug must FAIL while the bug exists. Do not weaken assertions to make it green.
- Test cases come from files prepared by the user or from Squash TM when available. Keep the TC id (`TC_XXX_XXX`) in the test name.
- Retrieve data for a test through API calls, never rely on backend seeds.
- Run `./cli.exe -r` before any Bruno or Playwright run. Use `injectdb` flags only when the test needs a specific DB state.
- Run only the targeted test (class, method, file), never the whole suite unless asked.
- Out of scope: mailing system, anything not implemented (does not satisfy entry criteria).

## Role DEV

Context: fix bugs in the app, starting from a failing test that acts as the specification.

- Input required: a TC id or a failing test (Bruno, Playwright or .NET). Without it, ask.
- Workflow:
  1. Reproduce: `./cli.exe -r`, run the targeted test, confirm it fails.
  2. Fix the smallest possible scope in `Backend/` or `Frontend/`.
  3. Rerun the targeted test, then the neighbouring tests of the same feature to detect regressions.
  4. One bug per branch and per commit.
- Do not modify tests to make them pass. If a test seems wrong, stop and explain why to the user.
- Ask for validation before: EF migrations, DB schema changes, API contract changes (Bruno tests depend on it), dependency changes.
- Frontend: Angular 16 with NgModules. Do not modernize (no standalone, signals, `@if`/`@for`) unless asked.
- If the fix needs the test to travel with it, the user will cherry-pick the test commit. Do not copy test files from `test-qa` yourself.

## Versions and constraints

Source of truth: `Backend/*.csproj`, `Frontend/package.json`.
- Frontend: Angular 16 + NG-Zorro
- Backend: .NET 10, EF Core, PostgreSQL, tests in xunit v3 with Testcontainers
- Node 20, Playwright (chromium), Bruno CLI 4.3.0

### Testing

- Whenever you're working on tests in .NET, use the dotnet command and target the exact class or method for the Test Case written. Do not launch others tests. For example:
```ps1
dotnet run -- -method "*TC_PRO01_010*" -reporter verbose
```
- Use the following command at the root before any API test in Bruno or frontend/E2E tests in Playwright unless asked otherwise. This will reset the DB to a knwown state. You can find the logins in the README.md
```ps1
./cli.exe -r
```
- If you need to retrieve data to write a test, always use a API call, do not rely on the seeds in the backend.
- You are allowed to use the bru cli commands
- You are allowed to use the npx playwright commands

#### Testings ports
| couche / ressource | url |
|---|---|
| frontend | http://localhost:4444 |
| backend | http://localhost:5000 |
| swagger | http://localhost:5000/swagger |
| database | http://localhost:5433 |

#### Testing credentials
| username | password | role
|---|---|---|
| admin | admin | Admin
| Jacques Houille | cestokay | Employee
| Godefroy De Montmirail | quetrepassesijefaiblis | Employee

## Architecture

The architecture is a monorepo that includes:

- _tools -> a go tool to install or remove the docker compose, reset the DB or change it's state
- Backend -> contains the backend for the project + the tests csproj in their own forlder
- Frontend -> contains the frontend for the app, unit tests are done in playwright so, you won't find them in here
- TESTS_External/_utilities -> direct SQL to explore the DB
- TESTS_External/API_bruno -> the API tests in yml, they're run with bruno. you have access to the bru cli command
- TESTS_External/E2E_Playwright/tests -> contains the frontend component tests and the e2e tests. You're allowed to run the test with playwright in command if needed

## Refactoring
If asked to refactor, you can run this command and read the stdout to find the files to refactor.
You are ***NEVER*** allowed to commit or push after you've modified anything in that situation.
```ps1
todos.exe cs,ts c
```

## Commit Message Format
You only commit or push when explicitly asked to do so.

Uses Conventional Commits:
```
Type - Short description
```

- **Types**: test, fix, refacto, docs
- **Short description**: you mention the TC_XXX_XXX with the id that was given to you in the commit and the title / description in french
- **Examples**: `test - TC_ACC01_001 inscription d'un nouvel utilisateur valide`

## Code Style

- Fail fast, throw in one line on the edge cases then add 2 \n before the real algorithm
- Rely on standardized formatter : deno fmt for Typescript or javascript, go fmt for Go, ms-dotnettools.csharp for C#
- The main goal is always readability, use pipes or chaining when appropriate (F#, LINQ methods)