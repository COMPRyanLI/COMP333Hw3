// SearchSongs.js
import React, { useState } from 'react';

const SearchSongs = ({ songList, onSearch }) => {
   
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = () => {
    const filtered = songList.filter((song) =>
    song.artist === artist
    );
    onSearch(filtered);
  };

  return (
    <div>
      <label>Artist:</label>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearchInput}>Search</button>
    </div>
  );
};

export default SearchSongs;
