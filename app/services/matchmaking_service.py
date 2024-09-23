from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime
import numpy as np
from app.models.user import User
from app.services.firestore_service import FirestoreService

class MatchmakingService:

    def __init__(self, user: User):
        firestore_service = FirestoreService()
        self.user = user
        self.model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
        self.community = firestore_service.get_all_users()
        self.scaler = MinMaxScaler()
        
    def encode_feature_vector(self, user: User):
        user_age = datetime.now().year - datetime.strptime(user['birthday'], "%Y-%m-%d").year
        gender_feature = self.model.encode(user["gender"]).flatten()
        location_feature = self.model.encode(user['location']).flatten()
        bio_feature = self.model.encode(user["bio"]).flatten()
        interests_feature = self.model.encode(" ".join(user["interests"])).flatten()
        community_role_feature = self.model.encode(user["community_role"]).flatten()
        points_feature = np.array([user["points"]])
        
        features = np.concatenate([
            [user_age],
            gender_feature,
            location_feature,
            bio_feature,
            interests_feature,
            community_role_feature,
            points_feature
        ])
        
        normalized_features = self.scaler.fit_transform([features])
        
        return normalized_features

    def knn(self, k):
        user_features = self.encode_feature_vector(self.user)
        
        similarities = []
        for user in self.community:
            if user != self.user:
                other_user_features = self.encode_feature_vector(user)
                similarity = cosine_similarity(user_features, other_user_features)
                similarities.append((user, similarity[0][0]))
    
        # Sort by similarity and return only the user dictionaries
        sorted_users = [user for user, _ in sorted(similarities, key=lambda x: x[1], reverse=True)[:k]]
        return sorted_users

    def recommend(self, k):
        return self.knn(k)