import React, { useState } from 'react';

// refercned chatGPT for 
function addSong({ onAddSong }) {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

  const handleAddSong = () => {
    // Create a new song object with the input values
    const newSong = {
      artist: artist,
      song: song,
      rating: parseInt(rating),
    };

    // Call the parent component's callback function to add the new song
    onAddSong(newSong);

    // Reset the form fields
    setArtist('');
    setSong('');
    setRating('');
  };

  return (
    <div>
      <h2>Add New Song Rating</h2>
      <form>
        <div>
          <label>Artist:</label>
          <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
        </div>
        <div>
          <label>Song:</label>
          <input type="text" value={song} onChange={(e) => setSong(e.target.value)} />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
        <button type="button" onClick={handleAddSong}>
          Add Song
        </button>
      </form>
    </div>
  );
}

export default addSong;
