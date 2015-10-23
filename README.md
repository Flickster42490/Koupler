#Koupler
*Visit Koupler at koupler.xyz*
Check out the complete codebase at https://github.com/repl-rebels/Koupler

Koupler is an app that matches couples interested in doing things together. We built it on the MEAN stack (mySQL, express, angular, node). Koupler is built with a client side and a server side, respectively the front-end and the back-end. I will use those terms interchangeably throughout this document. 

##Technologies

####Angular: 

There are 3 views, 3 controllers, and 1 factory:
Signup/signin, which is powered by AuthController
Activities, which is powered by ActivitiesController
Match, which is powered by MatchController
AuthTokenFactory, which can get, set, or authorize tokens

####Node/Express

There are two routers:
Couples Router, which handles get and post requests from the signin/signup portion of the angular app
Activities Router, which handles get and post requests from the activities and match portion of the angular app

####MySQL

There are two tables:
Couples, which records each couples metadata and login details
Activities, which records the activities that each couple is interested in

#Style Guide

We used the MakerSquare style guide for this project to ensure consistency and readability. You can reference the style guide here. 

####Coding Examples

We would like to highlight a few processes in the code that may be easily overlooked and occur regularly. 

*Authenticating*: In the client-section of the project in the auth folder there is the auth.js file. A new auth token will need to be created for each new user or returning user

![alt text](http://s19.postimg.org/p4cnke94j/kouple1.png)

*Getting Matched with a Couple*: In the server-section of our project in the activities folder there is the activityCtrl.js file. A query to the database must be sent and will return a random match. 

![alt text](http://s19.postimg.org/d17bwty2b/kouple2.png)

*Rendering Home Page*: In client-section of our project in the app.js file. The code below loads the homepage without making any initial calls to the server. 

![alt text](http://s19.postimg.org/rj4j4tpdf/kouple_3.png)
