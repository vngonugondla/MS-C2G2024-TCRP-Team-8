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
      <h2 className={tw(`text-2xl font-bold mb-6`)}>Your Matches</h2>
      <div className={tw(`w-full flex flex-wrap justify-center`)}>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.user_id} className={tw(`border p-6 mb-6 rounded-lg shadow-lg w-80 mx-4 bg-white`)}>
              <h3 className={tw(`text-xl font-semibold mb-2`)}>{user.name}</h3>
              <p className={tw(`text-gray-700 mb-1`)}>{user.email}</p>
              <p className={tw(`text-gray-700 mb-1`)}>{user.phone}</p>
              <p className={tw(`text-gray-700 mb-1`)}>{user.birthday}</p>
              <p className={tw(`text-gray-700 mb-1`)}>{user.gender}</p>
              <p className={tw(`text-gray-700 mb-1`)}>{user.bio}</p>
              <p className={tw(`text-gray-700 mb-1`)}>{user.interests.join(', ')}</p>
              <p className={tw(`text-gray-700 mb-1`)}>{user.community_role}</p>
              <p className={tw(`text-gray-700 mb-1`)}>{user.location}</p>
              <p className={tw(`text-gray-700 mb-1`)}>{user.points}</p>
            </div>
          ))
        ) : (
          <p className={tw(`text-lg text-gray-700`)}>No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default Matchmaking;