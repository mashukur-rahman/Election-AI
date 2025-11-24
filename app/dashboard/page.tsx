"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import UploadPostModal from "../components/UploadPostModal";
import PostCard from "../components/PostCard";

interface Post {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  caption: string;
  type: 'incident' | 'user';
  mediaType: 'image' | 'video';
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'জেলা নির্বাচন সমাবেশ',
      date: '२४ नवेम्बर, २०२५',
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=400&fit=crop',
      caption: 'জেলার প্রধান নির্বাচন সমাবেশে হাজার হাজার সমর্থক জমায়েত হয়েছেন। প্রার্থীরা স্থানীয় সমস্যা এবং উন্নয়ন পরিকল্পনা নিয়ে কথা বলেছেন।',
      type: 'incident',
      mediaType: 'image',
    },
    {
      id: '2',
      title: 'স্থানীয় উন্নয়ন কর্মসূচি ঘোষণা',
      date: '२२ नवेम्बर, २०२५',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=400&fit=crop',
      caption: 'প্রার্থীরা স্থানীয় সড়ক, শিক্ষা প্রতিষ্ঠান এবং স্বাস্থ্যসেবা কেন্দ্র উন্নয়নের জন্য একটি ব্যাপক পরিকল্পনা ঘোষণা করেছেন। এই প্রকল্পে ১০ কোটি টাকা বরাদ্দ করা হবে।',
      type: 'incident',
      mediaType: 'image',
    },
    {
      id: '3',
      title: 'যুবক-যুবতীদের সাথে সংলাপ কর্মসূচি',
      date: '२० नवेम्बर, २०२५',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
      caption: 'নির্বাচিত প্রার্থী স্থানীয় কলেজ ও বিশ্ববিদ্যালয়ের শিক্ষার্থীদের সাথে একটি আলোচনা সভার আয়োজন করেছেন। শিক্ষা, কর্মসংস্থান এবং পরিবেশ সংরক্ষণ বিষয়ে আলোচনা করা হয়েছে।',
      type: 'incident',
      mediaType: 'image',
    },
    {
      id: '4',
      title: 'মহিলা ক্ষমতায়ন উদ্যোগ',
      date: '१८ नवंबर, २०२५',
      imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=400&fit=crop',
      caption: 'নারী সমাজের উন্নয়নের জন্য প্রার্থী একটি বিশেষ প্রশিক্ষণ এবং আর্থিক সহায়তা প্রোগ্রাম চালু করার ঘোষণা দিয়েছেন। এই প্রোগ্রাম মহিলা উদ্যোক্তাদের সহায়তা করবে।',
      type: 'incident',
      mediaType: 'image',
    },
  ]);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleUploadSubmit = async (caption: string, file: File) => {
    setIsVerifying(true);

    // Create preview URL
    const fileUrl = URL.createObjectURL(file);

    // Determine media type based on MIME type
    const mediaType: 'image' | 'video' = file.type.startsWith('video/') ? 'video' : 'image';

    // Simulate AI verification for 15 seconds
    await new Promise((resolve) => setTimeout(resolve, 15000));

    // Create new post
    const newPost: Post = {
      id: Date.now().toString(),
      title: 'ব্যবহারকারী দ্বারা পোস্ট করা',
      date: new Date().toLocaleDateString('bn-BD'),
      imageUrl: fileUrl,
      caption: caption,
      type: 'user',
      mediaType: mediaType,
    };

    // Add to the beginning of posts array
    setPosts([newPost, ...posts]);

    setIsVerifying(false);
    setIsModalOpen(false);
  };

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
                href="/dashboard/profile"
                className="px-4 py-2 bg-green-bd text-white rounded-md hover:bg-opacity-90 font-medium flex items-center gap-2"
              >
                👤 আপনার প্রোফাইল
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
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Feed Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-red-bd mb-2 text-center">
              নির্বাচন সংবাদ ফিড
            </h1>
            <p className="text-center text-gray-600">
              সর্বশেষ নির্বাচন সংক্রান্ত সংবাদ এবং ঘটনা
            </p>
          </div>

          {/* Create Post Section */}
          <div className="bg-white border-2 border-green-bd rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-red-bd mb-4">নতুন অভিজ্ঞতা শেয়ার করুন</h2>
            <p className="text-gray-600 text-sm mb-4">
              নির্বাচন সংক্রান্ত ঘটনা এবং ছবি/ভিডিও শেয়ার করুন সম্প্রদায়ের সাথে।
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isVerifying}
              className="w-full px-6 py-3 bg-green-bd text-white font-medium rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              📸 ছবি বা ভিডিও আপলোড করুন
            </button>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                date={post.date}
                imageUrl={post.imageUrl}
                caption={post.caption}
                mediaType={post.mediaType}
                imageAlt={post.title}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      <UploadPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUploadSubmit}
        isLoading={isVerifying}
      />
    </div>
  );
}
