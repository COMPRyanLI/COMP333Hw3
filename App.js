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
  const [searchInput, setSearchInput] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);


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

  
  const handleRegistration = async (event) => {
    event.preventDefault();
    if (!username || !password || password.length < 10) {
      setError('Please provide a valid username and a password with more than 8 characters.');
      return;
    }
    try {
      const response = await axios.post('http://localhost/index.php/user/create', { username, password });
      if (response.status < 300) {
        setError('');
        setIsLoggedIn(false);
        setShowRegistration(false);
        setFeature('view');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    }
  };

  const handleLogin = async (event) => {
    if (!username || !password) {
      setError('Please provide a valid username and password.');
      return;
    }
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost/index.php/user/check', { username, password });
      if (response.status < 300 && response.data === true) {
        setError('');
        setIsLoggedIn(true);
        setFeature('view');
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    }
  };


  const handleAddSong = (newSong) => {
    if (!newSong.artist || !newSong.song || !newSong.rating || newSong.rating < 1 || newSong.rating > 5) {
      setError('Please fill out all fields and provide a rating between 1 and 5.');
      return;
    }  
    axios.post('http://localhost/index.php/user/add', {
      ...newSong,
      username: username
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      const data_new = response.data; // Assuming the backend returns the added song with an ID
      setSongList(data_new)
      setFeature('view');
    })
    .catch((error) => {
      console.error('Error adding song:', error);
    });
};

  
  const handleEditSong = (editedSong) => {
    if (!editedSong.artist || !editedSong.song || !editedSong.rating || editedSong.rating < 1 || editedSong.rating > 5) {
      setError('Please fill out all fields and provide a rating between 1 and 5.');
      return;
    }
    axios.post(`http://localhost/index.php/user/update`, editedSong, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      const updatedSongList = songList.map((song) =>
        song.id === editedSong.id ? editedSong : song
      );
      setSongList(updatedSongList);
      setFeature('view');
      setEditSong(null);
    })
    .catch((error) => {
      console.error('Error editing song:', error);
    });
  };
  
  const handleDeleteSong = (songId) => {
    axios.post('http://localhost/index.php/user/delete', { id: songId }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      const updatedSongList = songList.filter((song) => song.id !== songId);
      setSongList(updatedSongList);
      setFeature('view');
    })
    .catch((error) => {
      console.error('Error deleting song:', error);
    });
  };
  // Handle search input changes
  const handleSearchInput = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    filterSongs(input);
  };

  const filterSongs = (artist) => {
    const filtered = songList.filter((song) =>
      song.artist.toLowerCase().includes(artist.toLowerCase())
    );
    setFilteredSongs(filtered);
  };
  // Other functions (handleAddSong, handleEditSong, handleDeleteSong) remain the same


  return (
    <div>
    <h1>Song Rating App</h1>
    {!isLoggedIn ? (
      <div>
        {showRegistration ? (
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
              {error && <p>{error}</p>}
            </form>
          </div>
        ) : (
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
              <button onClick={() => setShowRegistration(true)}>Register</button>
              {error && <p>{error}</p>}
            </form>
          </div>
        )}
      </div>
      )  
       : (
        // Render features when the user is logged in
     
          <ul>
            <input
          type="text"
          placeholder="Search by Artist"
          value={searchInput}
          onChange={handleSearchInput}
        />
          {searchInput ? (
            // Display filtered songs
            filteredSongs.map((song) => (
              <li key={song.id}>
                <strong>Artist:</strong> {song.artist}, <strong>Song:</strong> {song.song}
              </li>
            ))
          ) : (
            // Display all songs when searchInput is empty
            songList.map((song) => (
              <li key={song.id}>
                <strong>Artist:</strong> {song.artist}, <strong>Song:</strong> {song.song}
              </li>
            ))
          )}
        </ul>
         )}
        <div>
          {feature === 'view' && (
            <div>
              <ul className='view-pane'>
                {songList.map((song) => (
                  <li key={song.id}>
                    <strong>Artist:</strong> {song.artist}, <strong>Song:</strong> {song.song}, <strong>Rating:</strong> {song.rating}

                     {/* conditional that will check if username for song = username of user */}
                    {username === song.username && (
                      <div>
                        <button onClick={() => { setFeature('edit'); setEditSong(song); }}>Edit</button>
                        <button onClick={() => { setFeature('delete'); setEditSong(song); }}>Delete</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <button onClick={() => setFeature('add')}>Add Song</button>
            </div>
          )}
          <div className="edit-add-pane">
            {feature === 'add' && songList && (
              <AddSong onAddSong={handleAddSong} onCancel={() => setFeature('view')} />
            )}
          
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
   
    </div>
  );
  
}

export default App;
              {/* <button onClick={() => setFeature('add')}>Add Song</button> */}
          