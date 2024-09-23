import { useEffect, useState } from 'react';
import Page from '@/components/page';
import {auth} from '../firebaseConfig';

async function getCurrentUser() {
  return auth.currentUser
}

async function fetchAllUsers() {
  const user = await getCurrentUser();
  if (user) {
    const token = await user.getIdToken();
    const response = await fetch("http://127.0.0.1:8000/staff/profile/all/all", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail);
    }
  } else {
    throw new Error('No authenticated user found.');
  }
}

async function editUserProfile(uid: any) {
  const user = await getCurrentUser();
  if (user) {
    const token = await user.getIdToken();
    const response = await fetch(`http://127.0.0.1:8000/staff/profile/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* your updated user data */ }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail);
    }
  } else {
    throw new Error('No authenticated user found.');
  }
}

async function toggleUserActiveStatus(uid: any) {
  const user = await getCurrentUser();
  if (user) {
    const token = await user.getIdToken();
    const response = await fetch(`http://127.0.0.1:8000/staff/active`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail);
    }
  } else {
    throw new Error('No authenticated user found.');
  }
}

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const allUsers = await fetchAllUsers();
      setUsers(allUsers);
    }
    loadUsers();
  }, []);

  const handleEditUser = async (uid: any) => {
    await editUserProfile(uid);
    // Optionally, you can refresh the user list after editing
    const allUsers = await fetchAllUsers();
    setUsers(allUsers);
  };

  const handleToggleActive = async (uid: any) => {
    await toggleUserActiveStatus(uid);
    // Refresh the user list after toggling active status
    const allUsers = await fetchAllUsers();
    setUsers(allUsers);
  };

  return (
    <Page>
      <h1>Manage Users</h1>
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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.community_role}</td>
              <td>{user.active ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEditUser(user.uid)}>Edit</button>
                <button onClick={() => handleToggleActive(user.uid)}>
                  {user.active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}