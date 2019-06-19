# Travel Berlin
Welcome to your one-stop shop for cool Berlin attractions provided by experienced and vetted Berlin locals. Login online to explore in real life!

# Current Stage of Development
Our team is working diligently to get these sites to your fingertips as soon as possible. However, we still want you onboard! Right now, you can create a profile and edit if you need to change it in the future. We plan to add detailed attraction views, ability for users to weigh in on the attractions, and much more.

# Project Overview
```
├── DESIGNDOCS.md
├── LICENSE
├── README.md
├── app
├── build.sbt
├── conf
├── logs
├── node_modules
├── project
├── react.png
├── sbt
├── sbt-dist
├── sbt.bat
├── target
├── test
├── ui
├── ui-build.sbt
└── yarn.lock
```
app: contains the scala backend

ui: contains the react front end

routes: contains the urls at which the frontend can call the scala backend api

Our backend is a restful api which gets its content from firebase.

## Frontend
Important Files:
```
├── node_modules //All the javascript libraries being used
├── package.json //List of the libraries used
├── public //Contains index.html page.  This is the page that the scala backend serves
├── src //Contains all the components
```
src Important Files: 
```
├── App.js //Contains all the routes beyond '/'
├── Client.js //Contains functions that send fetch requests to backend for json response
├── components //Contains each page and subcomponents ie. navbar
```

### Frontend to Backend Connection
Case Study: Attractions Page
Attractions.js uses Client.js to call /api/summary.  The scala backend Action calls firebase where the attractions are stored.  Within the Ok() response a json with all the content necessary is returned to Attractions.js.  At this point the data is parsed and passed in to a Attraction.js component.  Many of these are rendered into a responsive grid layout.

[Diagram](https://drive.google.com/file/d/1m5F_HyE3f3N98T9KChDUfyPJCATNDQ0p/view?usp=sharing)
## Backend
The three main Scala packages in our backend are controllers, models, and utils. The controllers package deals with communicating with receiving responses and sending back the appropriate message. The utils package contains any miscellaneous classes that we need for various tasks. Currently, it only contains the ValidateUser class which compares the Sha512 hashes of the entered password and the hash entered into the database. Finally, the models package contains the only classes that interact with the database. Each file in the models class corresponds with an object we want to store in the database, such as a User or Attraction. In addition, there are also methods to get information from and store information into the database for each class.

## Additional Features:
> Interactive and Adaptable UI: Compatible with all mainstream browsers, responsive to resizing and mobile viewing
> Privacy and Security: passwords hashed and kept encrypted in Firebase
> 
