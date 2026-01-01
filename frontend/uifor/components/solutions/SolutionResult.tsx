import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface SolutionResultProps {
  summary: unknown; // 👈 important: don't lie to TypeScript
  onDownload?: () => void;
  onSave?: () => void;
}

/**
 * Normalize any AI output into a safe markdown string
 */
function normalizeSummary(input: unknown): string {
  if (typeof input === "string") return input;

  if (input && typeof input === "object") {
    try {
      return JSON.stringify(input, null, 2);
    } catch {
      return "";
    }
  }

  return "";
}

export default function SolutionResult({
  summary,
  onDownload,
  onSave,
}: SolutionResultProps) {
  const safeSummary = normalizeSummary(summary);

  return (
    <div className="grid gap-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-cyan-200 mb-2">
          Problem Summary
        </h3>

        <div className="prose prose-invert prose-headings:text-xl prose-h3:text-lg prose-p:text-base mb-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {safeSummary}
          </ReactMarkdown>
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <button
          className="px-6 py-2 bg-cyan-700 text-white rounded-xl hover:bg-cyan-800"
          onClick={onDownload}
          disabled={!safeSummary}
        >
          Download as PDF
        </button>

        <button
          className="px-6 py-2 bg-purple-700 text-white rounded-xl hover:bg-purple-800"
          onClick={onSave}
          disabled={!safeSummary}
        >
          Save Solution
        </button>
      </div>
    </div>
  );
}
