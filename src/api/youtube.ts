import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

interface SearchParams {
  q: string;
  maxResults?: number;
  order?: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount';
  publishedAfter?: string;
  publishedBefore?: string;
  regionCode?: string;
  relevanceLanguage?: string;
  videoCategoryId?: string;
  videoDefinition?: 'high' | 'standard';
  videoDuration?: 'long' | 'medium' | 'short';
  videoType?: 'any' | 'episode' | 'movie';
}

export const searchVideos = async (params: SearchParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        type: 'video',
        key: API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

export const getChannelInfo = async (channelId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/channels`, {
      params: {
        part: 'statistics',
        id: channelId,
        key: API_KEY,
      },
    });
    return response.data.items[0].statistics;
  } catch (error) {
    console.error('Error fetching channel info:', error);
    throw error;
  }
};

export const getVideoStats = async (videoId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'statistics',
        id: videoId,
        key: API_KEY,
      },
    });
    return response.data.items[0].statistics;
  } catch (error) {
    console.error('Error fetching video stats:', error);
    throw error;
  }
};