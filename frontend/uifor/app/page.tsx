
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">RegulAI</h1>
        <p className="text-lg text-gray-700 mb-6">
          Regulation-to-Action Engine for Nepalese SMEs. Turn complex legal and tax regulations into clear, actionable compliance steps.
        </p>
        <Link href="/dashboard" className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">
          Go to Dashboard
        </Link>
        <div className="mt-8 text-xs text-gray-400">2025-12-29 (UTC)</div>
      </div>
    </main>
  );
}
