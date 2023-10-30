import React, { useState } from 'react';

function UpdateSong({ song, onEditSong }) {
  const [rating, setRating] = useState(song.rating);

  const handleEditSong = () => {
    
    // Update the song object with the new rating
    const updatedSong = { ...song, rating: parseInt(rating) };

    // Call the parent component's callback function to edit the song
    onEditSong(updatedSong);
  };

  return (
    <div>
      <h2>Edit Song Rating</h2>
      <p>
        Artist: {song.artist}, Song Title: {song.title}, Current Rating: {song.rating}
      </p>
      <form>
        <div>
          <label>New Rating:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
        <button type="button" onClick={handleEditSong}>
          Update Rating
        </button>
      </form>
    </div>
  );
}

export default UpdateSong;