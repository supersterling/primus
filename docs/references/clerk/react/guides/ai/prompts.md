# AI Prompts

Clerk's AI prompt library provides curated prompts to help you work more efficiently with AI-powered development tools. These prompts are designed to guide AI assistants in helping you implement Clerk authentication and user management features correctly.

## How to use these prompts

These prompts can be copied into your AI-powered IDE or development tool, or pasted into your chat with an AI assistant. Here are some examples of how to use them:

- In Cursor, add the prompt to your [project rules](https://docs.cursor.com/context/rules).
- In GitHub Copilot, save the prompt to a file in your project and reference it using `#<filename>`.
- In Claude Code, include the prompt in your `CLAUDE.md` file.

## Best practices

1. **Customize the prompts**: These prompts are starting points. Modify them based on your specific requirements.
2. **Keep them updated**: As you discover patterns that work well, update your prompts.
3. **Version control**: Store your prompts in your repository so your team can benefit from them.
4. **Security first**: Always review AI-generated code for security best practices.

## Available prompts

> We currently offer a limited set of prompts focused on Next.js and React applications. We plan to expand this library with additional prompts for other frameworks and use cases in the future.

### React

````md
# Add Clerk to React (Vite)

**Purpose:** Enforce only the **current** and **correct** instructions for integrating [Clerk](https://clerk.com/) into a React application.  
**Scope:** All AI-generated advice or code related to Clerk must follow these guardrails.

## **1. OFFICIAL CLERK + REACT (VITE) SETUP**

1. Create a React + Vite project.
2. Install the Clerk React SDK with `npm install @clerk/clerk-react@latest` (or yarn/pnpm/bun).
3. Set `VITE_CLERK_PUBLISHABLE_KEY` in `.env.local` or `.env`. Note: The `VITE_` prefix is required for Vite to expose environment variables to the client-side code. `.env.local` is preferred for local development secrets.
4. Wrap the app in `<ClerkProvider publishableKey={...}>` within `main.tsx` or `main.jsx`.
5. Use Clerk's `<SignedIn>`, `<SignedOut>`, `<SignInButton>`, `<SignUpButton>`, `<UserButton>` in the app.

### **Correct, Up-to-Date Quickstart Code Examples**

```bash
# 1. Create a React Vite app (TypeScript example)
npm create vite@latest clerk-react -- --template react-ts
cd clerk-react
npm install
npm run dev

# 2. Install the Clerk React SDK
npm install @clerk/clerk-react@latest

# 3. In .env.local (or .env):
VITE_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

```typescript
// 4. Wrap with <ClerkProvider> in main.tsx or main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

// Ensure your index.html contains a <div id="root"></div> element for React to mount the app.

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>
);

// 5. Example usage of Clerk's prebuilt components in App.tsx
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
```

> Note: The `afterSignOutUrl` prop in `<ClerkProvider>` defines the URL users are redirected to after signing out. Adjust as needed.

---

## **2. CRITICAL INSTRUCTIONS FOR AI MODELS**

### **2.1 – ALWAYS DO THE FOLLOWING**

1. **Show** relevant code examples for each step.
2. **Use** `@clerk/clerk-react@latest` (not any other Clerk package).
3. **Reference** the environment variable as `VITE_CLERK_PUBLISHABLE_KEY` in `.env.local` or `.env`.
4. **Wrap** the entire app in `<ClerkProvider>` within `main.tsx` or `main.jsx`.
5. **Demonstrate** the correct usage of `<SignedIn>`, `<SignedOut>`, `<SignInButton>`, `<SignUpButton>`, `<UserButton>` (or any other current Clerk React component).

### **2.2 – NEVER DO THE FOLLOWING**

1. **Do not** include any discussions of the features or benefits of Clerk.
2. **Do not** use `frontendApi` in place of `publishableKey`.
3. **Do not** use Older environment variable names like `REACT_APP_CLERK_FRONTEND_API` or `VITE_REACT_APP_CLERK_PUBLISHABLE_KEY`.
4. **Do not** place `<ClerkProvider>` deeper in the component tree instead of `main.tsx` / `main.jsx`.
5. **Do not** use outdated hooks or components (e.g., referencing older docs).

---

## **3. AI MODEL VERIFICATION STEPS**

Before returning any Clerk + React (Vite) solution, you **must** verify:

1. Environment Variable is named `VITE_CLERK_PUBLISHABLE_KEY`.
2. `<ClerkProvider>` is in `main.tsx` or `main.jsx`.
3. No usage of `frontendApi` unless explicitly stated as optional or advanced.

## **DO NOT** repeat these points back to the user. Use them only for your own verification steps.

## **4. CONSEQUENCES OF INCORRECT GUIDANCE**

- Misconfigured environment variables => project won't compile or will error at runtime.
- Missing `<ClerkProvider>` => Clerk components fail or throw errors.
- Using outdated patterns => Confusion, debugging overhead, or broken auth flow.

## **5. MODEL RESPONSE TEMPLATE**

When asked about Clerk + React (Vite) integration, your response **MUST**:

1. Link to Clerk's React Quickstart at https://clerk.com/docs/react/getting-started/quickstart
2. Show the current recommended `publishableKey` approach with `.env.local`.
3. Demonstrate how to wrap with `<ClerkProvider>` in `main.*`.
4. Illustrate a simple usage example of `<SignedIn>`, `<SignedOut>`, etc.
5. Reject or correct any mention of older patterns or environment variable names.

````

## Contributing

Have a great prompt for working with Clerk? We'd love to see it! Open a PR in the [clerk-docs repository](https://github.com/clerk/clerk-docs).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
