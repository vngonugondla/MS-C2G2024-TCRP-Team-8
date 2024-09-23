import { auth } from './app.js';
import { showElement, hideElement } from './utils.js';
import { fetchAllUsers, toggleUserActiveStatus, fetchUserProfileById, updateUserProfile, editUserProfile } from './services/staffService.js';
import { populateProfileForm } from './profile.js';

export function initializeEventListeners() {
    document.getElementById("openStaffPortalButton").addEventListener("click", openStaffPortal);
    document.getElementById("closeStaffPortalButton").addEventListener("click", closeStaffPortal);
    document.getElementById("usersTable").addEventListener("click", handleTableClick);
}

// Open Staff Portal
async function openStaffPortal(event) {
    event.preventDefault();
    await loadAllUsers();
}

// Close Staff Portal
function closeStaffPortal() {
    hideElement("staffPortal");
}

// Load all users and populate the table
async function loadAllUsers() {
    try {
        const allUsers = await fetchAllUsers();
        populateUsersTable(allUsers);
        showElement("staffPortal");
    } catch (error) {
        console.error("Error fetching all users: ", error);
        alert("Failed to retrieve users.");
    }
}

// Populate Users Table in Staff Portal
function populateUsersTable(users) {
    const tbody = document.getElementById("usersTable").getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing rows

    users.forEach(user => {
        const row = tbody.insertRow();
        const nameCell = row.insertCell(0);
        const emailCell = row.insertCell(1);
        const roleCell = row.insertCell(2);
        const activeCell = row.insertCell(3);
        const actionsCell = row.insertCell(4);

        nameCell.textContent = user.name || 'N/A';
        emailCell.textContent = user.email || 'N/A';
        roleCell.textContent = user.community_role || 'N/A';
        activeCell.textContent = user.active ? 'Yes' : 'No';

        actionsCell.innerHTML = `
            <button class="toggle-active" data-id="${user.user_id}" data-active="${user.active}">${user.active ? 'Deactivate' : 'Activate'}</button>
            <button class="edit-user" data-id="${user.user_id}">Edit</button>
        `;
    });
}

// Handle table click events
function handleTableClick(event) {
    const target = event.target;
    if (target.classList.contains('toggle-active')) {
        const userId = target.getAttribute('data-id');
        const isActive = target.getAttribute('data-active') === 'true';
        handleToggleActive(userId, isActive);
    } else if (target.classList.contains('edit-user')) {
        const userId = target.getAttribute('data-id');
        handleEditUser(userId);
    }
}

// Handle Toggle User Active Status
function handleToggleActive(uid, active) {
    const newActiveStatus = !active;
    toggleUserActiveStatus(uid, newActiveStatus)
        .then(() => {
            loadAllUsers(); // Refresh the users table
            alert(`User has been ${newActiveStatus ? 'activated' : 'deactivated'} successfully.`);
        })
        .catch(error => {
            console.error('Error toggling user active status:', error);
            alert('Failed to update user status.');
        });
}

// Handle Edit User 
function handleEditUser(targetUid) {
    editUserProfile(targetUid);
}


export { loadAllUsers }