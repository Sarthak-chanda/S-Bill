# Antigravity Agent Guidelines & Operational Directives

This document outlines mandatory operational protocols for AI agents operating within this repository. All rules must be strictly adhered to across all sessions and tasks.

---

## 1. Token Consumption Optimization

To maximize efficiency and prevent context bloat, agents must strictly minimize token consumption:

- **Concise & Direct Communication**:
  - Deliver solutions with maximum clarity and minimal conversational filler.
  - Avoid polite boilerplate ("Sure, I can help with that...", "As an AI assistant...").
  - Do not restate the user's prompt or explain obvious steps unless technical rationale is requested.
  - In chat responses, do not dump full file contents, massive code listings, or lengthy summaries. Reference files using clickable links (`[filename](file:///path/to/file#L1-L10)`) and summarize only key decisions or changes.

- **Targeted Code Reading & Search**:
  - **Never read entire large files** if only a specific function, class, or block is relevant.
  - Always use targeted searching (`grep_search`) first to locate specific lines and definitions.
  - When calling `view_file`, explicitly supply `StartLine` and `EndLine` to read only the necessary snippet.
  - Do not repeatedly re-read unchanged files within the same session.

- **Surgical Edits**:
  - Prefer `replace_file_content` or `multi_replace_file_content` targeting only the affected lines over rewriting entire files with `write_to_file`.
  - Minimize unnecessary diff churn.

- **Output Capping on Terminal Commands**:
  - Never run shell commands that produce unbounded or massive terminal output (e.g., full dependency trees, raw build logs, unchecked dumps).
  - Pipe or filter large outputs using tools like `head -n <N>`, `tail -n <N>`, or `grep`.
  - Avoid polling loops or repetitive status queries.

---

## 2. GitHub & Remote Push Restrictions

- **Strict Ban on Automatic Pushing**:
  - **NEVER** execute `git push`, push branches, open remote pull requests (`gh pr create`), or upload code to GitHub/remote repositories unless the user **explicitly and strictly commands it** in an exact user prompt (e.g., "push to github", "git push origin main").
  - General phrases such as "save the project", "commit the changes", "finish the task", or "clean up" **MUST NEVER** be construed as permission to push to a remote repository.
  - Local git operations (such as initializing a repo, staging files, creating local branches, or making local commits) are permitted when requested, but the code must **remain strictly local** until an unambiguous push order is given.
  - If there is any ambiguity regarding remote upload, pause and request explicit user confirmation.

---

## 3. Mandatory Pre-Upload Protocol: `.gitignore` & `README.md`

Every time before any upload to version control or remote repository (and before any authorized push), the agent **must** perform a rigorous pre-flight audit and setup of `.gitignore` and `README.md`:

### A. `.gitignore` Audit & Setup
Before staging (`git add`) or uploading any files:
1. **Verify Existence**: Ensure a comprehensive `.gitignore` exists at the root of the project.
2. **Exclude Build & Runtime Artifacts**:
   - Build outputs: `target/`, `build/`, `dist/`, `out/`, `*.class`, `*.jar`, `*.war`.
   - Dependency caches: `.mvn/wrapper/maven-wrapper.jar` (if not strictly committed), local packages.
3. **Exclude Environment & Secrets**:
   - Environment files: `.env`, `.env.*`, `application-local.properties`, `application-secret.properties`.
   - Secret keys: `*.key`, `*.pem`, `*.p12`, `*.jks`, API tokens, database credentials.
4. **Exclude IDE & OS Metadata**:
   - IDE configs: `.idea/`, `*.iml`, `*.iws`, `*.ipr`, `.vscode/`, `.settings/`, `.classpath`, `.project`.
   - OS metadata: `.DS_Store`, `Thumbs.db`, temporary swap files.
5. **Verify Untracked Status**: Run `git status --ignored` to confirm that no sensitive or binary artifacts are tracked or staged.

### B. `README.md` Audit & Setup
Before staging or preparing code for upload:
1. **Verify Existence**: Ensure a polished, professional `README.md` exists in the repository root.
2. **Required Sections**:
   - **Project Overview**: Clear, compelling description of the application's purpose and functionality.
   - **Tech Stack**: Key frameworks and versions (e.g., Java 17+, Spring Boot, Spring Security, MySQL, Maven).
   - **Prerequisites**: Required software, runtime environments, and database setups.
   - **Configuration & Environment Variables**: Clear template/table of required configuration properties and secrets (without exposing actual sensitive values).
   - **Build & Run Instructions**: Exact commands for local development, building (`./mvnw clean package` / `mvn clean install`), and running (`./mvnw spring-boot:run`).
   - **API / Feature Documentation**: Key endpoints, security setup (OAuth2, basic auth, roles), and workflow overview.
3. **Accuracy Check**: Ensure documentation reflects the current codebase state and is free of placeholder or stale instructions.
