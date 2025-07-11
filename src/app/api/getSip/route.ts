import { NextResponse } from 'next/server';
import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY!;
const CHANNEL_IDS = [
    'UCvJJ_dzjViJCoLf5uKUTwoA', // CNBC
    'UCIALMKvObZNtJ6AmdCLP7Lg', // Bloomberg Markets and Finance
    'UCpko_-a4wgz2u_DgDgd9fqA', // Financial Times
    'UC0p5jTq6Xx_DosDFxVXnWaQ', // The Economist
    'UCEAZeUIeJs0IjQiqTCdVSIg', // Yahoo Finance
];

export async function GET() {
    // Check if API key is configured
    if (!YOUTUBE_API_KEY) {
        console.error('YouTube API key is not configured');
        return NextResponse.json(
            { error: 'YouTube API key is not configured' },
            { status: 500 }
        );
    }

    try {
        const searchPromises = CHANNEL_IDS.map(channelId =>
            axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: YOUTUBE_API_KEY,
                    channelId,
                    part: 'snippet',
                    maxResults: 5,
                    order: 'date',
                    type: 'video',
                    videoDuration: 'short',
                },
                headers: {
                    'Referer': 'https://localhost:3000', // Add referer header
                    'User-Agent': 'Economic-Insights-App/1.0'
                }
            })
        );

        const results = await Promise.all(searchPromises);

        type YouTubeVideoItem = {
            id: { videoId: string };
            snippet: {
                title: string;
                publishedAt: string;
                thumbnails: { medium: { url: string } };
                channelTitle: string;
            };
        };

        const videos = results.flatMap(result =>
            result.data.items.map((item: YouTubeVideoItem) => ({
                title: item.snippet.title,
                videoId: item.id.videoId,
                publishedAt: item.snippet.publishedAt,
                thumbnail: item.snippet.thumbnails.medium.url,
                channelTitle: item.snippet.channelTitle
            }))
        );

        return NextResponse.json({ videos });
    } catch (error) {
        console.error('Failed to fetch shorts', error);

        // Handle specific YouTube API errors
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            (error as any).response?.status === 403
        ) {
            const errorMessage =
                (error as any).response.data?.error?.message || 'YouTube API access denied';
            console.error('YouTube API Error:', errorMessage);
            return NextResponse.json(
                { error: `YouTube API Error: ${errorMessage}` },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch economic shorts' },
            { status: 500 }
        );
    }
}