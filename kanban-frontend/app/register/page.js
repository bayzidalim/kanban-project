'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Next.js Image component for optimization

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  // Email validation (basic regex for email format)
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    // Check if email is valid
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);  // Set loading state

    // Proceed with the registration API call
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),  // No password validation
    });

    const data = await res.json();
    setLoading(false);  // Reset loading state

    if (res.ok) {
      alert('Registration successful! Please log in.');
      router.push('/'); // Redirect to login page after successful registration
    } else {
      alert(data.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">

        <div className="hidden md:flex flex-col items-start justify-end p-10 w-1/2 relative bg-cover bg-center"
             style={{ backgroundImage: "url('https://i.postimg.cc/LsYzVdc8/premium-vector-1711987681684-5f80c7411b0e.avif')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <div className="relative z-10 text-white">
            <p className="text-3xl font-semibold leading-relaxed mb-4">
              &quot;Unlock your potential with powerful tools, with SoftBeez&quot;
            </p>
            <p className="text-lg font-medium">Bayzid Alim</p>
            <p className="text-sm text-gray-300">Intern Candidate, Softbeez</p>
          </div>
        </div>

        {/* Right Section (Register Form) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Your Account</h2>
          <p className="text-gray-600 text-center mb-8">
            Join us and build your amazing projects effortlessly.
          </p>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}  
            className={`w-full ${loading ? 'bg-gray-500' : 'bg-indigo-600'} hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
