"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function CandidateProfilePage() {
  const params = useParams();
  const candidateId = params.id as string;

  // Mock candidate data - in real app, this would come from API
  const mockCandidateData = {
    id: candidateId,
    name: "আহমেদ হাসান",
    party: "আওয়ামী লীগ",
    constituency: "ঢাকা-১০",
    district: "ঢাকা",
    constituencyNumber: "১০",
    partyPosition: "সাধারণ সম্পাদক",
    education: "এম.এ. (রাজনীতি বিজ্ঞান), ঢাকা বিশ্ববিদ্যালয়",
    profession: "রাজনীতিবিদ",
    previousPositions: "সাবেক সংসদ সদস্য, ঢাকা-১০ (২০১৪-২০১৮)",
    contactEmail: "ahmed.hasan@example.com",
    contactPhone: "+880 1234 567890",
    website: "https://example.com",
    socialMedia: "Facebook: @ahmedhasan",
    manifesto: "শিক্ষা, স্বাস্থ্য এবং অবকাঠামো উন্নয়নে বিশেষ গুরুত্ব দেওয়া হবে।",
    photo: null,
  };

  // Mock research data
  const researchData = {
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
                href="/dashboard" 
                className="px-4 py-2 text-green-bd hover:underline font-medium"
              >
                ড্যাশবোর্ড
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Candidate Profile Header */}
          <div className="bg-white border-2 border-red-bd rounded-lg p-8 mb-6 shadow-lg">
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                {mockCandidateData.photo ? (
                  <img
                    src={mockCandidateData.photo}
                    alt={mockCandidateData.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-5xl text-gray-400">👤</span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-red-bd mb-4">
                  {mockCandidateData.name}
                </h1>
                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p className="mb-2">
                      <span className="font-semibold text-green-bd">রাজনৈতিক দল:</span> {mockCandidateData.party}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold text-green-bd">নির্বাচনী এলাকা:</span> {mockCandidateData.constituency}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold text-green-bd">জেলা:</span> {mockCandidateData.district}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">
                      <span className="font-semibold text-green-bd">দলীয় পদ:</span> {mockCandidateData.partyPosition}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold text-green-bd">শিক্ষা:</span> {mockCandidateData.education}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold text-green-bd">পেশা:</span> {mockCandidateData.profession}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Research Results Section */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-red-bd mb-6">
              AI গবেষণা ফলাফল
            </h2>

            {/* Summary */}
            <div className="bg-white border-2 border-red-bd rounded-lg p-6 mb-6 shadow-lg">
              <h3 className="text-2xl font-bold text-red-bd mb-4">
                সারসংক্ষেপ
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {researchData.summary}
              </p>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white border-2 border-green-bd rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-bd mb-1">
                  {researchData.statistics.totalArticles}
                </div>
                <div className="text-sm text-gray-600">মোট নিবন্ধ</div>
              </div>
              <div className="bg-white border-2 border-green-bd rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-bd mb-1">
                  {researchData.statistics.positiveSentiment}%
                </div>
                <div className="text-sm text-gray-600">ইতিবাচক</div>
              </div>
              <div className="bg-white border-2 border-red-bd rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-bd mb-1">
                  {researchData.statistics.neutralSentiment}%
                </div>
                <div className="text-sm text-gray-600">নিরপেক্ষ</div>
              </div>
              <div className="bg-white border-2 border-red-bd rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-bd mb-1">
                  {researchData.statistics.negativeSentiment}%
                </div>
                <div className="text-sm text-gray-600">নেতিবাচক</div>
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-white border-2 border-green-bd rounded-lg p-6 mb-6 shadow-lg">
              <h3 className="text-2xl font-bold text-green-bd mb-4">
                মূল বিষয়সমূহ
              </h3>
              <ul className="space-y-2">
                {researchData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-bd font-bold mt-1">•</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Articles */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-red-bd mb-4">
                সংগ্রহীত নিবন্ধসমূহ
              </h3>
              <div className="space-y-4">
                {researchData.articles.map((article, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:border-green-bd transition-colors shadow-md"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-xl font-bold text-red-bd">
                        {article.title}
                      </h4>
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
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Link
              href="/search"
              className="px-6 py-3 border-2 border-red-bd text-red-bd rounded-lg hover:bg-red-bd hover:text-white font-semibold"
            >
              আরও প্রার্থী খুঁজুন
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-green-bd text-white rounded-lg hover:bg-opacity-90 font-semibold"
            >
              ড্যাশবোর্ডে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

