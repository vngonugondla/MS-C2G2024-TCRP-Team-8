from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from .user_profile import UserProfile

from datetime import datetime

class MatchmakingService:
    """
    TODO A class service representing a matchmaking service.
    """

    def __init__(self):
        self.model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

