import React from 'react';

interface FilterProps {
  filters: any;
  setFilters: (filters: any) => void;
}

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-4">
    <h4 className="font-semibold mb-2">{title}</h4>
    {children}
  </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { onChange: (value: string) => void }> = ({ onChange, ...props }) => (
  <input
    {...props}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
  />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { onChange: (value: string) => void }> = ({ onChange, children, ...props }) => (
  <select
    {...props}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
  >
    {children}
  </select>
);

const SearchFilters: React.FC<FilterProps> = ({ filters, setFilters }) => {
  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <FilterSection title="Max Results">
        <Input 
          type="number" 
          value={filters.maxResults} 
          onChange={(value) => handleFilterChange('maxResults', value)} 
          placeholder="Max results (default: 25)" 
        />
      </FilterSection>

      <FilterSection title="Order">
        <Select 
          value={filters.order} 
          onChange={(value) => handleFilterChange('order', value)}
        >
          <option value="relevance">Relevance</option>
          <option value="date">Date</option>
          <option value="rating">Rating</option>
          <option value="viewCount">View Count</option>
          <option value="title">Title</option>
        </Select>
      </FilterSection>

      <FilterSection title="Published After">
        <Input 
          type="date" 
          value={filters.publishedAfter} 
          onChange={(value) => handleFilterChange('publishedAfter', value)} 
        />
      </FilterSection>

      <FilterSection title="Region">
        <Input 
          type="text" 
          value={filters.regionCode} 
          onChange={(value) => handleFilterChange('regionCode', value)} 
          placeholder="Region code (e.g., US)" 
        />
      </FilterSection>

      <FilterSection title="Language">
        <Input 
          type="text" 
          value={filters.relevanceLanguage} 
          onChange={(value) => handleFilterChange('relevanceLanguage', value)} 
          placeholder="Language code (e.g., en)" 
        />
      </FilterSection>

      <FilterSection title="Video Category">
        <Input 
          type="text" 
          value={filters.videoCategoryId} 
          onChange={(value) => handleFilterChange('videoCategoryId', value)} 
          placeholder="Category ID" 
        />
      </FilterSection>

      <FilterSection title="Video Definition">
        <Select 
          value={filters.videoDefinition} 
          onChange={(value) => handleFilterChange('videoDefinition', value)}
        >
          <option value="">Any</option>
          <option value="high">High</option>
          <option value="standard">Standard</option>
        </Select>
      </FilterSection>

      <FilterSection title="Video Duration">
        <Select 
          value={filters.videoDuration} 
          onChange={(value) => handleFilterChange('videoDuration', value)}
        >
          <option value="">Any</option>
          <option value="short">Short (&lt; 4 minutes)</option>
          <option value="medium">Medium (4-20 minutes)</option>
          <option value="long">Long (&gt; 20 minutes)</option>
        </Select>
      </FilterSection>
    </div>
  );
};

export default SearchFilters;