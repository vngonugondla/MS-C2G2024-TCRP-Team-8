import firebase_admin
from firebase_admin import credentials, auth, firestore
from app.core.config import settings
import logging

logging.basicConfig(level=logging.INFO)

try:
    cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS)
    firebase_app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    logging.info("Firebase initialized successfully.")
except Exception as e:
    logging.error(f"Error initializing Firebase: {e}")
    db = None  
    raise e 

def verify_token(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return uid
    except Exception as e:
        logging.error(f"Token verification failed: {e}")
        return None
