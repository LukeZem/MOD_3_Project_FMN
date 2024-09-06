# Family Movie Night

## Introduction
The intended design behind this project was to create an application for families or friends planning a movie night to put up movie suggestions. 
They can write a review of the movie which in this case would serve as a justification for why that movie should be the pick!

## Technologies Used

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js, JWT (token auth), Bcrypt (password hashing), CORS (cross-origin resource sharing), Helmet (basic security)
- **Database**: MongoDB (NoSQL)
- **APIs**: Movie database OMDB

## Getting Started
To get a local copy up and running, follow these simple steps by opening a CLI of your choosing in your desired folder and run these git commands.

1. `git clone https://github.com/LukeZem/MOD_3_Project_FMN.git`  
   // Creating a local copy of the repo
2. `cd MOD_3_Project_FMN`  
   // Moving into the new project folder
3. `git remote remove origin`  
   // Removes the link to the original repo
4. `git remote add origin https://github.com/YourUserName/YourRepo.git`  
   // Links the local copy to your repo
5. `git push -u origin main`  
   // Pushes the code to your repo and sets it as the default upstream
6. `npm install`  
   // Installs the project dependencies
7. In a `.env` file, enter your API key as follows:
// Make sure to add your `.env` file and any other secret files to your `.gitignore` file

## Unsolved Problems
Currently, the images provided by the API are only rendering in the development environment.

## Works in Progress
1. Login/signup
2. Create user groups that only the users of those groups can access the reviews
3. Ability to upvote or downvote a movie choice by users within the group
4. Group chatrooms

