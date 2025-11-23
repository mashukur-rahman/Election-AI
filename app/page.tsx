"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-pastel-yellow">
      {/* Header */}
      <header className="border-b-2 border-green-bd bg-pastel-yellow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-bold text-red-bd">
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
            <nav className="flex gap-4">
              <Link 
                href="/login" 
                className="px-4 py-2 text-green-bd hover:underline font-medium"
              >
                লগইন
              </Link>
              <Link 
                href="/register" 
                className="px-4 py-2 bg-green-bd text-white rounded-md hover:bg-opacity-90 font-medium"
              >
                নিবন্ধন
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-red-bd">
            সাংসদ প্রার্থীদের সম্পর্কে জানুন
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            আমাদের AI গবেষণা এজেন্ট ইন্টারনেট জুড়ে খুঁজে বের করবে এবং 
            সাংসদ প্রার্থীদের সম্পর্কে গুরুত্বপূর্ণ তথ্য সংগ্রহ করে উপস্থাপন করবে
          </p>
          
          <div className="flex gap-4 justify-center mt-12">
            <Link 
              href="/register"
              className="px-8 py-3 bg-green-bd text-white rounded-lg hover:bg-opacity-90 font-semibold text-lg shadow-lg"
            >
              শুরু করুন
            </Link>
            <Link 
              href="/login"
              className="px-8 py-3 border-2 border-red-bd text-red-bd rounded-lg hover:bg-white hover:text-green-bd hover:border-green-bd font-semibold text-lg transition-colors"
            >
              লগইন করুন
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-red-bd rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-red-bd rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl">📋</span>
            </div>
            <h3 className="text-xl font-bold text-red-bd mb-3">প্রোফাইল তৈরি করুন</h3>
            <p className="text-gray-700">
              সাংসদ প্রার্থীদের প্রোফাইল তৈরি করুন নাম, ছবি, নির্বাচনী এলাকা এবং 
              দলীয় সম্পর্ক সহ
            </p>
          </div>

          <div className="bg-white border-2 border-green-bd rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-green-bd rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-green-bd mb-3">গভীর গবেষণা</h3>
            <p className="text-gray-700">
              আমাদের AI এজেন্ট ইন্টারনেট জুড়ে প্রার্থীদের সম্পর্কে 
              নিবন্ধ এবং তথ্য খুঁজে বের করবে
            </p>
          </div>

          <div className="bg-white border-2 border-red-bd rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-red-bd rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-red-bd mb-3">সারসংক্ষেপ দেখুন</h3>
            <p className="text-gray-700">
              গবেষণার ফলাফল সংক্ষিপ্ত এবং সুসংগঠিতভাবে দেখুন 
              যাতে সহজেই বুঝতে পারেন
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t-2 border-green-bd bg-pastel-yellow py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© ২০২৪ গণতন্ত্রের জন্য - একটি সিভিক টেক প্ল্যাটফর্ম</p>
        </div>
      </footer>
    </div>
  );
}
