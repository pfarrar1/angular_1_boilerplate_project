# Angular 1 Boilerplate Project

### About This Repo

> This repo is not actively maintained, but I will continue to build out documentation and make refinements. 

> This template has helped me to rapidly build out prototypes. Hosting and deployment of this may be subject to change and please choose wisely and at your expense before deploying this code to production. This is an example of one way to start out. Not responsible for bugs or unintended uses from this. If you use this, you are using at your own risk.

This project is an AngularJS starter application that I put together of common sets of things I use in the workflow. This template has helped me get simple prototype applications started without building out the same infrastructure over and over. 

#### What vendor libraries are in the project

* "angular": "^1.5.6", (possibility to be migrated to Angular 1.7.0 in the future);
* "angular-animate": "^1.5.6",
* "angular-route": "^1.5.6",
* "angular-resource": "^1.5.6",
* "angular-sanitize": "^1.5.6",
* "angular-bootstrap": "^1.3.3",
* "font-awesome": "^4.6.3",
* "bootstrap": "^3.3.6", (possibility to be migrated to Bootstrap 4 in the future);
* "underscore": "^1.8.3",
* "moment": "^2.13.0",
* "html5shiv": "^3.7.3",
* "respond": "^1.4.2",
* "Chart.js": "^2.1.5", (used for charting library)
* "leaflet": "leaflet-dist#^0.7.2" (used for maps library)

### Getting Started

To get started clone or fork this repo as a new project to use. 

`git clone https://github.com/pfarrar1/angular_1_boilerplate_project.git`

#### Running the App

To run the app 
Download the source. 

Make sure you have Node, and Bower installed. 

Run `npm install` to install node dependencies

Run `bower install` to install bower packages. 

To start ap cd to app home directory. 
Run `node server.js` 

Navigate to http://localhost:8080/ in your web browser.

#### Making Changes

This project uses `gulp` as the build manager to build minified versions of the JS, compile the SASS to production ready code. Compiled assests will be added to the `../angular_1_boilerplate_projecct/app/dist/` directory. Running `gulp` will also trigger the `gulp watch` which will watch the application js files and SASS files for changes and automatically trigger rebuild/compile.

Runnning `gulp` will run the following task 

> `gulp.task('default', ['scripts', 'vendor-scripts', 'ie8-scripts', 'vendor-styles', 'sass', 'watch', 'icons']);`

* This task will build angular scripts and compile them to `../angular_1_boilerplate_projecct/app/dist/js/core/all.js` & `../angular_1_boilerplate_projecct/app/dist/js/core/all.min.js`
* This task will build vendor scripts and compile them to `../angular_1_boilerplate_projecct/app/dist/js/vendor/all.js` & `../angular_1_boilerplate_projecct/app/dist/js/vendor/all.min.js`
* This task will concat vendor styles and minify the css to `../angular_1_boilerplate_projecct/app/dist/styles/vendor-style.css` & `../angular_1_boilerplate_projecct/app/dist/styles/vendor-style.min.css`
* This task will compile `main.scss` SASS to `../angular_1_boilerplate_projecct/app/dist/styles/style.css` & `../angular_1_boilerplate_projecct/app/dist/styles/style.min.css`

##
This projects uses open source projects, libraries, and frameworks. Please refer to their specific documentation for use cases. 
