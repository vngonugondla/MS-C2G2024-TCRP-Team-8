import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { initializeUtils } from './utils.js';
import { initializeEventListeners as initAuthListeners, monitorAuthState } from './auth.js';
import { initializeEventListeners as initProfileListeners } from './profile.js';
import { initializeEventListeners as initStaffListeners } from './staff.js';

// Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCI7-xsAfkDrCPEMm1C9knWGkpQAV8Mny8",
//     authDomain: "ms-c2g2024-tcrp-team8.firebaseapp.com",
//     projectId: "ms-c2g2024-tcrp-team8",
//     storageBucket: "ms-c2g2024-tcrp-team8.appspot.com",
//     messagingSenderId: "924628428989",
//     appId: "1:924628428989:web:d67faac5b596d19a28efd4",
//     measurementId: "G-HT2GL8B717"
// };

// // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

// // Initialize utilities
// // initializeUtils();

// // Initialize event listeners
// // initAuthListeners();
// // initProfileListeners();
// // initStaffListeners();

// // Monitor authentication state
// //monitorAuthState(auth);

export { auth };






