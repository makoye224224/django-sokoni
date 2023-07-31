import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_uri = process.env.REACT_APP_API_URL;

const UserProfile = () => {
  useEffect(() => {
    // Scroll to the top of the page after the route change
    window.scrollTo(0, 0);
  }, []);
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const accessToken = storedUser?.access;
  const refreshAccessToken = storedUser?.refresh;

  const getUserInfo = async (accessToken, refreshAccessToken) => {
    try {
      const userResponse = await axios.get(`${api_uri}/auth/users/me/`, {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      });
      return userResponse.data;
    } catch (error) {
      try {
        const refreshResponse = await axios.post(`${api_uri}/auth/jwt/refresh/`, {
          refresh: refreshAccessToken,
        });

        // Update the access token in the state and localStorage
        const newAccessToken = refreshResponse.data.access;
        setUser(null); // Clear the user state since the token is being refreshed
        localStorage.setItem('user', JSON.stringify({ ...storedUser, access: newAccessToken }));
        return getUserInfo(newAccessToken, refreshAccessToken);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  useEffect(() => {
    if (!accessToken) {
      setError('Access token not found. Please log in again.');
      return;
    }

    setIsLoading(true);
    getUserInfo(accessToken, refreshAccessToken)
      .then((userData) => {
        setUser(userData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to get user information. Please check your credentials.');
        setIsLoading(false);
      });
  }, [accessToken, refreshAccessToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {user ? (
        <div className='container'>
          <h1>User Information</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <button onClick={() => setIsLoading(true)}>Get User Info</button>
      )}
    </div>
  );
};

export default UserProfile;
