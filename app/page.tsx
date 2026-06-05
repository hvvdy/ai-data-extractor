"use client";

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExtract = async () => {
    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!res.ok) throw new Error('Wystąpił błąd podczas przetwarzania.');

      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans text-gray-900">
      <h1 className="text-4xl font-bold mb-8 mt-10 text-blue-600">AI Data Extractor</h1>
      
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <p className="mb-4 text-gray-600">
          Wklej dowolny, nieustrukturyzowany tekst (np. stopkę z maila, notatkę ze spotkania), a model LLM zamieni go w czysty JSON.
        </p>
        
        <textarea
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
          placeholder="Wklej tekst tutaj..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleExtract}
          disabled={loading || text.trim() === ''}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-all duration-200"
        >
          {loading ? 'Magia AI działa (Przetwarzanie)...' : 'Wyciągnij dane'}
        </button>

        {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}

        {data && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-bold mb-3 text-gray-800">Wygenerowany JSON:</h2>
            <div className="bg-gray-900 p-5 rounded-lg overflow-auto">
              <pre className="text-sm text-green-400">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}