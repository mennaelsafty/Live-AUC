# Mock database for storing events
# Each event_id is associated with a dictionary containing event details
events_db = {
    "event_id_1": {"name": "SU talent show", "tags": ["entertainement", " social"]},
    "event_id_2": {"name": "Art Exhibition", "tags": ["art", "culture"]},
    "event_id_3": {"name": "Carrer Fair", "tags": ["business", "networking"]},
}

def searchEvents(interests):
  
    
    # List to store the IDs of matching events
    matching_events = []

    # Iterate over each event in the events_db
    for event_id, event_details in events_db.items():
        # Check if any of the event's tags match the user's interests
        if any(tag in interests for tag in event_details["tags"]):
            # If there's a match, add the event_id to the matching_events list
            matching_events.append(event_id)

    # Return the list of matching events
    return matching_events
