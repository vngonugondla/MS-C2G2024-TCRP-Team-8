import { useState } from 'react';
import { useRouter } from 'next/router';
import { tw } from 'twind';
import Page from '@/components/page';
import { auth } from '../firebaseConfig';


export default function InfoPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [location, setLocation] = useState('');
  const [communityRole, setCommunityRole] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    try {
        if (user) {
            const userProfile = {
                user_id: user.uid,
                name: name,
                email: user.email,
                phone: phone || null,
                birthday: birthday || null,
                gender: gender || null,
                bio: bio || null,
                interests: interests ? interests.split(',').map(item => item.trim()) : [],
                community_role: communityRole || 'member',
                profile_picture: profilePicture || null,
                location: location || null,
                approved: false,
                active: false,
                created_at: new Date().toISOString(),
                points: 0
            };

            const token = await user.getIdToken();
            console.log("User token:", token);
            console.log("User profile data being sent:", JSON.stringify(userProfile));

            const response = await fetch("http://127.0.0.1:8000/users/profile", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(userProfile),
            });

            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);

            if (response.ok) {
                const responseData = await response.json();
                console.log("Response data:", responseData);
            } else {
                const errorData = await response.json();
                console.error("Error response data:", errorData);
                throw new Error(errorData.detail);
            }
        } else {
            throw new Error('No authenticated user found.');
        }
    } catch (error) {
        console.error('Failed to save user profile', error);
        alert('Failed to save user profile');
        return;
    }
    router.push('/indexReal');
};
  return (
    <Page hideNavigation={true}>
      <div className={tw(`max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10`)}>
        <h1 className={tw(`text-2xl font-bold text-center mb-6`)}>User Information</h1>

        <form onSubmit={handleSubmit}>
          <div className={tw(`mb-4`)}>
            <label className={tw(`block text-gray-700 text-sm font-bold mb-2`)} htmlFor="name">
              Name
            </label>
            <input
              className={tw(
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`
              )}
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={tw(`mb-4`)}>
            <label className={tw(`block text-gray-700 text-sm font-bold mb-2`)} htmlFor="phone">
              Phone
            </label>
            <input
              className={tw(
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`
              )}
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={tw(`mb-4`)}>
            <label className={tw(`block text-gray-700 text-sm font-bold mb-2`)} htmlFor="birthday">
              Birthday
            </label>
            <input
              className={tw(
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`
              )}
              id="birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>

          <div className={tw(`mb-4`)}>
            <label className={tw(`block text-gray-700 text-sm font-bold mb-2`)} htmlFor="gender">
              Gender
            </label>
            <input
              className={tw(
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`
              )}
              id="gender"
              type="text"
              placeholder="Enter your gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          <div className={tw(`mb-4`)}>
            <label className={tw(`block text-gray-700 text-sm font-bold mb-2`)} htmlFor="bio">
              Bio
            </label>
            <textarea
              className={tw(
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`
              )}
              id="bio"
              placeholder="Enter your bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className={tw(`mb-4`)}>
            <label className={tw(`block text-gray-700 text-sm font-bold mb-2`)} htmlFor="interests">
              Interests
            </label>
            <input
              className={tw(
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`
              )}
              id="interests"
              type="text"
              placeholder="Enter your interests (comma-separated)"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>

          <div className={tw(`mb-4`)}>
            <label className={tw(`block text-gray-700 text-sm font-bold mb-2`)} htmlFor="location">
              Location
            </label>
            <input
              className={tw(
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`
              )}
              id="location"
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className={tw(`mb-4`)}>
            <label className={tw(`block text-gray-700 text-sm font-bold mb-2`)} htmlFor="communityRole">
              Community Role
            </label>
            <input
              className={tw(
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`
              )}
              id="communityRole"
              type="text"
              placeholder="Enter your community role"
              value={communityRole}
              onChange={(e) => setCommunityRole(e.target.value)}
            />
          </div>

          <div className={tw(`mb-4`)}>
            <label className={tw(`block text-gray-700 text-sm font-bold mb-2`)} htmlFor="profilePicture">
              Profile Picture URL
            </label>
            <input
              className={tw(
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`
              )}
              id="profilePicture"
              type="text"
              placeholder="Enter profile picture URL"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </div>

          <div className={tw(`flex items-center justify-between`)}>
            <button
              type="submit"
              className={tw(
                `bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`
              )}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Page>
  );
}