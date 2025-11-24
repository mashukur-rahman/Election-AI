"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function ResearchResultsPage() {
  const params = useParams();
  const candidateName = decodeURIComponent(params.name as string);
  const [isResearching, setIsResearching] = useState(true);

  // Mock data - in real app, this would come from the AI agent
  const mockResearchData = {
    summary: "এই প্রার্থী সম্পর্কে আমাদের AI গবেষণা এজেন্ট ইন্টারনেট জুড়ে বিস্তারিত তথ্য সংগ্রহ করেছে। নিচে গুরুত্বপূর্ণ তথ্যসমূহ উপস্থাপন করা হয়েছে।",
    articles: [
      {
        title: "প্রার্থীর রাজনৈতিক ইতিহাস",
        source: "প্রথম আলো",
        date: "২০২৪-০১-১৫",
        content: "এই প্রার্থী দীর্ঘদিন ধরে রাজনীতিতে সক্রিয় রয়েছেন। তিনি বিভিন্ন সময়ে গুরুত্বপূর্ণ পদে দায়িত্ব পালন করেছেন।",
        url: "#"
      },
      {
        title: "নির্বাচনী এলাকায় উন্নয়ন কাজ",
        source: "বাংলাদেশ প্রতিদিন",
        date: "২০২৪-০২-১০",
        content: "প্রার্থী তার নির্বাচনী এলাকায় বিভিন্ন উন্নয়নমূলক কাজ করেছেন। শিক্ষা, স্বাস্থ্য এবং অবকাঠামো উন্নয়নে তার অবদান রয়েছে।",
        url: "#"
      },
      {
        title: "দলীয় অবস্থান এবং নীতি",
        source: "দৈনিক যুগান্তর",
        date: "২০২৪-০৩-০৫",
        content: "প্রার্থী তার দলের মূল নীতিসমূহ সমর্থন করেন এবং দলের বিভিন্ন কর্মসূচিতে সক্রিয় অংশগ্রহণ করেন।",
        url: "#"
      }
    ],
    keyPoints: [
      "দীর্ঘদিনের রাজনৈতিক অভিজ্ঞতা",
      "নির্বাচনী এলাকায় উন্নয়নমূলক কাজ",
      "শিক্ষা ও স্বাস্থ্য খাতে অবদান",
      "দলীয় নীতির সাথে সামঞ্জস্যপূর্ণ"
    ],
    statistics: {
      totalArticles: 15,
      positiveSentiment: 65,
      neutralSentiment: 25,
      negativeSentiment: 10
    }
  };

  // Simulate research completion
  setTimeout(() => {
    setIsResearching(false);
  }, 2000);

  return (
    <div className="min-h-screen bg-pastel-yellow">
      {/* Header */}
      <header className="border-b-2 border-green-bd bg-pastel-yellow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/dashboard" className="text-2xl font-bold text-red-bd">
              নাগরিক সংবাদ
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
                href="/dashboard" 
                className="px-4 py-2 text-green-bd hover:underline font-medium"
              >
                ড্যাশবোর্ড
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-red-bd mb-2">
              গবেষণা ফলাফল
            </h1>
            <p className="text-xl text-gray-700">
              প্রার্থী: <span className="font-semibold text-green-bd">{candidateName}</span>
            </p>
          </div>

          {isResearching ? (
            <div className="bg-white border-2 border-green-bd rounded-lg p-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-bd border-t-transparent mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-red-bd mb-2">
                গবেষণা চলছে...
              </h2>
              <p className="text-gray-600">
                আমাদের AI এজেন্ট ইন্টারনেট জুড়ে প্রার্থী সম্পর্কে তথ্য সংগ্রহ করছে
              </p>
            </div>
          ) : (
            <>
              {/* Summary Section */}
              <div className="bg-white border-2 border-red-bd rounded-lg p-6 mb-6 shadow-lg">
                <h2 className="text-2xl font-bold text-red-bd mb-4">
                  সারসংক্ষেপ
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {mockResearchData.summary}
                </p>
              </div>

              {/* Statistics */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border-2 border-green-bd rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-bd mb-1">
                    {mockResearchData.statistics.totalArticles}
                  </div>
                  <div className="text-sm text-gray-600">মোট নিবন্ধ</div>
                </div>
                <div className="bg-white border-2 border-green-bd rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-bd mb-1">
                    {mockResearchData.statistics.positiveSentiment}%
                  </div>
                  <div className="text-sm text-gray-600">ইতিবাচক</div>
                </div>
                <div className="bg-white border-2 border-red-bd rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-bd mb-1">
                    {mockResearchData.statistics.neutralSentiment}%
                  </div>
                  <div className="text-sm text-gray-600">নিরপেক্ষ</div>
                </div>
                <div className="bg-white border-2 border-red-bd rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-bd mb-1">
                    {mockResearchData.statistics.negativeSentiment}%
                  </div>
                  <div className="text-sm text-gray-600">নেতিবাচক</div>
                </div>
              </div>

              {/* Key Points */}
              <div className="bg-white border-2 border-green-bd rounded-lg p-6 mb-6 shadow-lg">
                <h2 className="text-2xl font-bold text-green-bd mb-4">
                  মূল বিষয়সমূহ
                </h2>
                <ul className="space-y-2">
                  {mockResearchData.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-bd font-bold mt-1">•</span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Articles Section */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-red-bd mb-4">
                  সংগ্রহীত নিবন্ধসমূহ
                </h2>
                <div className="space-y-4">
                  {mockResearchData.articles.map((article, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:border-green-bd transition-colors shadow-md"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-red-bd">
                          {article.title}
                        </h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {article.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-medium text-green-bd">
                          {article.source}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {article.content}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-bd hover:underline font-medium text-sm"
                      >
                        সম্পূর্ণ নিবন্ধ পড়ুন →
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center mt-8">
                <Link
                  href="/dashboard/create-profile"
                  className="px-6 py-3 border-2 border-red-bd text-red-bd rounded-lg hover:bg-red-bd hover:text-white font-semibold"
                >
                  নতুন প্রোফাইল তৈরি করুন
                </Link>
                <Link
                  href="/dashboard"
                  className="px-6 py-3 bg-green-bd text-white rounded-lg hover:bg-opacity-90 font-semibold"
                >
                  ড্যাশবোর্ডে ফিরে যান
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

