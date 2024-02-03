import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ setAvailableArticles, availableArticles }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send profile update request to the backend
    // Update available articles count upon successful profile update
    setAvailableArticles(availableArticles + 3); // Assuming availableArticles is accessible
    history.push('/');
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;
