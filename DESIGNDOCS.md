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

## Backend
