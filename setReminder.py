from datetime import datetime, timedelta
import time

# Mock database to store reminders for users
# Each user_id is associated with a list of reminders
reminders_db = {}

def setReminder(user_id, event_id, reminder_time):
   
    
    # Calculate the time for the reminder
    event_time = datetime.now() + timedelta(minutes=reminder_time)  # Example event time for the sake of simulation
    reminder_datetime = event_time - timedelta(minutes=reminder_time)

    # Store the reminder in the database
    if user_id not in reminders_db:
        reminders_db[user_id] = []

    # Add the reminder details to the user's reminders list
    reminders_db[user_id].append({
        "event_id": event_id,
        "reminder_time": reminder_datetime
    })

    # Simulate waiting until the reminder time (for demonstration purposes)
    time.sleep(reminder_time * 60)  # Wait for the specified time in seconds

    # Send reminder (printing to console as a placeholder for actual notification)
    print(f"Reminder: Event {event_id} is starting soon!")

    return f"Reminder set for user {user_id} for event {event_id}."
