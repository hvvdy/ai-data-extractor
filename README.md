# AI Data Extractor

A modern Next.js web application built with an **AI-first mindset**, demonstrating the ability to generate structured outputs (JSON) from unstructured, natural language text.

## About The Project

This project was created to showcase a practical implementation of LLM-based workflows. It takes chaotic business inputs (like email footers or meeting notes) and strictly forces the AI model to return predictable, structured JSON data.

**Key Features:**

- **Structured Outputs:** Uses Prompt Engineering to guarantee a strict JSON response format.
- **AI-First Development:** Built with the assistance of AI coding tools (Cursor).
- **Fast LLM Inference:** Powered by the Llama 3.1 (8B) model running on Groq's high-speed LPU infrastructure for near-instant responses.

## 🛠️ Built With

- [Next.js]([https://nextjs.org/](https://nextjs.org/)) (App Router)
- [TypeScript]([https://www.typescriptlang.org/](https://www.typescriptlang.org/))
- [Tailwind CSS]([https://tailwindcss.com/](https://tailwindcss.com/))
- [Llama 3.1 via Groq API]([https://groq.com/](https://groq.com/))

## How it works

1. The user pastes raw text into the UI.
2. The frontend sends a POST request to the Next.js API Route.
3. The server securely communicates with the LLM API using a strictly defined `system prompt` and `response_format: { type: "json_object" }`.
4. The model returns a parsed JSON object containing extracted fields (Person, Company, Email, Phone, Summary).

https://ai-data-extractor-omega.vercel.app/
