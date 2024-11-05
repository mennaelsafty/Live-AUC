# Mock database for storing attendees for each event
# Each event_id is associated with a set of user_ids representing the attendees
attendees_db = {}

def register(event_id, user_id):
    
    # Check if the event already has an attendees list; if not, initialize it as an empty set
    if event_id not in attendees_db:
        attendees_db[event_id] = set()

    # Add the user_id to the event's attendees list
    attendees_db[event_id].add(user_id)

    # Return a confirmation message
    return f"User {user_id} registered for event {event_id}."
