import React, { useState } from 'react';

// Search song constructor
const SearchSongs = ({ songList, onSearch }) => {
   
  const [searchInput, setSearchInput] = useState('');

  // filters out only the songs by artist === to user input
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
