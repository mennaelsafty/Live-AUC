# This function adds each interest in the list to the user's set of interests.
   # If the user already has an interest set, it updates it with new interests.



interests_db = {} # a dictionary where each user_id is associated with a set of interests


def saveInterests(user_id, interests): # user_id: unique identitfier for the user 
 
    
   
    # Check if the user already has interests saved
    if user_id not in interests_db:
        # If not, create a new set for their interests
        interests_db[user_id] = set()
    
    # Add each interest from the provided list to the user's interest set
    for interest in interests:
        interests_db[user_id].add(interest)
    
    # Return a confirmation message with the saved interests
    return f"Interests saved for user {user_id}: {interests_db[user_id]}"
