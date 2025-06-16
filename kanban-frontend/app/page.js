'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);  // Set loading state to true when request is sent

    const res = await fetch('https://kanban-project-1bc1.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false); // Reset loading state

    if (res.ok) {
      // Save the JWT token in localStorage
      localStorage.setItem('token', data.token);
      // Redirect to the dashboard after successful login
      router.push('/dashboard');
    } else {
      // Show error if login failed
      alert(data.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left Section (Image and Quote) */}
        <div className="hidden md:flex flex-col items-start justify-end p-10 w-1/2 relative bg-cover bg-center"
             style={{ backgroundImage: "url('https://i.postimg.cc/LsYzVdc8/premium-vector-1711987681684-5f80c7411b0e.avif')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <div className="relative z-10 text-white">
            <p className="text-3xl font-semibold leading-relaxed mb-4">
              &quot;Organize, Prioritize, and Achieve — One Task at a Time!&quot;
            </p>
            <p className="text-lg font-medium">Bayzid Alim</p>
            <p className="text-sm text-gray-300">Intern Candidate, Softbeez</p>
          </div>
        </div>

        {/* Right Section (Login Form) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome back!</h2>
          <p className="text-gray-600 text-center mb-8">
            Build your design system effortlessly with our powerful component library.
          </p>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
              placeholder="alex.jordan@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}  // Disable button while loading
            className={`w-full ${loading ? 'bg-gray-500' : 'bg-indigo-600'} hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
          >
            {loading ? 'Processing...' : 'Log In'}
          </button>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
