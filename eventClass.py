# Event class 

# Using database connection
from db import get_connection

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows React Native frontend to access the backend

class Event:
    def __init__(self, event_id):
        self.__eventID = event_id  # Store the id (used to fetch event data from the database)
        self.connection = get_connection()  # Establish a connection to the database

        # Check if the connection is established
        if self.connection:
            self.cursor = self.connection.cursor()

            # SQL query to fetch the event's info from the database
            sql_query = """SELECT eventName, Audience, Price, eventDesc, Organizer_email, eventStatus, DatenTime, displayPic, maxSeats, seatsFilled FROM appEvents WHERE event_id = %s"""
            self.cursor.execute(sql_query, (self.__eventID,))  # Execute the query with the provided id
            event_data = self.cursor.fetchone()  # Fetch the result as a single row

            # Print the user_data for debugging purposes
            print("Event data fetched:", event_data)
            print(event_data)

            # If user data exists, populate the instance variables
            if event_data:
                self.Name = event_data[0]  # (first column)
                self.Audience = event_data[1]   # (second column)
                self.Price = event_data[2]  # (third column)
                self.eventDesc = event_data[3]  # (fourth column)
                self.orgEmail = event_data[4]  # (fifth column)
                self.eventStatus = event_data[5]   # (sixth column)
                self.datenTime = event_data[6]   # (seventh column)
                self.displayPic = event_data[7] 
                self.maxSeats = event_data[8]
                self.seatsFilled = event_data[9]
            
            else:
                # If the event is not found, handle the case by assigning default values
                self.Name = None  
                self.Audience = None  
                self.Price = 0 
                self.eventDesc = None
                self.orgEmail = None 
                self.eventStatus = None 
                self.datenTime = None  
                self.displayPic = None 
                self.maxSeats = 0
                self.seatsFilled = 0

        else:
             # If the connection fails, set all attributes to None or default values
            print("Failed to connect to the database")
            self.Name = None  
            self.Audience = None  
            self.Price = 0 
            self.eventDesc = None
            self.orgEmail = None 
            self.eventStatus = None 
            self.datenTime = None 
            self.displayPic = None 
            self.maxSeats = 0
            self.seatsFilled = 0


    # Not implemented in sprint 1
    def addDiscussion(self):
        pass

    # Returns event details 
    def loadEvent(self):
        if self.Name: 
            # Gather event info into a dictionary
            event_info = {
                "Name": self.Name,
                "Price": self.Price,
                "Description": self.eventDesc,
                "Audience": self.Audience,
                "DateTime": self.datenTime, 
                "Status" : self.eventStatus, 
                "Organizer": self.orgEmail,
                "displayPic": self.displayPic,
                "maxSeats": self.maxSeats,
                "seatsFilled": self.seatsFilled
            }
            return event_info
        
        # In case event data is missing or not found
        return jsonify({"error": "Event not found"}), 404  # Optional error response with status code
    
    

    def checkAvail(self):
        try:
            # SQL query to fetch maxSeats and seatsFilled for the event
            sql_query = "SELECT maxSeats, seatsFilled FROM appEvents WHERE event_id = %s"
            self.cursor.execute(sql_query, (self.__eventID,))
            result = self.cursor.fetchone()

            if result:
                max_seats, seats_filled = result  # Extract the values
                return seats_filled < max_seats  # True if seats are available, False otherwise
            else:
                print("Event not found in database.")
                return False  # No event data, assume no availability

        except Exception as e:
            print(f"Error checking availability: {e}")
            return False  # In case of error, assume no availability

    # Returns true if the event is paid, false otherwise 
    def checkPay(self):
        if self.Price != 0:
            return True
        
        return False 


     # Method to close the database connection when done
    def close_connection(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
            print("MySQL connection is closed")

   
class ImageType:
    def __init__(self, png, jpg, bmp, svg):
        self.png = png
        self.jpg = jpg
        self.bmp = bmp
        self.svg = svg
