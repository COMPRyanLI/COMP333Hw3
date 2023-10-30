import React, { useState } from 'react';
import addSong from './addSong';
import UpdateSong from './edit';
import DeleteSong from './delete';


function App() {
  const [feature, setFeature] = useState('view'); // 'view', 'edit', 'delete', or 'add'
  const [songList, setSongList] = useState([]);
  const [editSong, setEditSong] = useState(null);

  useEffect(() => {
    // Fetch song entries from the database
    fetch('') // add in our  API endpoint
      .then((response) => response.json())
      .then((data) => setSongList(data))
      .catch((error) => console.error('Error fetching song entries:', error));
  }, []);

  // Function to add a new song
  const handleAddSong = (newSong) => {
    // Then, update the songList state with the new song
    const updatedSongList = [...songList, newSong];
    setSongList(updatedSongList);
    setFeature('view');
  };

  // Function to edit an existing song
  const handleEditSong = (editedSong) => {
    const updatedSongList = songList.map((song) =>
      song.id === editedSong.id ? editedSong : song
    );
    setSongList(updatedSongList);
    setFeature('view');
    setEditSong(null);
  };

  // Function to delete an existing song
  const handleDeleteSong = (songId) => {
    const updatedSongList = songList.filter((song) => song.id !== songId);
    setSongList(updatedSongList);
    setFeature('view');
  };

  return (
    <div>
      <h1>Song Rating App</h1>
      <button onClick={() => setFeature('view')}>View Songs</button>
      <button onClick={() => setFeature('add')}>Add Song</button>

      {feature === 'view' && (
        <ul>
          {songList.map((song) => (
            <li key={song.id}>
              {song.title} - Rating: {song.rating}
              <button onClick={() => setFeature('edit') && setEditSong(song)}>Edit</button>
              <button onClick={() => setFeature('delete') && setEditSong(song)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {feature === 'add' && <AddSong onAddSong={handleAddSong} />}
      {feature === 'edit' && <EditSong song={editSong} onEditSong={handleEditSong} />}
      {feature === 'delete' && <DeleteSong song={editSong} onDeleteSong={handleDeleteSong} />}
    </div>
  );
}

export default App;
