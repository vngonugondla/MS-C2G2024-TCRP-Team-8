import React, { useEffect, useState } from 'react';
import { fetchAllUsers, toggleUserActiveStatus, toggleUserApprovedStatus, fetchUserProfileById } from '../js/services/staffService';

const StaffPortal: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    try {
      const allUsers = await fetchAllUsers();
      setUsers(allUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all users: ", error);
      alert("Failed to retrieve users.");
      setLoading(false);
    }
  };

  const handleToggleActive = async (uid: string, active: boolean) => {
    try {
      await toggleUserActiveStatus(uid, !active);
      loadAllUsers(); // Refresh the users table
      alert(`User has been ${!active ? 'activated' : 'deactivated'} successfully.`);
    } catch (error) {
      console.error('Error toggling user active status:', error);
      alert('Failed to update user status.');
    }
  };

  const handleToggleApproved = async (uid: string) => {
    try {
      await toggleUserApprovedStatus(uid);
      loadAllUsers(); // Refresh the users table
      alert('User approval status has been updated successfully.');
    } catch (error) {
      console.error('Error toggling user approval status:', error);
      alert('Failed to update user approval status.');
    }
  };

  const handleEditUser = async (uid: string) => {
    try {
      const userProfile = await fetchUserProfileById(uid);
        console.log('User profile:', userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      alert('Failed to fetch user profile.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="staff-portal">
      <h2>Staff Portal</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Community Role</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>(

            <tr key={user.user_id}>
              <td>{user.name || 'N/A'}</td>
              <td>{user.email || 'N/A'}</td>
              <td>{user.community_role || 'N/A'}</td>
              <td>{user.active ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleToggleActive(user.user_id, user.active)}>
                  {user.active ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleToggleApproved(user.user_id)}>
                  {user.approved ? 'Unapprove' : 'Approve'}
                </button>
                <button onClick={() => handleEditUser(user.user_id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffPortal;