import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Avatar } from '@mantine/core';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

interface SearchBarProps {
}

interface SearchResult {
  id: string;
  name: string;
  pictureUrl: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const SearchModal: React.FC<SearchBarProps> = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
      axios
        .get(`${apiUrl}/User/SearchUsername?searchInput=${searchTerm}`, {withCredentials: true, })
        .then((response: AxiosResponse<SearchResult[]>) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    };

    const startConversation = (userId:string) => {
      const payload = {
        "memberIds": [
          userId
        ]
      };
      
      axios.post(`${apiUrl}/Message/createConversation`,
      payload,
      { withCredentials: true });
    };

    return (
      <div className="text-center p-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        >
        </input>
        <button onClick={handleSearch}>Search</button>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id} className='text-slate-300 flex flex-row justify-between'>
              <Avatar size={"lg"} src={result.pictureUrl}/>
              <div className='text-lg'>
                {result.name}
              </div>
              <button className='m-2' onClick={() => startConversation(result.id)}>
                <ChatBubbleIcon/>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default SearchModal;
