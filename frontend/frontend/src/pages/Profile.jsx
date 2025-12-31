import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import DashboardLayout from '../components/DashboardLayout';
import { User, Mail, Calendar, Save } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.put('/profile', formData);
      updateUser(response.data.user);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditing(false);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      avatar: user?.avatar || '',
    });
    setEditing(false);
    setMessage({ type: '', text: '' });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="card">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={formData.avatar || 'https://ui-avatars.com/api/?name=User'}
              alt={formData.name}
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.name}</h1>
              <p className="text-gray-600 text-md mb-4">{user?.email}</p>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="btn-primary"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>

          {message.text && (
            <div className={`mb-4 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              ) : (
                <p className="text-gray-900 py-2 px-4 bg-gray-50 rounded-lg">{user?.name}</p>
              )}
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </label>
              <p className="text-gray-900 py-2 px-4 bg-gray-50 rounded-lg">{user?.email}</p>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Bio */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Bio
              </label>
              {editing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  placeholder="Tell us about yourself..."
                  maxLength="500"
                ></textarea>
              ) : (
                <p className="text-gray-900 py-2 px-4 bg-gray-50 rounded-lg min-h-[100px]">
                  {user?.bio || 'No bio yet'}
                </p>
              )}
              {editing && (
                <p className="text-xs text-gray-500 mt-1">
                  {formData.bio.length}/500 characters
                </p>
              )}
            </div>

            {/* Avatar URL */}
            {editing && (
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Avatar URL
                </label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://example.com/avatar.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter a URL for your profile picture
                </p>
              </div>
            )}

            {/* Member Since */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Member Since
              </label>
              <p className="text-gray-900 py-2 px-4 bg-gray-50 rounded-lg">
                {new Date(user?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Action Buttons */}
            {editing && (
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Account Stats */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Account Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <p className="text-3xl font-bold text-primary-600">
                {Math.floor((Date.now() - new Date(user?.createdAt)) / (1000 * 60 * 60 * 24))}
              </p>
              <p className="text-sm text-gray-600 mt-1">Days Active</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">Active</p>
              <p className="text-sm text-gray-600 mt-1">Account Status</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;