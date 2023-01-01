## Table of Contents

1. Authorisation and Authentication
    - [Register a new user](#register-a-new-user)
    - [Login an existing user](#login-an-existing-user)
2. Notes API
    - [Creating a new note](#creating-a-new-note)
    - [View all notes of a user](#view-all-notes-of-a-user)
    - [View a specific note](#view-a-specific-note)
    - [Update a note](#update-a-note)
    - [Delete a note](#delete-a-note)

Note: The base URL for all the endpoints in this webapp is `/api/v1`. All endpoints mentioned subsequently should be prefixed with this base URL.

### Authorisation and Authentication

- #### Register a new user
    `POST /users/register`\
    Creates a new user in the database, accepts a username and a password in the request body.\
    ###### request body (json):
    ```javascript
    {
        "username": String,
        "password": String
    }
    ```
    ###### response body (json):
    ```javascript
    {
        "status": "success",
        "message": "User created successfully"
    }
    ```

- #### Login an existing user
    `POST /users/login`\
    Logs in an existing user, accepts a username and password in the request body. The application uses JSON Web Tokens (JWTs) for authentication, where each token expires in 1 hour.\
    ###### request body (json):
    ```javascript
    {
        "username": String,
        "password": String
    }
    ```
    ###### response body (json):
    ```javascript
    {
        "status": "success",
        "message": "authenticated",
        "token": String
    }
    ```


### Notes API

All routes in this section expect authorisation headers in the following form, where `token` represents the JWT returned on the successful login of a user.
```json
"authorization": "Bearer token"
```

- #### Creating a new note
    `POST /notes`\
    Creates a new note and returns the newly created note upon successful creation.\
    ###### request body (json):
    ```javascript
    {
        "title": String,
        "body"?: String
    }
    ```
    ###### response body (json):
    ```javascript
    {
        "status": "success",
        "data": {
            "note": {
                "_id": String,
                "title": String,
                "body": String,
                "createdAt": DateString
            }
        }
    }
    ```

- #### View all notes of a user
    `GET /notes`\
    Fetches all notes authored by the currently authenticated user.\
    ###### response body (json):
    ```javascript
    {
        "status": "success",
        "data": {
            "total": Number,
            "notes": [
                {
                    "_id": String,
                    "title": String
                }
            ]
        }
    }
    ```

- #### View a specific note
    `GET /notes/:note_id`\
    Fetches a single note with an `_id` of `note_id` (as specified in the request params), authored by the currently authenticated user.\
    ###### response body (json):
    ```javascript
    {
        "status": "success",
        "data": {
            "note": {
                "_id": String,
                "title": String,
                "body": String,
                "createdAt": DateString
            }
        }
    }
    ```

- #### Update a note
    `PATCH /notes/:note_id`\
    Updates the title and/or body of a previously existing note created by the currently authenticated user.\
    ###### request body (json):
    ```javascript
    {
        "title"?: String,
        "body"?: String
    }
    ```
    ###### response body (json):
    ```javascript
    {
        "status": "success",
        "data": {
            "note": {
                "_id": String,
                "title": String,
                "body": String,
                "createdAt": DateString
            }
        }
    }
    ```

- #### Delete a note
    `DELETE /notes/:note_id`\
    Deletes a single note having the specified `note_id`. The request fails if no such note exists for the current user. The request succeeds with a status code of `204` upon successful deletion.