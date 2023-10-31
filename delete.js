import React from 'react';

function DeleteSong({ song, onDeleteSong }) {
    const handleDeleteSong = () => {
      // Send the song ID to the parent component (App.js) for deletion
      onDeleteSong(song.id);
    };
  
    return (
      <div>
        <h2>Delete Song</h2>
        <p>Are you sure you want to delete the song "{song.song}"?</p>
        <button onClick={handleDeleteSong}>Delete</button>
        
      </div>
    );
  }
  
  export default DeleteSong;