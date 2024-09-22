import { auth } from './app.js';
import { showElement, hideElement } from './utils.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { displayDashboard } from './profile.js';
import { fetchUserProfile } from './services/profileService.js';

export function initializeEventListeners() {
    document.getElementById("showSignUp").addEventListener("click", showSignUpForm);
    document.getElementById("showLogin").addEventListener("click", showLoginForm);
    document.getElementById("signUpButton").addEventListener("click", signUp);
    document.getElementById("loginButton").addEventListener("click", login);
    document.getElementById("logoutButton").addEventListener("click", logout);
}

// Toggle between Login and Sign Up forms
function showSignUpForm() {
    hideElement("login");
    showElement("auth");
}

function showLoginForm() {
    hideElement("auth");
    showElement("login");
}

// Sign Up Function
async function signUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        hideElement("auth");
        showElement("profile");
    } catch (error) {
        console.error("Error signing up: ", error);
        alert("Sign-up failed: " + error.message);
    }
}

// Login Function
async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        hideElement("login");
    } catch (error) {
        console.error("Error logging in: ", error);
        alert("Login failed: " + error.message);
    }
}

// Logout Function
async function logout() {
    try {
        await signOut(auth);
        alert("Logged out successfully!");
        hideElement("dashboard");
        showElement("login");
    } catch (error) {
        console.error("Error logging out: ", error);
    }
}

// Monitor Auth State
export function monitorAuthState(auth) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            hideElement("auth");
            hideElement("login");
            try {
                const profile = await fetchUserProfile();
                if (profile) {
                    displayDashboard(profile);
                } else {
                    showElement("profile");
                }
            } catch (error) {
                console.error("Error fetching profile: ", error);
                showElement("profile");
            }
        } else {
            hideElement("auth");
            hideElement("profile");
            hideElement("dashboard");
            showElement("login");
        }
    });
}
