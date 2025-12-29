"use client";
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  function handleLogout() {
    // Clear auth tokens (example: localStorage)
    localStorage.removeItem('token');
    router.push('/auth/login');
  }

  function handleDeleteData() {
    // Placeholder for data deletion logic
    alert('Data deletion coming soon!');
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-cyan-200 mb-6">Settings</h2>
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl mb-8">
        <h3 className="text-xl font-semibold text-cyan-100 mb-4">Account</h3>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-cyan-700 text-white rounded-xl font-semibold shadow hover:bg-cyan-800 transition mb-4"
        >
          Log Out
        </button>
      </div>
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl mb-8">
        <h3 className="text-xl font-semibold text-cyan-100 mb-4">Data</h3>
        <button
          onClick={handleDeleteData}
          className="px-6 py-3 bg-purple-700 text-white rounded-xl font-semibold shadow hover:bg-purple-800 transition"
        >
          Delete My Data
        </button>
      </div>
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
        <h3 className="text-xl font-semibold text-cyan-100 mb-4">Other Settings</h3>
        <p className="text-cyan-100">More settings coming soon!</p>
      </div>
    </div>
  );
}
