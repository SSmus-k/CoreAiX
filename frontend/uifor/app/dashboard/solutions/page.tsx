"use client";

import { useState } from 'react';
import SolutionResult from '@/components/solutions/SolutionResult';

const mockResult = {
  summary: 'Expand retail business and hire 5 employees',
  laws: [
    { title: 'Company Registration Act', desc: 'All companies must register with OCR.' },
    { title: 'Labor Act', desc: 'Hiring more than 5 employees requires labor office notification.' },
  ],
  statements: [
    'Section 12: Registration required for expansion.',
    'Section 34: Labor office must be notified for new hires.'
  ],
  steps: [
    'Register business expansion with OCR',
    'Notify labor office',
    'Update tax registration',
  ],
};

export default function SolutionsPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<typeof mockResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(mockResult);
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl mb-8">
        <h2 className="text-2xl font-bold text-cyan-200 mb-4">Describe Your Problem</h2>
        <textarea
          className="w-full h-32 p-4 rounded-xl bg-white/10 text-cyan-100 border border-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
          placeholder="E.g. I want to expand my retail business and hire 5 employees"
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-8 py-3 bg-cyan-700 text-white rounded-xl font-semibold shadow hover:bg-cyan-800 transition"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {result && (
        <SolutionResult
          summary={result.summary}
          laws={result.laws}
          statements={result.statements}
          steps={result.steps}
          onDownload={() => alert('Download as PDF (to be implemented)')}
          onSave={() => alert('Save Solution (to be implemented)')}
        />
      )}
    </div>
  );
}
