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

        self.connection = get_connection()  # Establish a connection to the database

        # Check if the connection is established
        if self.connection:
            self.cursor = self.connection.cursor(dictionary=True)
        else:
            raise Exception("Failed to establish a database connection")

    # Methods for Event-related queries
    def search_events(self, search_term):
        query = "SELECT * FROM appEvents WHERE MATCH(eventName, eventDesc) AGAINST (%s IN NATURAL LANGUAGE MODE);"
        values = (f"%{search_term}%",)
        self.cursor.execute(query, values)
        return self.cursor.fetchall()
    
     # Method to close the database connection when done
    def close_connection(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
            print("MySQL connection is closed")
