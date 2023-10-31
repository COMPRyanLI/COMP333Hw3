import React, { useState, useEffect } from 'react';
<<<<<<< Updated upstream
import AddSong from './addSong';
import UpdateSong from './edit';
import DeleteSong from './delete';
=======
import AddSong from './components/addSong';
import UpdateSong from './components/edit';
import DeleteSong from './components/delete';
import axios from "axios";
import './App.css';

>>>>>>> Stashed changes

function App() {
  const [feature, setFeature] = useState('view'); // 'view', 'edit', 'delete', or 'add'
  const [songList, setSongList] = useState([]);
  const [editSong, setEditSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
<<<<<<< Updated upstream
    fetch('http://localhost/index.php/user/view', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setSongList(data); // Assuming the server returns a list of songs
    })
    .catch(error => {
      console.error('Error:', error);
    });
=======
    axios
      .get('http://localhost/index.php/user/view')
      .then((res) => {
        setSongList(res.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching songs:', error);
      });
>>>>>>> Stashed changes
  }, []);

  const handleLogin = () => {
    // You should add the login fetch here
    fetch('http://localhost/index.php/user/check', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.loggedin) {
        setIsLoggedIn(true);
      } else {
        setError('Invalid username or password.');
      }
    })
    .catch((error) => console.error('Error logging in:', error));
  };
  
  const handleAddSong = (newSong) => {
    fetch('http://localhost/index.php/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSong),
    })
    .then(response => response.json())
    .then(data => {
      // Assuming the backend returns the added song with an ID
      setSongList([...songList, data]);
      setFeature('view');
    })
    .catch((error) => console.error('Error adding song:', error));
  };

  const handleEditSong = (editedSong) => {
    fetch(`http://localhost/index.php/user/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedSong),
    })
    .then(() => {
      const updatedSongList = songList.map((song) =>
        song.id === editedSong.id ? editedSong : song
      );
      setSongList(updatedSongList);
      setFeature('view');
      setEditSong(null);
    })
    .catch((error) => console.error('Error editing song:', error));
  };

  const handleDeleteSong = (songId) => {
    fetch(`http://localhost/index.php/user/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: songId }),
    })
    .then(() => {
      const updatedSongList = songList.filter((song) => song.id !== songId);
      setSongList(updatedSongList);
      setFeature('view');
    })
    .catch((error) => console.error('Error deleting song:', error));
  };
  // Other functions (handleAddSong, handleEditSong, handleDeleteSong) remain the same

  return (
    <div>
      <h1>Song Rating App</h1>
<<<<<<< Updated upstream
      {isLoggedIn ? (
=======
     
>>>>>>> Stashed changes
        <>
          {feature === 'view' && (
            <div>
              <ul>
                {songList.map((song) => (
                  <li key={song.id}>
<<<<<<< Updated upstream
                    {song.title} - Artist: {song.artist} - Rating: {song.rating}
=======
                     <strong>Artist:</strong> {song.artist}, <strong>Song:</strong> {song.song}, <strong>Rating:</strong> {song.rating}
                    
>>>>>>> Stashed changes
                    <button onClick={() => { setFeature('edit'); setEditSong(song); }}>Edit</button>
                    <button onClick={() => { setFeature('delete'); setEditSong(song); }}>Delete</button>
                  </li>
                ))}
              </ul>
<<<<<<< Updated upstream
              <button onClick={() => setFeature('add')}>Add Song</button>
            </div>
          )}

          {feature === 'add' && songList && (
            <AddSong onAddSong={handleAddSong} onCancel={() => setFeature('view')} />
          )}

          {feature === 'edit' && editSong && (
            <UpdateSong song={editSong} onUpdate={handleEditSong} onCancel={() => setFeature('view')} />
          )}
          {feature === 'delete' && editSong && (
            <DeleteSong song={editSong} onDeleteSong={handleDeleteSong} onCancel={() => setFeature('view')} />
          )}

        </>
      ) : (
=======
                <button onClick={() => setFeature('add')}>Add Song</button>                
            </div>
          )}
            <div class="add-song-form-show-right">
          {feature === 'add' && songList && (
            <AddSong onAddSong={handleAddSong} onCancel={() => setFeature('view')} />
          )}
        </div>

        <div class="add-song-form-show-right">
          {feature === 'edit' && editSong && (
            <UpdateSong song={editSong} onUpdate={handleEditSong} onCancel={() => setFeature('view')} />
          )}
        </div>

        <div class="add-song-form-show-right">
          {feature === 'delete' && editSong && (
            <DeleteSong song={editSong} onDeleteSong={handleDeleteSong} onCancel={() => setFeature('view')} />
          )}
        </div>


        </>
       : (
>>>>>>> Stashed changes
        <>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
        </>
<<<<<<< Updated upstream
      )}
=======
      )
>>>>>>> Stashed changes
    </div>
  );
}

<<<<<<< Updated upstream
export default App;
=======
export default App;
              {/* <button onClick={() => setFeature('add')}>Add Song</button> */}
          
>>>>>>> Stashed changes
