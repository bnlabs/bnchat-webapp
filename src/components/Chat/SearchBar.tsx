import React, { useState } from 'react';
import axios from 'axios';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const apiUrl = import.meta.env.VITE_API_URL;

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () =>
  {
      axios.get(`${apiUrl}/User/SearchUsername?searchInput=${searchTerm}`)
  };

  return (
    <div className="text-center p-3">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      >
      </input>
      <button onClick={handleSearch}>
        Search
        </button>
    </div>
  );
};

export default SearchBar;
