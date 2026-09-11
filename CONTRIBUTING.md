# Contributing to EduWorld Unified Learning OS

Thank you for contributing to **EduWorld**! To maintain our high standards of architectural integrity, TypeScript strict typing, and WCAG 2.1 AAA accessibility, please follow these guidelines.

---

## 🛠️ Development Workflow

1. **Fork or Branch**: Create a feature branch from `master`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Local Dev Server**:
   ```bash
   npm run dev
   ```
4. **Code Guidelines**:
   - Write semantic HTML5 markup with appropriate ARIA tags.
   - Use Tailwind color tokens defined in `tailwind.config.ts` (e.g. `text-primary`, `bg-secondary`) to ensure WCAG AAA contrast compliance.
   - Strictly avoid using `any` in TypeScript. Define clean interfaces and union types.
   - Keep state hydration safe with optional catch blocks and null checks.

---

## 🧪 Quality Assurance & Pre-Commit Verification

Before submitting a Pull Request, you **must** ensure all automated checks pass cleanly:

```bash
# 1. Run ESLint checks (0 errors required)
npm run lint

# 2. Run Next.js 15 production build (All 32 routes must prerender statically)
npm run build
```

---

## 📝 Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature or screen
- `fix:` A bug fix or contrast adjustment
- `docs:` Documentation updates
- `style:` Formatting changes with no logic change
- `refactor:` Code restructuring without altering behavior
- `test:` Adding or updating tests

Example:
```
feat(achiever): add custom recovery drill modal to diagnostic results
```

---

## 🚀 Pull Request Protocol

1. Ensure the PR title follows conventional commit format.
2. Complete the standardized PR template in `.github/pull_request_template.md`.
3. Reference related issue tickets.
4. Verify that CI passes all lint and build workflows.
