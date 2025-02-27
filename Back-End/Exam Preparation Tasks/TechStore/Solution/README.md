# SoftUni JS Back-End Course Exam Preparation

## Cheat Sheet

1. Initialize project
 - [x] `npm init --yes`
 - [x] Change module system
 - [x] Nodemon setup `npm i -D nodemon`
 - [x] Add start script
 - [x] Set up debugging
2. Express
 - [x] `npm i express`
 - [x] Set up initial express server
 - [x] Add public resources(images, css...) !!! Should change it for every exam
 - [x] Add static middleware
 - [x] Add body parser
 - [x] Add routes modular router
 - [x] Add Home controller
3. Handlebars
 - [x] Instal `npm i express-handlebars`
 - [x] Config handlebars to work with express (as view engine)
 - [x] Enable mongo document to be passed to the view
 - [x] Change views directory
 - [x] Add rosouces to views folder
 - [x] Add Home view
 - [x] Add layout
 - [x] Add partials dir
4. Database
 - [x] Install mongoose `npm i mongoose`
 - [x] Set up database connection
 - [x] Add User model
5. Register
 - [x] Fix navigation links
 - [x] Add register view
 - [x] Add Auth controller
 - [x] Add Register page (GET action)
 - [x] Fix register form
 - [x] Add Auth service with register functionality
 - [x] Install bcrypt `npm i bcrypt`
 - [x] Hash password
 - [x] Check confirmPassword
 - [x] Check if user exists
6. Login 
 - [x] Install jsonwebtoken `npm i jsonwebtoken`
 - [x] Add login view
 - [x] Add GET login acton
 - [x] Fix login form
 - [x] Add POST login action
 - [x] Add login to auth service
 - [x] Validate user
 - [x] Validate password
 - [x] Generate token
 - [x] Return token as cookie
 - [x] Auto login on register
7. Logout
 - [x] Add logout GET action
8. Authentication
 - [x] Install cookie parser `npm i cookie-parser`
 - [x] Add cookie parser middleware
 - [] Add Auth middleware 
 - [x] Check if guest
 - [x] Token verification
 - [x] Attach user to request
 - [x] Attach user to handlebars context (res.locals)
9. Authorization 
 - [x] Add isAuth middleware (put on all pages that should be able only for authenticated users)
 - [x] Add route guard authorization (unauthorized users can not access some pages via url )
10. Error Handling and notification (put everywhere where have asyc operations)
 - [x] Add notifications
 - [x] Extract error message (getError message finction)
 - [x] Add error handling for register
 - [x] Add error handlig for login

11. Bonus
 - [x] Dynamic Navigation
 - [] Dynamic Titles
 - [] Async jsonwebtoken
 - [] View bag