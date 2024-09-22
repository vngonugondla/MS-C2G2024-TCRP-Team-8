import logging
from firebase_admin import firestore

logging.basicConfig(level=logging.INFO)

class FirestoreService:
    def __init__(self):
        self.db = firestore.client()

    def get_user_profile(self, uid):
        try:
            doc_ref = self.db.collection('users').document(uid)
            doc = doc_ref.get()
            if doc.exists:
                return doc.to_dict()
            else:
                logging.warning(f"User profile not found for uid: {uid}")
                return None
        except Exception as e:
            logging.error(f"Error retrieving user profile: {e}")
            return None

    def create_user_profile(self, uid, user_data):
        try:
            doc_ref = self.db.collection('users').document(uid)
            doc_ref.set(user_data)
            logging.info("Profile created successfully.")
        except Exception as e:
            logging.error(f"Error creating user profile: {e}")

    def update_user_profile(self, uid, user_data):
        try:
            doc_ref = self.db.collection('users').document(uid)
            doc_ref.set(user_data, merge=True)
            logging.info("Profile updated successfully.")
        except Exception as e:
            logging.error(f"Error updating user profile: {e}")

    def delete_user_profile(self, uid):
        try:
            doc_ref = self.db.collection('users').document(uid)
            doc_ref.delete()
            logging.info("Profile deleted successfully.")
        except Exception as e:
            logging.error(f"Error deleting user profile: {e}")

  
    def add_interest(self, uid: str, interest: str):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data or 'interests' not in user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            
            user_data['interests'].append(interest)
            self.update_user_profile(uid, user_data)
        except Exception as e:
            logging.error(f"Error adding interest: {e}")
            raise

    def remove_interest(self, uid, interest):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data or 'interests' not in user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            try:
                user_data['interests'].remove(interest)
            except ValueError:
                logging.warning(f"Interest not found in user profile for uid: {uid}")
                raise
            self.update_user_profile(uid, user_data)
            return user_data
        except Exception as e:
            logging.error(f"Error removing interest: {e}")
            raise

    def add_bio(self, uid, bio):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data or 'bio' not in user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            user_data['bio'] = bio
            self.update_user_profile(uid, user_data)
            return user_data
        except Exception as e:
            logging.error(f"Error adding bio: {e}")
            raise

    def remove_bio(self, uid):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data or 'bio' not in user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            user_data['bio'] = ''
            self.update_user_profile(uid, user_data)
            return user_data
        except Exception as e:
            logging.error(f"Error removing bio: {e}")
            raise

    def add_profile_picture(self, uid, profile_picture):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data or 'profile_picture' not in user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            user_data['profile_picture'] = profile_picture
            self.update_user_profile(uid, user_data)
            return user_data
        except Exception as e:
            logging.error(f"Error adding profile picture: {e}")
            raise

    def remove_profile_picture(self, uid):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data or 'profile_picture' not in user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            user_data['profile_picture'] = ''
            self.update_user_profile(uid, user_data)
            return user_data
        except Exception as e:
            logging.error(f"Error removing profile picture: {e}")
            raise

    # Admin/Sys use only 

    def change_email(self, uid, email):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            user_data['email'] = email
            self.update_user_profile(uid, user_data)
            return user_data
        except Exception as e:
            logging.error(f"Error changing email: {e}")
            raise

    def change_phone(self, uid, phone):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            user_data['phone'] = phone
            self.update_user_profile(uid, user_data)
            return user_data
        except Exception as e:
            logging.error(f"Error changing phone: {e}")
            raise

    def get_all_users(self, query='all'):
        # query can be 'all', 'staff', 'member'
        try:
            users_ref = self.db.collection('users')
            query_ref = users_ref.where('community_role', '==', query) if query != 'all' else users_ref
            docs = query_ref.stream()

            all_users = []
            for doc in docs:
                user_data = doc.to_dict()
                all_users.append(user_data)
            return all_users
        except Exception as e:
            logging.error(f"Error retrieving all users: {e}")
            raise

    def toggle_user_active_status(self, uid):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data or 'active' not in user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            user_data['active'] = not user_data['active']
            self.update_user_profile(uid, user_data)
            return user_data
        except Exception as e:
            logging.error(f"Error toggling user active status: {e}")
            raise

    def toggle_user_approved_status(self, uid):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data or 'approved' not in user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            user_data['approved'] = not user_data['approved']
            self.update_user_profile(uid, user_data)
            return user_data
        except Exception as e:
            logging.error(f"Error toggling user approved status: {e}")
            raise

    def set_points(self, uid, points):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            user_data['points'] = points
            self.update_user_profile(uid, user_data)
            return user_data
        except Exception as e:
            logging.error(f"Error setting user points: {e}")
            raise

    def get_points(self, uid):
        try:
            user_data = self.get_user_profile(uid)
            if not user_data or 'points' not in user_data:
                logging.warning(f"User profile not found for uid: {uid}")
                raise ValueError(f"User profile not found for uid: {uid}")
            return user_data['points']
        except Exception as e:
            logging.error(f"Error getting user points: {e}")
            raise

    def get_all_points(self):
        try:
            all_users = self.get_all_users()
            if not all_users:
                logging.warning("No users found.")
                raise ValueError("No users found.")
            all_points = []
            for user in all_users:
                if 'points' in user:
                    all_points.append(user)
            return all_points
        except Exception as e:
            logging.error(f"Error getting all user points: {e}")
            raise