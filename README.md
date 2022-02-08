# 101250449_lab_test1_chat_app
Lab Test Full Stack Development 2 George Brown College (NodeJS, socket.io, mongoose)

Page 1 of 3
COMP 3133 – Lab Test – 1 (06%)
Due Date: 08th Feb 2022 08:00 PM
Create Chat Application having following features:
1) Create chat application name studentID_lab_test1_chat_app and GitHub
repo
2) User can connect to chat server
3) Create Signup page to create new account (use username for unique
identification)
4) Create Login page to authenticate existing user
5) After successful login allow user to join room from given room list (news,
covid19, nodeJS, etc.)
6) User can leave the room
7) Users are only allowed to chat within their own room
8) Store all the user details and chat message to mongoDB for future
retrieval.
9) Add “user is typing…” feature to the chat application
10) User can logout from the system
Sample user schema
{
“_id”: j35nn35hjdksgjkdsgs”,
“username”: “pritamworld”,
“firstname”: “pritesh”,
“lastname”: “Patel”,
“password”: “What about covid19 vaccine?”
“createon”: “01-28-2022 18:30 PM”
}
Sample Mongodb group message schema
{
“_id”: 847het8nieigouy4v”,
“from_user”: “pritamworld”,
“room”: “covid19”,
“message”: “What about covid19 vaccine?”
“date_sent”: “01-28-2021 18:30 PM”
}
Page 2 of 3
Sample Mongodb private message schema
{
“_id”: 847het8nieigouy4v”,
“from_user”: “pritamworld”,
“to_user”: “moxdroid”,
“message”: “What about covid19 vaccine?”
“date_sent”: “01-28-2021 18:30 PM”
}
Evaluation Criteria:
1) Maintaining GitHub repo with commits from your local machine. (Code upload not
accepted) (10 points)
2) Working signup screen with mongodb record creation and express API (15 point)
3) Working screen to login/logout with mongodb record creation and express API (15
point)
4) Mongoose schemas with validation (10 point)
5) User can join and leave the room (10 point)
6) Two users can chat in same room with mongodb storage (40 points)
Note:
1) User socket.io, express and mongoose modules
2) Use HTML5/CSS/Bootstrap/jQuery to design application/chat screens
Submission:
1) Upload ZIP file of your source code to the black board on or before deadline
2) Provide GitHub link during submission on BB
3) Take screenshots or record short video of your application/mongodb to show your
work evidence and upload to black board
4) No email submissions will be accepted, emails with such requests will not be
addressed or responded
5) Issues with submissions should be sent BEFORE the deadline
6) Any attempt to cheat will be handled according to the college policies and will result
in grade 0 for the labtest1and a report sent to the chair. Cheating includes not code
exchange (submitting code written by other students or from the internet or another
GitHub repo/tutorial)
Page 3 of 3
Sample Chat screen are only for reference
