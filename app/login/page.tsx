"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    // For now, just redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-pastel-yellow flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href="/" className="text-2xl font-bold text-red-bd block text-center mb-2">
            গণতন্ত্রের জন্য
          </Link>
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
            লগইন করুন
          </h2>
          <p className="text-center text-gray-600">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="appearance-none relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                placeholder="আপনার ইমেইল দিন"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="appearance-none relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                placeholder="আপনার পাসওয়ার্ড দিন"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-bd hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-bd"
            >
              লগইন করুন
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              অ্যাকাউন্ট নেই?{" "}
              <Link href="/register" className="font-medium text-green-bd hover:underline">
                নিবন্ধন করুন
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

