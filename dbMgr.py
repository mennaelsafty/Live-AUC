# Database Manager class 

# Using database connection
from db import get_connection

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows React Native frontend to access the backend

class dbMgr:
    def __init__(self, db):
        self.db = db

    # Methods for Event-related queries
    def search_events(self, search_term):
        query = "SELECT * FROM appEvents WHERE name LIKE %s OR description LIKE %s"
        values = (f"%{search_term}%", f"%{search_term}%")
        cursor = self.db.cursor(dictionary=True)
        cursor.execute(query, values)
        return cursor.fetchall()
