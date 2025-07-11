'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface ShortVideo {
    title: string;
    videoId: string;
    publishedAt: string;
    thumbnail: string;
    url: string;
    channelTitle: string;
}

export default function ShortsFeed() {
    const [shorts, setShorts] = useState<ShortVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<ShortVideo | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchShorts = async () => {
            try {
                const response = await axios.get('/api/getSip');
                setShorts(response.data.shorts);
            } catch (error) {
                console.error('Error fetching shorts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchShorts();
    }, []);

    const formatPublishedDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return `${Math.floor(diffInDays / 7)}w ago`;
    };

    const openVideoPlayer = (video: ShortVideo, index: number) => {
        setSelectedVideo(video);
        setCurrentIndex(index);
    };

    const closeVideoPlayer = () => {
        setSelectedVideo(null);
    };

    const nextVideo = () => {
        if (currentIndex < shorts.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setSelectedVideo(shorts[nextIndex]);
        }
    };

    const prevVideo = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            setSelectedVideo(shorts[prevIndex]);
        }
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (!selectedVideo) return;

            switch (event.key) {
                case 'Escape':
                    closeVideoPlayer();
                    break;
                case 'ArrowRight':
                    nextVideo();
                    break;
                case 'ArrowLeft':
                    prevVideo();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedVideo, currentIndex]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Video Grid */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {shorts.map((video, index) => (
                        <div
                            key={video.videoId}
                            className="group relative rounded-2xl overflow-hidden  duration-300 cursor-pointer"
                            onClick={() => openVideoPlayer(video, index)}
                        >
                            {/* Video Thumbnail Container */}
                            <div className="relative aspect-[9/16] overflow-hidden">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    height={360}
                                    width={200}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                    unoptimized
                                />

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                    Short
                                </div>
                            </div>

                            {/* Video Info */}
                            <div className="p-4 bg-black text-white">
                                {/* Channel Info */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {video.channelTitle.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">
                                            {video.channelTitle}
                                        </p>
                                        <p className="text-xs text-white">
                                            {formatPublishedDate(video.publishedAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Video Title */}
                                <h3 className="text-sm font-medium line-clamp-3 text-gray-800 leading-relaxed">
                                    {video.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {shorts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-600 text-lg mb-2">No videos available</div>
                        <div className="text-gray-500 text-sm">Check back later for new content</div>
                    </div>
                )}
            </div>

            {/* Video Player Overlay */}
            {selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
                    {/* Close Button */}
                    <button
                        onClick={closeVideoPlayer}
                        className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-gray-300 transition-colors"
                    >
                        ✕
                    </button>

                    {/* Navigation Buttons */}
                    {currentIndex > 0 && (
                        <button
                            onClick={prevVideo}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-gray-300 transition-colors"
                        >
                            ‹
                        </button>
                    )}

                    {currentIndex < shorts.length - 1 && (
                        <button
                            onClick={nextVideo}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-gray-300 transition-colors"
                        >
                            ›
                        </button>
                    )}

                    {/* Video Player Container - 80% of screen height */}
                    <div className="flex items-center justify-center w-full h-full max-w-md mx-auto">
                        <div className="relative w-full" style={{ height: '80vh' }}>
                            {/* YouTube Embed */}
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
                                className="w-full h-full rounded-lg"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={selectedVideo.title}
                            />
                        </div>
                    </div>

                    {/* Video Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {selectedVideo.channelTitle.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        {selectedVideo.channelTitle}
                                    </p>
                                    <p className="text-xs text-gray-300">
                                        {formatPublishedDate(selectedVideo.publishedAt)}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-white text-sm font-medium leading-relaxed">
                                {selectedVideo.title}
                            </h3>
                            <p className="text-gray-300 text-xs mt-2">
                                {currentIndex + 1} of {shorts.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}