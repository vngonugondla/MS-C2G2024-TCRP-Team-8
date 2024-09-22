import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { initializeUtils } from './utils.js';
import { initializeEventListeners as initAuthListeners, monitorAuthState } from './auth.js';
import { initializeEventListeners as initProfileListeners } from './profile.js';
import { initializeEventListeners as initStaffListeners } from './staff.js';

// Firebase configuration
const firebaseConfig = {
    // add secrets here 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize utilities
initializeUtils();

// Initialize event listeners
initAuthListeners();
initProfileListeners();
initStaffListeners();

// Monitor authentication state
monitorAuthState(auth);

export { auth };
