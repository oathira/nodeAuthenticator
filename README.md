 Folder Structure
 - controllers/
- models/
- routes/
- views/
- assets/
- config/
- utils/
- index.js
- package.json
Database Setup
  database system ( MongoDB) ,set up the necessary schema for users. Make sure to encrypt and store passwords securely.
   User Registration
Create a registration route that accepts user details (email, password, etc.), validates them, and saves the user in the database. Make use of password hashing libraries like bcrypt for storing encrypted passwords.
 User Login
Implement a login route that validates user credentials and establishes a session using Passport.js. Redirect the user to the homepage after successful login.
  User Logout
Create a logout route to destroy the user's session and redirect them to the login page.
 Social Authentication (Google)
Implement social authentication (e.g., Google OAuth) for both registration and login. Store necessary user information in your database.
  Notification System
Implement a notification system to display messages for events like unmatching passwords during signup and incorrect passwords during login. Libraries like "noty" can help with this
# nodeAuthenticator
