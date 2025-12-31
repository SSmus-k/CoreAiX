import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

interface Law {
  title: string;
  desc: string;
}

interface SolutionResultProps {
  summary: string;
  laws: Law[];
  statements: string[];
  steps: string[];
  onDownload?: () => void;
  onSave?: () => void;
}

export default function SolutionResult({
  summary,
  laws,
  statements,
  steps,
  onDownload,
  onSave,
}: SolutionResultProps) {
  return (
    <div className="grid gap-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-cyan-200 mb-2">Problem Summary</h3>
        <div className="prose prose-invert prose-headings:text-xl prose-h3:text-lg prose-p:text-base mb-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {summary}
          </ReactMarkdown>
          </div>
      </div>
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-cyan-200 mb-2">Applicable Laws</h3>
        <ul className="list-disc ml-6">
          {laws.map((law, i) => (
            <li key={i} className="text-cyan-100"><strong>{law.title}:</strong> {law.desc}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-cyan-200 mb-2">Law Statements</h3>
        <ul className="list-disc ml-6">
          {statements.map((s, i) => (
            <li key={i} className="text-cyan-100">{s}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-cyan-200 mb-2">Step-by-step Solution</h3>
        <ol className="list-decimal ml-6">
          {steps.map((step, i) => (
            <li key={i} className="text-cyan-100">{step}</li>
          ))}
        </ol>
      </div>
      <div className="flex gap-4 mt-2">
        <button
          className="px-6 py-2 bg-cyan-700 text-white rounded-xl hover:bg-cyan-800"
          onClick={onDownload}
        >
          Download as PDF
        </button>
        <button
          className="px-6 py-2 bg-purple-700 text-white rounded-xl hover:bg-purple-800"
          onClick={onSave}
        >
          Save Solution
        </button>
      </div>
    </div>
  );
}
