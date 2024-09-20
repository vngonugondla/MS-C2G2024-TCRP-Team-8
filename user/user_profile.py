from datetime import datetime

class UserProfile:
    def __init__(self, user_id, name, email, phone, birthday, gender, bio="", interests=[], community_role='member', profile_picture=None, location=None, associates=[]):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.phone = phone
        self.birthday = datetime.strptime(birthday, '%Y-%m-%d')  
        self.gender = gender
        self.bio = bio
        self.interests = interests
        self.community_role = community_role
        self.profile_picture = profile_picture
        self.location = location
        self.associates = associates # List of direct connections
        self.approved = False # Whether or not the profile has been approved by CRP
        self.active = False # Whether or not the user is currently active in the community
        self.created_at = datetime.now() 
        self.points = 0  # Gamified reputation/points
   
    
    def update_user_id(self, new_user_id):
        self.user_id = new_user_id

    def update_bio(self, new_bio):
        self.bio = new_bio
    
    def update_interests(self, new_interests):
        self.interests = new_interests

    def update_email(self, new_email):
        self.email = new_email
    
    def update_phone(self, new_phone):
        self.phone = new_phone
    
    def update_profile_picture(self, new_picture_url):
        self.profile_picture = new_picture_url

    def update_location(self, new_location):
        self.location = new_location
    
    def change_approval(self):
        self.approved = not self.approved
    
    def change_active_status(self):
        self.active = not self.active
    
    def set_points(self, points):
        self.points = points    
    
    def add_associate(self, id, connection_type):
        associate = {
            "id": id,
            "connection_type": connection_type
        }
        self.associates.append(associate)
    
    def remove_associate(self, id):
        self.associates = [associate for associate in self.associates if associate["id"] != id]
        
    def display_profile(self):
        if not (self.active and self.approved):
            print("This user is not currently active and approved in the community.")
            return
        
        print(f"User ID: {self.user_id}")
        print(f"Name: {self.name}")
        print(f"Bio: {self.bio}")
        print(f"Interests: {self.interests}")
        print(f"Email: {self.email}")
        print(f"Phone: {self.phone}")
        print(f"Birthday: {self.birthday}")
        print(f"Location: {self.location}")
        print(f"Community Role: {self.community_role}")
        print(f"Points: {self.points}")
        print(f'Associates: {self.associates}')
        print(f'Approved: {self.approved}')
        print(f'Active: {self.active}')
        print(f'Created At: {self.created_at}')
