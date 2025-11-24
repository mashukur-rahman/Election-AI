'use client';

import { useState, useRef, useEffect } from 'react';

interface UploadPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (caption: string, file: File) => void;
  isLoading: boolean;
}

export default function UploadPostModal({ isOpen, onClose, onSubmit, isLoading }: UploadPostModalProps) {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

  useEffect(() => {
    if (!isOpen) {
      // Cleanup on close
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    }
  }, [isOpen, preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError('');

    if (selectedFile) {
      // Validate file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('ফাইলের আকার ১০০ এমবির বেশি হতে পারবে না। দয়া করে একটি ছোট ফাইল নির্বাচন করুন।');
        return;
      }

      setFile(selectedFile);

      // Create preview URL
      try {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
      } catch (err) {
        setError('ফাইল প্রিভিউ তৈরি করতে ত্রুটি হয়েছে।');
        console.error('Preview error:', err);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && caption.trim()) {
      onSubmit(caption, file);
      // Reset form after submission
      setTimeout(() => {
        setCaption('');
        setFile(null);
        if (preview?.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 500);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setCaption('');
      setFile(null);
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);
      setError('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay with very light opacity */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 border-2 border-green-bd">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-red-bd">নতুন পোস্ট তৈরি করুন</h2>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="text-gray-500 hover:text-gray-700 text-2xl disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
            {/* Caption Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ঘটনার বর্ণনা লিখুন
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                disabled={isLoading}
                placeholder="নির্বাচন সংক্রান্ত ঘটনা বা সংবাদ লিখুন..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-bd focus:border-green-bd disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                rows={4}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ছবি বা ভিডিও আপলোড করুন
              </label>
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border-2 border-dashed border-green-bd rounded-lg text-green-bd hover:bg-green-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  📁 ফাইল বেছে নিন
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-bd mt-2 bg-red-50 p-2 rounded border-l-4 border-red-bd">
                  ⚠️ {error}
                </p>
              )}
              {file && !isLoading && !error && (
                <p className="text-sm text-green-bd mt-2 bg-green-50 p-2 rounded">
                  ✓ নির্বাচিত: {file.name}
                </p>
              )}
            </div>

            {/* Preview */}
            {preview && !error && (
              <div className="relative bg-gray-900 rounded-lg overflow-hidden max-h-48">
                {file?.type.startsWith('image/') ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <video
                    src={preview}
                    controls
                    className="w-full h-auto bg-black rounded-lg"
                    style={{ maxHeight: '200px' }}
                  />
                )}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="animate-spin mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-blue-600 mb-1">AI যাচাইকরণ চলছে...</p>
                <p className="text-xs text-gray-600">আপনার পোস্ট যাচাই করা হচ্ছে</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!file || !caption.trim() || isLoading}
              className="w-full px-4 py-3 bg-green-bd text-white font-medium rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? 'যাচাই করা হচ্ছে...' : 'পোস্ট করুন'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
