"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    photo: null as File | null,
    constituency: "",
    constituencyNumber: "",
    district: "",
    party: "",
    partyPosition: "",
    previousPositions: "",
    education: "",
    profession: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    socialMedia: "",
    manifesto: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission
    // For now, redirect to research results page
    router.push(`/dashboard/research/${encodeURIComponent(formData.name)}`);
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-red-bd mb-8 text-center">
            সাংসদ প্রার্থীর প্রোফাইল তৈরি করুন
          </h1>

          <form onSubmit={handleSubmit} className="bg-white border-2 border-green-bd rounded-lg p-8 shadow-lg">
            {/* Photo Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ছবি
              </label>
              <div className="flex items-center gap-4">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                    <span>ছবি</span>
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-bd file:text-white hover:file:bg-opacity-90"
                  />
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG বা GIF (সর্বোচ্চ 5MB)</p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                  placeholder="প্রার্থীর নাম"
                />
              </div>

              <div>
                <label htmlFor="party" className="block text-sm font-medium text-gray-700 mb-1">
                  রাজনৈতিক দল <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="party"
                  required
                  value={formData.party}
                  onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                  placeholder="রাজনৈতিক দলের নাম"
                />
              </div>
            </div>

            {/* Constituency Information */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-red-bd mb-4">নির্বাচনী এলাকা</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                    জেলা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="district"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                    placeholder="জেলার নাম"
                  />
                </div>
                <div>
                  <label htmlFor="constituency" className="block text-sm font-medium text-gray-700 mb-1">
                    নির্বাচনী এলাকা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="constituency"
                    required
                    value={formData.constituency}
                    onChange={(e) => setFormData({ ...formData, constituency: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                    placeholder="এলাকার নাম"
                  />
                </div>
                <div>
                  <label htmlFor="constituencyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    নির্বাচনী এলাকা নম্বর
                  </label>
                  <input
                    type="text"
                    id="constituencyNumber"
                    value={formData.constituencyNumber}
                    onChange={(e) => setFormData({ ...formData, constituencyNumber: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                    placeholder="এলাকা নম্বর"
                  />
                </div>
              </div>
            </div>

            {/* Party Position */}
            <div className="mb-6">
              <label htmlFor="partyPosition" className="block text-sm font-medium text-gray-700 mb-1">
                দলীয় পদ
              </label>
              <input
                type="text"
                id="partyPosition"
                value={formData.partyPosition}
                onChange={(e) => setFormData({ ...formData, partyPosition: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                placeholder="যেমন: সাধারণ সম্পাদক, সভাপতি ইত্যাদি"
              />
            </div>

            {/* Background Information */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-red-bd mb-4">ব্যক্তিগত তথ্য</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                    শিক্ষাগত যোগ্যতা
                  </label>
                  <input
                    type="text"
                    id="education"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                    placeholder="শিক্ষাগত যোগ্যতা"
                  />
                </div>
                <div>
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                    পেশা
                  </label>
                  <input
                    type="text"
                    id="profession"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                    placeholder="পেশা"
                  />
                </div>
              </div>
            </div>

            {/* Previous Positions */}
            <div className="mb-6">
              <label htmlFor="previousPositions" className="block text-sm font-medium text-gray-700 mb-1">
                পূর্ববর্তী পদ/পদবী
              </label>
              <textarea
                id="previousPositions"
                rows={3}
                value={formData.previousPositions}
                onChange={(e) => setFormData({ ...formData, previousPositions: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                placeholder="পূর্ববর্তী পদ/পদবীর বিবরণ"
              />
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-red-bd mb-4">যোগাযোগের তথ্য</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    ইমেইল
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                    placeholder="ইমেইল ঠিকানা"
                  />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    ফোন নম্বর
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                    placeholder="ফোন নম্বর"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    ওয়েবসাইট
                  </label>
                  <input
                    type="url"
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-700 mb-1">
                    সোশ্যাল মিডিয়া
                  </label>
                  <input
                    type="text"
                    id="socialMedia"
                    value={formData.socialMedia}
                    onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                    placeholder="Facebook, Twitter লিঙ্ক"
                  />
                </div>
              </div>
            </div>

            {/* Manifesto */}
            <div className="mb-6">
              <label htmlFor="manifesto" className="block text-sm font-medium text-gray-700 mb-1">
                নির্বাচনী ইশতেহার/ম্যানিফেস্টো
              </label>
              <textarea
                id="manifesto"
                rows={5}
                value={formData.manifesto}
                onChange={(e) => setFormData({ ...formData, manifesto: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd"
                placeholder="নির্বাচনী ইশতেহার বা মূল প্রতিশ্রুতিসমূহ"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 justify-end">
              <Link
                href="/dashboard"
                className="px-6 py-3 border-2 border-red-bd text-red-bd rounded-lg hover:bg-red-bd hover:text-white font-semibold"
              >
                বাতিল
              </Link>
              <button
                type="submit"
                className="px-6 py-3 bg-green-bd text-white rounded-lg hover:bg-opacity-90 font-semibold"
              >
                প্রোফাইল তৈরি করুন এবং গবেষণা শুরু করুন
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

