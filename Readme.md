
social media using nodejs,express,mongoDB. Social media where you can post,comment like. (Ajax without refreshing page),connect chat with users.
Profile editing options (change profile pic ,change password)

Functionality:-
Post,like,comment( used Ajax without refreshing page),connect chat with users.
Profile editing options (change profile pic ,change password)

MVP structure,manual authenthication(created middleware), passport auth (signin using email,or google signin, signup),
API to login Using JWT,create session ,delete posts.Use of SCSS
send mail to user based on comments,running parallel jobs, run jobs based on priority using Kue with redis,
minifying css ,js using gulp, manifesting css js files name ,
production logs using rfs, chat engine using socket.io,

deployement :
using AWS ubuntu machine installed required things,some modifications, gone live using public ip and port,
ran server using pm2,Used nginx proxy server 
update inbound secrurity rules from aws ,connected domain name, Live on http://3.112.234.159:80
and on domain (i no longer maintain the domain name)
login/signin/starting session
![signin](https://user-images.githubusercontent.com/89533221/210455244-7f2dfe18-21c3-42e8-b83a-b9eafaf9909c.JPG =250x250)
<img src="https://user-images.githubusercontent.com/89533221/210455244-7f2dfe18-21c3-42e8-b83a-b9eafaf9909c.JPG" width="100" height="100">
signup/create account
![signup](https://user-images.githubusercontent.com/89533221/210455248-78dae878-a83e-4a38-bc27-4080df8fe92b.JPG =250x250)

![snap](https://user-images.githubusercontent.com/89533221/210455251-1c6ae3e6-1f24-423e-872d-6cb5d54313a8.JPG)
Chatting
![whole page](https://user-images.githubusercontent.com/89533221/210455255-01ea4697-9b54-41f5-b5cb-1387f378383a.JPG)

Comments
![with comment](https://user-images.githubusercontent.com/89533221/210455261-578b3071-acd1-4f8d-a3fa-0c2d547af910.JPG)
