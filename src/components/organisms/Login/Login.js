import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  /* It is used to redirect the user to the main page after a successful login */
  const history = useHistory();

  /* Function that is executed when the user clicks the login button */
  const handleLogin = () => {
    if (username === 'useragustin' && password === 'passagustin') {
      sessionStorage.setItem('isLoggedIn', 'true');
      history.push('/'); // Redirect to the main page
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
