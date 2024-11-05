# Mock database for storing event attendees and their visibility status
# Each event_id in `attendees_db` is associated with a dictionary of user_ids and their visibility status
attendees_db = {
    # Example format
    # "event_id_1": {"user_id_1": 1, "user_id_2": 0}
    # where 1 = visible, 0 = hidden
}

def hideUser(event_id, user_id, hide):
    # Check if the event exists in the database; if not, initialize it
    if event_id not in attendees_db:
        attendees_db[event_id] = {}

    # Set the user's visibility status for the event
    attendees_db[event_id][user_id] = hide

    # Return a confirmation message
    return f"User {user_id} visibility set to {'visible' if hide == 1 else 'hidden'} for event {event_id}"
