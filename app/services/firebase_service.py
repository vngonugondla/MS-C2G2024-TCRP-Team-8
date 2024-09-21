import firebase_admin
from firebase_admin import credentials, auth, firestore
from app.core.config import settings

firebase_app = None
db = None

def initialize_firebase():
    global firebase_app, db
    if not firebase_app:
        cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS)
        firebase_app = firebase_admin.initialize_app(cred)
        db = firestore.client()

def verify_token(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return uid
    except Exception:
        return None
