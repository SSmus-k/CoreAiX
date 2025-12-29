import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <div className="max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Dashboard</h2>
        <p className="mb-6 text-gray-700">Welcome to RegulAI. Select your business type and intended action to get started.</p>
        <Link href="/compliance" className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Start Compliance Check</Link>
      </div>
    </main>
  );
}
