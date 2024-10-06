import React, { useState } from 'react';
import { Search, Sliders, Youtube } from 'lucide-react';
import SearchFilters from './components/SearchFilters';
import { searchVideos, getChannelInfo, getVideoStats } from './api/youtube';

interface SearchFilters {
  maxResults: number;
  order: string;
  publishedAfter: string;
  regionCode: string;
  relevanceLanguage: string;
  videoCategoryId: string;
  videoDefinition: string;
  videoDuration: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState<SearchFilters>({
    maxResults: 25,
    order: 'relevance',
    publishedAfter: '',
    regionCode: '',
    relevanceLanguage: '',
    videoCategoryId: '',
    videoDefinition: '',
    videoDuration: '',
  });

  const handleSearch = async () => {
    try {
      const results = await searchVideos({ q: searchQuery, ...filters });
      const enhancedResults = await Promise.all(
        results.items.map(async (item: any) => {
          const channelInfo = await getChannelInfo(item.snippet.channelId);
          const videoStats = await getVideoStats(item.id.videoId);
          return { ...item, channelInfo, videoStats };
        })
      );
      setSearchResults(enhancedResults);
    } catch (error) {
      console.error('Error searching videos:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <header className="bg-black/30 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Youtube size={32} className="text-pink-500 mr-2" />
            <h1 className="text-2xl font-bold">TubeQuest</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-pink-500">Home</a></li>
              <li><a href="#" className="hover:text-pink-500">About</a></li>
              <li><a href="#" className="hover:text-pink-500">Pricing</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center mb-8">Advanced YouTube Search</h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <input
              type="text"
              placeholder="Enter your search query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow p-3 rounded-l-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button 
              className="bg-pink-600 hover:bg-pink-700 p-3 rounded-r-lg flex items-center"
              onClick={handleSearch}
            >
              <Search size={24} />
              <span className="ml-2">Search</span>
            </button>
          </div>

          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <Sliders size={24} />
              <h3 className="text-xl font-semibold ml-2">Advanced Filters</h3>
            </div>
            <SearchFilters filters={filters} setFilters={setFilters} />
          </div>

          {searchResults.length > 0 && (
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Search Results</h3>
              <ul>
                {searchResults.map((video: any) => (
                  <li key={video.id.videoId} className="mb-6 border-b border-white/20 pb-4">
                    <h4 className="font-semibold text-lg">{video.snippet.title}</h4>
                    <p className="text-sm text-gray-300 mb-2">{video.snippet.description}</p>
                    <div className="flex space-x-4 text-sm text-gray-400">
                      <span>Views: {video.videoStats.viewCount}</span>
                      <span>Likes: {video.videoStats.likeCount}</span>
                      <span>Comments: {video.videoStats.commentCount}</span>
                      <span>Channel Subscribers: {video.channelInfo.subscriberCount}</span>
                    </div>
                    <a 
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-400 mt-2 inline-block"
                    >
                      Watch on YouTube
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-4 text-sm">
        © 2024 TubeQuest. All rights reserved.
      </footer>
    </div>
  );
}

export default App;