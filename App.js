import React, { useState, useEffect } from 'react';
import AddSong from './components/addSong';
import UpdateSong from './components/edit';
import DeleteSong from './components/delete';
import axios from "axios";
import './App.css';


function App() {
  const [feature, setFeature] = useState('view'); // 'view', 'edit', 'delete', or 'add'
  const [songList, setSongList] = useState([]);
  const [editSong, setEditSong] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false); // Manage registration form visibility

  useEffect(() => {
    axios
      .get('http://localhost/index.php/user/view')
      .then((res) => {
        setSongList(res.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching songs:', error);
      });
  }, []);

  const handleRegistration = async () => {
    try {
      const response = await axios.post('/api/register', {
        username,
        password,
      });

      if (response.status === 201) {
        setError(''); 
        setIsLoggedIn(true);
        setFeature('view');
      }
    } catch (error) {
        setError('unsucessful log in');
        setUsername('');
        setPassword('');
        setFeature('register');
    }
  };

  // }
  const handleLogin = async () => {
    // Simulate a login process
    const response = await axios.post('http://localhost/index.php/user/login' , {
      username,
      password,
    });
    
    if (response < 202 ) {
        setError(''); 
        setIsLoggedIn(true);
        setFeature('view');
      }
    else {
        setError('Invalid username or password.');
      };
   
  }

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
        {!isLoggedIn ? (
        // Render login or registration form when the user is not logged in
        <div>
          {showRegistration ? (
            // Registration form
            <div>
              <h1>Register</h1>
              <form onSubmit={handleRegistration}>
                <div>
                  <label>Username:</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <label>Password:</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
              </form>
              {error && <p>{error}</p>}
            </div>
          ) : (
            // Login form
            <div>
              <h1>Login</h1>
              <form onSubmit={handleLogin}>
                <div>
                  <label>Username:</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <label>Password:</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
              </form>
              <button onClick={() => setShowRegistration(true)}>Register</button>
              {error && <p>{error}</p>}
            </div>
          )}
        </div>
      )  
       : (
        // Render features when the user is logged in
        <div>
          {feature === 'view' && (
            <div>
              <ul>
                {songList.map((song) => (
                  <li key={song.id}>
                    <strong>Artist:</strong> {song.artist}, <strong>Song:</strong> {song.song}, <strong>Rating:</strong> {song.rating}
  
                    <button onClick={() => { setFeature('edit'); setEditSong(song); }}>Edit</button>
                    <button onClick={() => { setFeature('delete'); setEditSong(song); }}>Delete</button>
                  </li>
                ))}
              </ul>
              <button onClick={() => setFeature('add')}>Add Song</button>
            </div>
          )}
          <div className="add-song-form-show-right">
            {feature === 'add' && songList && (
              <AddSong onAddSong={handleAddSong} onCancel={() => setFeature('view')} />
            )}
          </div>
  
          <div className="add-song-form-show-right">
            {feature === 'edit' && editSong && (
              <UpdateSong song={editSong} onUpdate={handleEditSong} onCancel={() => setFeature('view')} />
            )}
          </div>
  
          <div className="add-song-form-show-right">
            {feature === 'delete' && editSong && (
              <DeleteSong song={editSong} onDeleteSong={handleDeleteSong} onCancel={() => setFeature('view')} />
            )}
          </div>
        </div>
      )}
    </div>
  );
  
}

export default App;
              {/* <button onClick={() => setFeature('add')}>Add Song</button> */}
          