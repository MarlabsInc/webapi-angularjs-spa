WebApi-AngularjJS-Spa v1.1.0
====================

[![alt text](http://www.marlabs.com/sites/default/files/logo.png "Marlabs")](http://www.marlabs.com)

A reference app for building single page apps (SPA) with ASP.NET Web API 2 and AngularJS, developed by [Marlabs](http://www.marlabs.com)

Technologies
============

Server-Side
-----------

* ASP.NET Web API 2
* EF 6 Code First 
* AutoMapper
* Autofac

Client-Side
-----------

* AngularJS
* Semantic UI
* Gulp.js

Building the application
============

Visual Studio
-----------

1. Build the solution to install Nuget packages.(This will automatically restore Nuget packages. Please ensure you have    Nuget version 2.7 or higher)
2. The Project ResourceMetada.API is configured to run using IIS Express.
3. Before starting the Client Application (ResourceMetadata.Web), please ensure that the API project is running in IIS     or IIS express.

Client-Side
-----------
      
1. Config.js file at  ***[source/ResourceMetadata/ResourceMetadata.Web/Scripts/config.js](https://github.com/MarlabsInc/webapi-angularjs-spa/tree/master/source/ResourceMetadata/ResourceMetadata.Web/Scripts/config.js)*** holds the api url used by the Client application. Update this file to change the api url appropriately.
2. If you haven't installed Node.js, download and install it from http://nodejs.org/
3. Navigate to the directory of ResourceMetadata.Web project ***[source/ResourceMetadata/ResourceMetadata.Web/](https://github.com/MarlabsInc/webapi-angularjs-spa/tree/master/source/ResourceMetadata/ResourceMetadata.Web/)*** in command prompt.
4. Run command **npm install**
5. Execute gulp tasks
    1. Run command **gulp build**.
    2. In order to clean the destination files created by build task, run **gulp cleanbuild**.
    
Migrating from v1.0.0 to v1.1.0
-------------------------------
  If you are already using the Application version 1.0.0, please drop the database ResourceMetadata from your SQL server before running the Application
    
# Current Features

* REST API with ASP.NET Web API 2.
* Server-Side security with ASP.NET Identity.
* Single Page Application(SPA) with AngularJS.
* AngularJS factory $resource for interacting with RESTful server-side data sources.
* AngularJS $http interceptors.
* AngularJS directives.
* Task automation with Gulp.js


# Roadmap Targets

* Code refactoring.
* Unit tests with Karma/Jasmine
* Leverage Browserify 
* Performance optimizations and best prarctices for SPA.



