import { useState, useEffect } from 'react';
import { tw } from 'twind';
import axios from 'axios';

interface IUser {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  bio: string;
  interests: string[];
  community_role: string;
  profile_picture?: string | null;
  location?: string | null;
  approved: boolean;
  active: boolean;
  created_at: Date;
  points: number;
}

interface IProps {
  currentUser: any;
}

const Matchmaking = ({ currentUser }: IProps) => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchMatchmakingUsers = async () => {
      try {
        const token = await currentUser.getIdToken();
        const response = await axios.get(`http://127.0.0.1:8000/system/matchmaking`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching matchmaking users:', error);
      }
    };

    if (currentUser) {
      fetchMatchmakingUsers();
    }
  }, [currentUser]);

  return (
    <div className={tw(`flex flex-col items-center justify-center`)}>
      <h2 className={tw(`text-xl font-bold mb-4`)}>Your Matches</h2>
      <div className={tw(`w-full`)}>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.user_id} className={tw(`border p-4 mb-4 rounded`)}>
              <h3 className={tw(`text-lg font-bold`)}>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.birthday}</p>
              <p>{user.gender}</p>
              <p>{user.bio}</p>
              <p>{user.interests.join(', ')}</p>
              <p>{user.community_role}</p>
              <p>{user.location}</p>
              <p>{user.points}</p>
              {/* Add other user details here */}
            </div>
          ))
        ) : (
          <p>No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default Matchmaking;