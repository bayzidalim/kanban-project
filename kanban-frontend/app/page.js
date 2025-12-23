'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// --- ShadCN Imports ---
import { Input } from '@/components/ui/input'; // For input fields
import { Button } from '@/components/ui/button'; // For the login button
import { Label } from '@/components/ui/label'; // For labels associated with inputs
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // For the main login card
// --- End ShadCN Imports ---

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } else {
      alert(data.error || 'Login failed');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        className="flex bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Section (Image and Quote) */}
        <motion.div
          className="hidden md:flex flex-col items-start justify-end p-10 w-1/2 relative bg-cover bg-center"
          style={{ backgroundImage: "url('https://i.postimg.cc/LsYzVdc8/premium-vector-1711987681684-5f80c7411b0e.avif')" }}
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <motion.div variants={itemVariants} className="relative z-10 text-white">
            <p className="text-3xl font-semibold leading-relaxed mb-4">
              &quot;Organize, Prioritize, and Achieve — One Task at a Time!&quot;
            </p>
            <p className="text-lg font-medium">Bayzid Alim</p>
            <p className="text-sm text-gray-300">Intern Candidate, Softbeez</p>
          </motion.div>
        </motion.div>

        {/* Right Section (Login Form) */}
        <motion.div
          className="w-full md:w-1/2 p-8 flex flex-col justify-center"
          variants={itemVariants}
        >
          {/* Using ShadCN Card components for the form section */}
          <Card className="border-none shadow-none"> {/* No border or shadow as the parent div already handles it */}
            <CardHeader className="text-center pb-4">
              <motion.div variants={itemVariants}>
                <CardTitle className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</CardTitle>
              </motion.div>
              <motion.div variants={itemVariants}>
                <CardDescription className="text-gray-600">
                  Build your design system effortlessly with our powerful component library.
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div variants={itemVariants} className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="alex.jordan@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </motion.div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-4">
              <motion.div variants={itemVariants} className="w-full">
                <Button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full" // Make the button full width
                  // ShadCN Button handles its own styling, you might need to adjust variants if you want different styles
                  // You can add className for custom tailwind if needed
                >
                  {loading ? 'Processing...' : 'Log In'}
                </Button>
              </motion.div>
              <motion.p variants={itemVariants} className="mt-2 text-center text-gray-600 text-sm">
                Don&apos;t have an account?{' '}
                <a href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Sign up
                </a>
              </motion.p>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}