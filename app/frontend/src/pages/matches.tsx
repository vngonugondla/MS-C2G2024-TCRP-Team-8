import { useEffect, useState } from 'react';
import Page from '@/components/page';
import Matchmaking from '@/components/matchmaking';
import { auth } from '../firebaseConfig';
import { User } from 'firebase/auth';

const MatchmakingPage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await auth.currentUser;
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <Page>
      <main>
        <h1>Matchmaking Results</h1>
        {currentUser && <Matchmaking currentUser={currentUser} />}
      </main>
    </Page>
  );
};

export default MatchmakingPage;