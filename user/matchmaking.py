from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from .user_profile import UserProfile

from datetime import datetime

def find_matches(user, community, k=3):
    """
    Find the top k users in the community that are most similar to the given user.
    """
    # Compute similarity scores between the given user and all other users in the community
    similarity_scores = [(other_user, compute_similarity(user, other_user)) for other_user in community if other_user != user]

    # Sort the similarity scores in descending order
    similarity_scores.sort(key=lambda x : x[1], reverse=True)
    
    # Get the top k most similar users
    return similarity_scores[:k]

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
def compute_similarity(user1, user2):
    """
    Compute a similarity score between two user profiles.
    """

    # Check if comparing the same user (sim(A, A) should always be 1)
    if user1 == user2:
        return 1.0

    # Define attribute similarity functions
    def age_similarity(user1, user2):
        try:
            return 1 / (
                1 + 3 * (
                    abs(user1.birthday.year - user2.birthday.year) / 
                    ((datetime.now().year - user1.birthday.year + datetime.now().year - user2.birthday.year) / 2)
                ) ** 2
            )
        except:
            return 0.5  # Neutral score if age is missing

    def gender_similarity(user1, user2):
        return 1 if user1.gender == user2.gender else 0

    def location_similarity(user1, user2):
        return 1 if user1.location == user2.location else 0

    def created_at_similarity(user1, user2):
        try:
            return max(365 - abs((user1.created_at - user2.created_at).days), 0) / 365
        except:
            return 0.5  # Neutral score if created_at is missing

    def community_role_similarity(user1, user2):
        return 1 if user1.community_role == user2.community_role else 0

    def associates_similarity(user1, user2):
        if not user1.associates or not user2.associates:
            return 0.5  # Neutral score if associates are missing
        common_associates = sum([1 for associate in user1.associates if associate in user2.associates])
        return min(common_associates, 5) / 5  # Normalize between 0 and 1
    
    def plaintext_similarity(user1, user2):
        """
        Compute similarity between two strings using a pre-trained sentence transformer model.
        """

        if not user1 or not user2:
            return 0.5

        embeddings = model.encode([user1, user2])
        return cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]

    # Updated bio and interest similarity checks for empty cases
    bio_score = plaintext_similarity(user1.bio, user2.bio) if user1.bio and user2.bio else 0.5
    interest_score = plaintext_similarity(user1.interests, user2.interests) if user1.interests and user2.interests else 0.5

    # Hardcoded weights for different profile attributes
    weights = {
        'age' : 0.25,
        'gender' : 0.1,
        'location' : 0.15,
        'created_at' : 0.1,
        'community_role' : 0.1,
        'associates' : 0.05,
        'bio' : 0.125,
        'interests' : 0.125
    }

    # Calculate feature similarity scores
    features = [
        age_similarity(user1, user2),
        gender_similarity(user1, user2),
        location_similarity(user1, user2),
        created_at_similarity(user1, user2),
        community_role_similarity(user1, user2),
        associates_similarity(user1, user2),
        bio_score,
        interest_score
    ]

    # Compute total similarity score using weighted sum
    total_similarity = sum([weight * feature for weight, feature in zip(weights.values(), features)])

    return min(total_similarity, 1.0)