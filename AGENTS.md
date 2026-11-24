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
- You are never allowed to delete files
- You are not allowed to rm rf, if you ask for some deletion command, you MUST use "Add-Type -AssemblyName Microsoft.VisualBasic
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile($file, 'OnlyErrorDialogs', 'SendToRecycleBin')"
- You are never allowed to install dependencies unless asked to do so

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