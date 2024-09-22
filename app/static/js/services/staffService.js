import { getCurrentUser } from './authService.js';
import { populateProfileForm } from '../profile.js';
import { hideElement, showElement } from '../utils.js';

export async function fetchAllUsers() {
    const user = getCurrentUser();
    if (user) {
        const token = await user.getIdToken();
        const response = await fetch("/staff/profile/all/member", {
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

export async function toggleUserActiveStatus(targetUid) {
    const user = getCurrentUser();
    if (user) {
        const token = await user.getIdToken();
        const response = await fetch('/staff/active', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({target_uid: targetUid,}),
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.detail);
        }
    } else {
        throw new Error('No authenticated user to execute toggle.');
    }
}

export async function toggleUserApprovedStatus(targetUid) {
    const user = getCurrentUser();
    if (user) {
        const token = await user.getIdToken();
        const response = await fetch('/staff/approved', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({target_uid: targetUid,}),
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.detail);
        }
    }
}


export async function fetchUserProfileById(targetUid) {
    const user = getCurrentUser();
    if (user) {
        const token = await user.getIdToken();
        console.log(`Fetching profile for UID: ${targetUid}`);
        const response = await fetch(`/staff/profile/${targetUid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log(`Profile fetched successfully for UID: ${targetUid}`);
            return await response.json();
        } else {
            const errorData = await response.json();
            console.error(`Error fetching profile for UID: ${targetUid}`, errorData);
            throw new Error(errorData.detail);
        }
    } else {
        throw new Error('No authenticated user found.');
    }
}

export async function updateUserProfile(targetUid, updatedProfile) {
    const user = getCurrentUser();
    if (user) {
        const token = await user.getIdToken();


        const response = await fetch('/staff/profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                'target_uid': targetUid,
                'name':  updatedProfile.name,
                'phone': updatedProfile.phone,
                'birthday': updatedProfile.birthday,
                'gender': updatedProfile.gender,
                'bio': updatedProfile.bio,
                'interests': updatedProfile.interests,
                'community_role': updatedProfile.community_role,
                'profile_picture': updatedProfile.profile_picture,
                'location': updatedProfile.location,
            }),
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

export async function editUserProfile(targetUid) {
    try {
        const targetProfile = await fetchUserProfileById(targetUid);
        populateProfileForm(targetProfile);
        hideElement('staffPortal');
        showElement('profile');

        // Remove any previous event listener for the save button
        const saveButton = document.getElementById('saveProfileButton');
        const newSaveButton = saveButton.cloneNode(true);  // Create a copy to replace the old one (removing all previous listeners)
        saveButton.parentNode.replaceChild(newSaveButton, saveButton);

        // Add a new event listener to save the updated profile for the correct user
        newSaveButton.addEventListener('click', async () => {
            const profile = {
                user_id: targetProfile.uid,
                name: document.getElementById("name").value,
                email: targetProfile.email,
                phone: document.getElementById("phone").value || null,
                birthday: document.getElementById("birthday").value || null,
                gender: document.getElementById("gender").value || null,
                bio: document.getElementById("bio").value || null,
                interests: document.getElementById("interests").value
                    ? document.getElementById("interests").value.split(',').map(item => item.trim())
                    : [],
                community_role: document.getElementById("community_role").value || 'member',
                profile_picture: document.getElementById("profile_picture").value || null,
                location: document.getElementById("location").value || null,
                approved: targetProfile.approved || false,
                active: targetProfile.active || false,
                created_at: targetProfile.created_at || new Date().toISOString(),
                points: targetProfile.points || 0
            };
            try {
                await updateUserProfile(targetUid, profile);
                alert('User profile updated successfully.');
                hideElement('profile');
                showElement('staffPortal');
                // await loadAllUsers(); // Refresh the users table
            } catch (error) {
                console.error('Error updating user profile:', error);
                alert('Failed to update user profile.');
            }
        });

        // Cancel action to go back to staff portal
        const cancelButton = document.getElementById('cancelProfileButton');
        const newCancelButton = cancelButton.cloneNode(true);
        cancelButton.parentNode.replaceChild(newCancelButton, cancelButton);

        newCancelButton.addEventListener('click', () => {
            hideElement('profile');
            showElement('staffPortal');
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Failed to fetch user profile.');
    }
}
