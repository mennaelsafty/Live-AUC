# User class 

# testfile = "C:\Users\Haya\Desktop\Live@AUC\Live-AUC\test.txt"

# Using database connection
from db import get_connection

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows React Native frontend to access the backend

class Student:
    def __init__(self, Email):
        self.Email = Email  # Store the email (used to fetch user data from the database)
        self.connection = get_connection()  # Establish a connection to the database

        # Check if the connection is established
        if self.connection:
            self.cursor = self.connection.cursor()

            # SQL query to fetch the user's profile info from the database
            sql_query = """SELECT userName, pfp, points, friends, following, major, phone FROM users WHERE email = %s"""
            self.cursor.execute(sql_query, (self.Email,))  # Execute the query with the provided email
            user_data = self.cursor.fetchone()  # Fetch the result as a single row

            # Print the user_data for debugging purposes
            print("User data fetched:", user_data)
            print(user_data)

            # If user data exists, populate the instance variables
            if user_data:
                self.Name = user_data[0]  # username (first column)
                self.PFP = user_data[1]   # profile picture URL (second column)
                self.Points = user_data[2]  # points (third column)
                self.Friends = user_data[3]  # number of friends (fourth column)
                self.Following = user_data[4]  # number of people the user is following (fifth column)
                self.Major = user_data[5]   # major (sixth column)
                self.Phone = user_data[6]   # phone (seventh column)

            
            else:
                # If the user is not found, handle the case by assigning default values
                self.Name = None
                self.PFP = None
                self.Points = 0
                self.Friends = 0
                self.Following = 0
                self.Major = None
                self.Phone = None
               
        else:
             # If the connection fails, set all attributes to None or default values
            print("Failed to connect to the database")
            self.Name = None
            self.PFP = None
            self.Points = 0
            self.Friends = 0
            self.Following = 0
            self.Major = None
            self.Phone = None
        
    # Method to return the user's profile information as a JSON response
    def loadPInfo(self):
         # Check if user data is available
        if self.Name:
            profile_info = {
                "username": self.Name,
                "pfp": self.PFP,
                "points": self.Points,
                "friends": self.Friends,
                "following": self.Following,
                "major": self.Major,
                "phone": self.Phone
            }
            return jsonify(profile_info)  # Ensure it returns a valid response
        
        # In case user data is missing or not found
        return jsonify({"error": "User not found"}), 404  # Optional error response with status code
    

    
     # Separate method to load the user's attended events
    def load_attended_events(self):
        # Check if the connection exists
        if self.connection:
            # SQL query to fetch event IDs for the given user email
            sql_query = """SELECT event_id FROM Event_attendees WHERE userEmail = %s"""
            self.cursor.execute(sql_query, (self.Email,))  # Execute the query with the provided email
            event_data = self.cursor.fetchall()  # Fetch all the event IDs the user has attended

            # If events are found, return them in a list
            attended_events = [event[0] for event in event_data]  # Extract event IDs from the result
            return attended_events
        else:
            print("Failed to connect to the database for attended events")
            return []

    # authentication function - merna 
    def login(self):
        pass
    
    # # Gets username from the addUsername function and inserts it into user table in app database 
    # def insertUsername(self, userName):
    #     sql_insert_query = """INSERT INTO users (userName) VALUES (%s, %s)"""
    #     data_to_insert = (userName)

    #     try:
    #         self.cursor.execute(sql_insert_query, data_to_insert)
    #         self.connection.commit()
    #         print("Record inserted successfully")
    #     except Error as e:
    #         print("Failed to insert record into MySQL table:", e)


    # def updateUsername(self, userName, email):
    #     """Update a specific column value in the database."""
    #     sql_update_query = """UPDATE users SET userName = %s WHERE email = %s"""
    #     data_to_update = (userName, email)

    #     try:
    #         self.cursor.execute(sql_update_query, data_to_update)
    #         self.connection.commit()
    #         print("Record updated successfully")
    #     except Error as e:
    #         print("Error while updating record:", e)


    # def updatePFP(self, pfp, email):
    #     """Update a specific column value in the database."""
    #     sql_update_query = """UPDATE users SET column_name = %s WHERE id = %s"""
    #     data_to_update = (pfp, email)

    #     try:
    #         self.cursor.execute(sql_update_query, data_to_update)
    #         self.connection.commit()
    #         print("Record updated successfully")
    #     except Error as e:
    #         print("Error while updating record:", e)


    # # Parses username from user email returned from authentication service 
    # def addUsername(self, email):
    #     # Setting email and username for user 
    #     Email = email
    #     Name = email.split('@')[0] 

    #     # Writing email and username to user table in app database 
    #     self.insertUsername(Name)


    # Not implemented for sprint 1 
    def saveEvent(self):
        pass
    
    # Not implemented for sprint 1
    def AddFriend(self):
        pass
    
    
    # Not implemented for sprint 1 
    def ReportUser(self):
        pass
    
    # Not implemented for sprint 1
    def AddComment(self):
        pass

    # Method to close the database connection when done
    def close_connection(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
            print("MySQL connection is closed")