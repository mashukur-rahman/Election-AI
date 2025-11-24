'use client';

interface PostCardProps {
  title: string;
  date: string;
  imageUrl: string;
  caption: string;
  mediaType: 'image' | 'video';
  imageAlt?: string;
}

export default function PostCard({ title, date, imageUrl, caption, mediaType, imageAlt = "Post image" }: PostCardProps) {
  const isVideo = mediaType === 'video';

  return (
    <div className="bg-white border-2 border-green-bd rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="p-4 border-b-2 border-gray-200">
        <h3 className="text-lg font-bold text-red-bd">{title}</h3>
        <p className="text-sm text-gray-600">{date}</p>
      </div>

      {/* Media Container */}
      <div className="relative bg-black h-80 w-full flex items-center justify-center overflow-hidden">
        {isVideo ? (
          <video
            src={imageUrl}
            controls
            controlsList="nodownload"
            className="w-full h-full object-contain"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          >
            আপনার ব্রাউজার ভিডিও প্লেব্যাক সমর্থন করে না।
          </video>
        ) : (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2UwZTBlMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
            }}
          />
        )}
      </div>

      {/* Caption */}
      <div className="p-4">
        <p className="text-gray-800 mb-4">
          {caption}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 text-sm">
          <button className="flex items-center gap-2 text-red-bd hover:text-red-600 font-medium transition">
            👍 পছন্দ করুন
          </button>
          <button className="flex items-center gap-2 text-green-bd hover:text-green-600 font-medium transition">
            💬 মন্তব্য করুন
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition">
            🔗 শেয়ার করুন
          </button>
        </div>
      </div>
    </div>
  );
}
