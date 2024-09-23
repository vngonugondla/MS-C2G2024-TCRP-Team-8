import { getCurrentUser } from './authService.js';

export async function fetchUserProfile() {
    const user = getCurrentUser();
    if (user) {
        const token = await user.getIdToken();
        const response = await fetch("/users/profile", {
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

export async function saveUserProfile(profile) {
    const user = getCurrentUser();
    if (user) {
        const token = await user.getIdToken();
        const response = await fetch("/users/profile", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(profile),
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
