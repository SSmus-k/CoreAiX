import { useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: { username: string; password: string; email?: string }) => Promise<void>;
  loading: boolean;
  error: string;
}

export default function AuthForm({ type, onSubmit, loading, error }: AuthFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form
      className="bg-white p-6 rounded shadow max-w-sm w-full"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ username, password, email });
      }}
      aria-label={type === 'login' ? 'Login Form' : 'Signup Form'}
    >
      <h2 className="text-xl font-bold mb-4 text-blue-900">{type === 'login' ? 'Login' : 'Sign Up'}</h2>
      <label className="block mb-2 font-medium">Username</label>
      <input
        className="w-full mb-4 p-2 border rounded"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      {type === 'signup' && (
        <>
          <label className="block mb-2 font-medium">Email</label>
          <input
            className="w-full mb-4 p-2 border rounded"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </>
      )}
      <label className="block mb-2 font-medium">Password</label>
      <input
        className="w-full mb-4 p-2 border rounded"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition"
        disabled={loading}
      >
        {loading ? 'Loading...' : type === 'login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
}
