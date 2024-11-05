
def displayDescription(description, char_limit=100):  
  
    # Check if the length of the description is within the character limit
    if len(description) <= char_limit:
        # If within limit, return the full description
        return description
    else:
        # If it exceeds the limit, truncate the description and add "..." to indicate more text
        return description[:char_limit] + "... (Read more)"
