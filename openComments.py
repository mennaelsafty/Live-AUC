# Mock database for storing comments related to events
# Each event_id in `comments_db` is associated with a list of comments
 # Example format
    # "event_id_1": ["Great event!", "Looking forward to it!"],
    # "event_id_2": ["Can't wait!", "Interesting topic!"]
comments_db = {}

def openComments(event_id): #Retrieve all comments for a specific event based on event_id.

    
    # Retrieve comments from the database if the event_id exists; if not, return an empty list
    return comments_db.get(event_id, [])
