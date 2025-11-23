"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement actual logout
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-pastel-yellow">
      {/* Header */}
      <header className="border-b-2 border-green-bd bg-pastel-yellow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/dashboard" className="text-2xl font-bold text-red-bd">
              গণতন্ত্রের জন্য
            </Link>
            <div className="flex items-center gap-4 flex-1 max-w-md justify-center">
              <form 
                action="/search" 
                method="get"
                className="flex-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const query = formData.get("q") as string;
                  if (query?.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                  }
                }}
              >
                <div className="relative">
                  <input
                    type="text"
                    name="q"
                    placeholder="প্রার্থী খুঁজুন..."
                    className="w-full px-4 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-bd hover:text-opacity-80"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard/create-profile" 
                className="px-4 py-2 bg-green-bd text-white rounded-md hover:bg-opacity-90 font-medium"
              >
                নতুন প্রোফাইল তৈরি করুন
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-bd hover:underline font-medium"
              >
                লগআউট
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-red-bd mb-8 text-center">
            ড্যাশবোর্ড
          </h1>

          <div className="bg-white border-2 border-red-bd rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-green-bd mb-4">
              স্বাগতম!
            </h2>
            <p className="text-gray-700 mb-6">
              সাংসদ প্রার্থীদের প্রোফাইল তৈরি করুন এবং আমাদের AI গবেষণা এজেন্টের মাধ্যমে 
              তাদের সম্পর্কে বিস্তারিত তথ্য সংগ্রহ করুন।
            </p>
            <Link
              href="/dashboard/create-profile"
              className="inline-block px-6 py-3 bg-green-bd text-white rounded-lg hover:bg-opacity-90 font-semibold"
            >
              নতুন প্রোফাইল তৈরি করুন
            </Link>
          </div>

          {/* Placeholder for candidate profiles list */}
          <div className="bg-white border-2 border-green-bd rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-red-bd mb-4">
              আপনার প্রোফাইলসমূহ
            </h2>
            <p className="text-gray-600 text-center py-8">
              এখনও কোন প্রোফাইল তৈরি করা হয়নি। প্রথম প্রোফাইল তৈরি করতে 
              "নতুন প্রোফাইল তৈরি করুন" বাটনে ক্লিক করুন।
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

