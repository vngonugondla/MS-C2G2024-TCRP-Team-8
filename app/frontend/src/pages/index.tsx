import { useState } from 'react';
import { tw } from 'twind';
import Page from '@/components/page';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
import { auth } from '../firebaseConfig';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const router = useRouter();

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const isSuccess = await signInWithEmailAndPassword(auth, username, password);
        if (isSuccess) {
          router.push('/indexReal');
        } else {
          alert('Login failed');
        }
      } else {
        const isSuccess = await createUserWithEmailAndPassword(auth, username, password);
        if (isSuccess) {
          router.push('/inputs'); 
        } else {
          alert('Signup failed');
        }
      }
    } catch (error) {
      alert(isLogin ? 'Login failed' : 'Signup failed');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Page hideNavigation={true}>
      <div className={tw(`max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10`)}>
        <h1 className={tw(`text-2xl font-bold text-center mb-6`)}>{isLogin ? 'Login' : 'Sign Up'}</h1>

        <form>
          <div className={tw(`mb-4`)}>
            <label className={tw(`block text-gray-700 text-sm font-bold mb-2`)} htmlFor="username">
              Username
            </label>
            <input
              className={tw(
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`
              )}
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={tw(`mb-4`)}>
            <label className={tw(`block text-gray-700 text-sm font-bold mb-2`)} htmlFor="password">
              Password
            </label>
            <input
              className={tw(
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`
              )}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={tw(
              `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`
            )}
            type="submit"
            onClick={submitHandler}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className={tw(`mt-4 text-center`)}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <a
            href="#"
            className={tw(`text-blue-500 hover:text-blue-700`)}
            onClick={toggleForm}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </a>
        </p>
      </div>
    </Page>
  );
}