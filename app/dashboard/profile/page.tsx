'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import PostCard from '../../components/PostCard';

interface UserPost {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  caption: string;
  type: 'incident' | 'user';
  mediaType: 'image' | 'video';
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isLoggedIn } = useAuth();
  const [userPosts, setUserPosts] = useState<UserPost[]>([
    {
      id: '101',
      title: 'ব্যবহারকারী দ্বারা পোস্ট করা',
      date: '২৪ নভেম্বর, २०२५',
      imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=400&fit=crop',
      caption: 'আমাদের এলাকায় রাস্তার দুর্ভাগ্যজনক অবস্থা। স্থানীয় প্রশাসনের দ্রুত সাড়া দেওয়া উচিত। এটি আমাদের সম্প্রদায়ের জন্য একটি গুরুত্বপূর্ণ বিষয়।',
      type: 'user',
      mediaType: 'image',
    },
    {
      id: '102',
      title: 'ব্যবহারকারী দ্বারা পোস্ট করা',
      date: '२१ नवेम्बर, २०२५',
      imageUrl: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=500&h=400&fit=crop',
      caption: 'স্কুলে নতুন শিক্ষা উপকরণ দান করেছি। শিক্ষা আমাদের ভবিষ্যত। সকল শিক্ষার্থীর জন্য সমান শিক্ষার সুযোগ থাকা উচিত।',
      type: 'user',
      mediaType: 'image',
    },
  ]);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-pastel-yellow">
      {/* Header */}
      <header className="border-b-2 border-green-bd bg-pastel-yellow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/dashboard" className="text-2xl font-bold text-red-bd">
              নাগরিক সংবাদ
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-green-bd hover:text-green-600 font-medium"
              >
                ফিডে ফিরুন
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
          {/* Profile Section */}
          <div className="bg-white border-2 border-green-bd rounded-lg shadow-lg overflow-hidden mb-8">
            {/* Cover Image */}
            <div className="h-40 bg-gradient-to-r from-red-bd to-green-bd"></div>

            {/* Profile Info */}
            <div className="px-6 pb-6">
              {/* Profile Picture */}
              <div className="flex items-end gap-4 -mt-20 mb-4">
                <img
                  src={user.profilePicture || 'https://via.placeholder.com/150'}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <div className="flex-1 pb-2">
                  <h1 className="text-3xl font-bold text-red-bd">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              {/* Bio and Info */}
              <div className="mt-6">
                <p className="text-gray-800 mb-4 leading-relaxed">
                  {user.bio}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 border-t-2 border-gray-200 pt-4">
                  <div className="bg-pastel-yellow p-3 rounded-lg">
                    <p className="text-sm text-gray-600">জেলা</p>
                    <p className="text-lg font-semibold text-red-bd">{user.district}</p>
                  </div>
                  <div className="bg-pastel-yellow p-3 rounded-lg">
                    <p className="text-sm text-gray-600">যোগদান তারিখ</p>
                    <p className="text-lg font-semibold text-green-bd">{user.joinDate}</p>
                  </div>
                  <div className="bg-pastel-yellow p-3 rounded-lg">
                    <p className="text-sm text-gray-600">মোট পোস্ট</p>
                    <p className="text-lg font-semibold text-red-bd">{userPosts.length}</p>
                  </div>
                  <div className="bg-pastel-yellow p-3 rounded-lg">
                    <p className="text-sm text-gray-600">অনুসরণকারী</p>
                    <p className="text-lg font-semibold text-green-bd">২৩৪</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Posts Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-bd mb-6">আমার পোস্ট</h2>

            {userPosts.length > 0 ? (
              <div className="space-y-6">
                {userPosts.map((post) => (
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
            ) : (
              <div className="bg-white border-2 border-green-bd rounded-lg p-12 text-center shadow-lg">
                <p className="text-gray-600 text-lg">
                  আপনি এখনো কোন পোস্ট করেননি। নতুন অভিজ্ঞতা শেয়ার করুন!
                </p>
                <Link
                  href="/dashboard"
                  className="inline-block mt-4 px-6 py-3 bg-green-bd text-white rounded-lg hover:bg-opacity-90 font-semibold"
                >
                  ফিডে যান
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
