import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", 
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Brak tekstu do analizy' }, { status: 400 });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Jesteś ekspertem od ekstrakcji danych. Twoim zadaniem jest przeanalizowanie tekstu dostarczonego przez użytkownika i wyciągnięcie z niego kluczowych informacji.
          
          Musisz ZAWSZE zwrócić poprawny obiekt JSON.
          
          Struktura JSON, której oczekuję:
          {
            "osoba": "Imię i nazwisko (lub brak jeśli nie ma)",
            "firma": "Nazwa firmy (lub brak jeśli nie ma)",
            "email": "Adres email (lub brak jeśli nie ma)",
            "telefon": "Numer telefonu (lub brak jeśli nie ma)",
            "podsumowanie": "Jedno zdanie podsumowujące treść"
          }`
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.1,
    });

    const extractedData = JSON.parse(response.choices[0].message.content || '{}');
    return NextResponse.json(extractedData);

  } catch (error) {
    console.error("Błąd API:", error);
    return NextResponse.json({ error: 'Wystąpił błąd podczas przetwarzania' }, { status: 500 });
  }
}