import React, { useState } from 'react';

function UpdateSong({ song: initialSong, onEditSong }) {
  const [song, setTitle] = useState(initialSong.song);
  const [artist, setArtist] = useState(initialSong.artist);
  const [rating, setRating] = useState(initialSong.rating);

  const handleEditSong = () => {
    // Update the song object with the new properties
    const updatedSong = { ...initialSong, song, artist, rating: parseInt(rating) };

    // Call the parent component's callback function to edit the song
    onEditSong(updatedSong);
  };

  return (
    <div>
      <h2>Edit Song</h2>
      <p>
        Artist: {initialSong.artist}, Song Title: {initialSong.song}, Current Rating: {initialSong.rating}
      </p>
      <form onSubmit={e => e.preventDefault()}> {/* Prevent default form submission */}
        <div>
          <label>New Title:</label>
          <input type="text" value={song} onChange={(e) => setTitle(e.target.value)} /> 
          <br />
          
          <label>New Artist:</label>
          <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
          <br/>
          <label>New Rating:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
          <br />
        </div>
        <button type="button" onClick={handleEditSong}>
          Update Song
        </button>
      </form>
    </div>
  );
}

export default UpdateSong;