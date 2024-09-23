import { auth } from './app.js';
import { showElement, hideElement } from './utils.js';
import { saveUserProfile, fetchUserProfile } from './services/profileService.js';

export function initializeEventListeners() {
    document.getElementById("saveProfileButton").addEventListener("click", saveProfile);
    document.getElementById("cancelProfileButton").addEventListener("click", cancelProfileEdit);
    document.getElementById("editProfileButton").addEventListener("click", editProfile);
}

// Variable to track if the user is editing their profile
let isEditingProfile = false;

// Save Profile Function (Create or Update)
async function saveProfile() {
    const user = auth.currentUser;
    if (user) {
        const profile = {
            user_id: user.uid,
            name: document.getElementById("name").value,
            email: user.email,
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
            approved: false,
            active: false,
            created_at: new Date().toISOString(),
            points: 0
        };

        try {
            await saveUserProfile(profile);
            alert("Profile saved successfully!");
            hideElement("profile");
            displayDashboard(profile);
            isEditingProfile = false;
        } catch (error) {
            console.error("Error saving profile: ", error);
            alert("Profile save failed: " + error.message);
        }
    }
}

// Cancel Profile Edit
function cancelProfileEdit() {
    hideElement("profile");
    if (isEditingProfile) {
        showElement("dashboard");
    }
    isEditingProfile = false;
}

// Edit Profile Function (Link to Profile Form)
async function editProfile() {
    try {
        const profile = await fetchUserProfile();
        if (profile) {
            populateProfileForm(profile);
            hideElement("dashboard");
            showElement("profile");
            isEditingProfile = true;
        }
    } catch (error) {
        console.error("Error fetching profile: ", error);
        alert("Failed to fetch profile.");
    }
}

// Display Dashboard with User Profile Data
export function displayDashboard(profile) {
    document.getElementById("userName").textContent = profile.name;
    document.getElementById("userEmail").textContent = profile.email;
    document.getElementById("userPhone").textContent = profile.phone || "N/A";
    document.getElementById("userBirthday").textContent = profile.birthday ? new Date(profile.birthday).toLocaleDateString() : "N/A";
    document.getElementById("userGender").textContent = profile.gender || "N/A";
    document.getElementById("userBio").textContent = profile.bio || "N/A";
    document.getElementById("userInterests").textContent = profile.interests ? profile.interests.join(', ') : "N/A";
    document.getElementById("userLocation").textContent = profile.location || "N/A";
    document.getElementById("userProfilePicture").src = profile.profile_picture || "default-profile.png";
    showElement("dashboard");

    // Show or hide the staff actions
    if (profile.community_role === 'staff') {
        showElement("staffActions");
    } else {
        hideElement("staffActions");
    }
}

// Populate Profile Form for Editing
function populateProfileForm(profile) {
    document.getElementById("name").value = profile.name || '';
    document.getElementById("phone").value = profile.phone || '';
    document.getElementById("birthday").value = profile.birthday || '';
    document.getElementById("gender").value = profile.gender || '';
    document.getElementById("bio").value = profile.bio || '';
    document.getElementById("interests").value = profile.interests ? profile.interests.join(', ') : '';
    document.getElementById("community_role").value = profile.community_role || 'member';
    document.getElementById("profile_picture").value = profile.profile_picture || '';
    document.getElementById("location").value = profile.location || '';
}

export { populateProfileForm };
