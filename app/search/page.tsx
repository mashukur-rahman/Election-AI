"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  // Mock search results - in real app, this would come from API
  const mockCandidates = [
    {
      id: "1",
      name: "আহমেদ হাসান",
      party: "আওয়ামী লীগ",
      constituency: "ঢাকা-১০",
      district: "ঢাকা",
      photo: null,
    },
    {
      id: "2",
      name: "ফাতেমা খাতুন",
      party: "বাংলাদেশ জাতীয়তাবাদী দল",
      constituency: "চট্টগ্রাম-৫",
      district: "চট্টগ্রাম",
      photo: null,
    },
    {
      id: "3",
      name: "করিম উদ্দিন",
      party: "জাতীয় পার্টি",
      constituency: "সিলেট-৩",
      district: "সিলেট",
      photo: null,
    },
  ];

  // Filter results based on query
  const filteredCandidates = query
    ? mockCandidates.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(query.toLowerCase()) ||
          candidate.party.toLowerCase().includes(query.toLowerCase()) ||
          candidate.constituency.toLowerCase().includes(query.toLowerCase()) ||
          candidate.district.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-pastel-yellow">
      {/* Header */}
      <header className="border-b-2 border-green-bd bg-pastel-yellow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-bold text-red-bd">
              নাগরিক সংবাদ
            </Link>
            <div className="flex items-center gap-4 flex-1 max-w-md justify-center">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-red-bd mb-8">
            {query ? `"${query}" এর জন্য ফলাফল` : "প্রার্থী খুঁজুন"}
          </h1>

          {!query ? (
            <div className="bg-white border-2 border-green-bd rounded-lg p-12 text-center">
              <p className="text-xl text-gray-600 mb-4">
                প্রার্থী খুঁজতে উপরের সার্চ বারে নাম, দল, বা নির্বাচনী এলাকা লিখুন
              </p>
            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="bg-white border-2 border-red-bd rounded-lg p-12 text-center">
              <p className="text-xl text-gray-600 mb-4">
                "{query}" এর জন্য কোন ফলাফল পাওয়া যায়নি
              </p>
              <p className="text-gray-500">
                অন্য কোন কীওয়ার্ড দিয়ে চেষ্টা করুন
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 mb-6">
                {filteredCandidates.length}টি ফলাফল পাওয়া গেছে
              </p>
              {filteredCandidates.map((candidate) => (
                <Link
                  key={candidate.id}
                  href={`/candidate/${candidate.id}`}
                  className="block bg-white border-2 border-gray-300 rounded-lg p-6 hover:border-green-bd transition-colors shadow-md"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      {candidate.photo ? (
                        <img
                          src={candidate.photo}
                          alt={candidate.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl text-gray-400">👤</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-red-bd mb-2">
                        {candidate.name}
                      </h3>
                      <div className="space-y-1 text-gray-700">
                        <p>
                          <span className="font-semibold">দল:</span> {candidate.party}
                        </p>
                        <p>
                          <span className="font-semibold">নির্বাচনী এলাকা:</span> {candidate.constituency}
                        </p>
                        <p>
                          <span className="font-semibold">জেলা:</span> {candidate.district}
                        </p>
                      </div>
                    </div>
                    <div className="text-green-bd">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-pastel-yellow flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-bd border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

