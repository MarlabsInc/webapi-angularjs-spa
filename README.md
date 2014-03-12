webapi-angularjs-spa v1.1.0
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

1. Build the solution to install Nuget packages.(This will automatically restore Nuget packages. Please ensure you have Nuget version 2.7 or higher)
2. The Project ResourceMetada.API is configured to run using IIS.

Client-Side
-----------
      
1. Config.js file at  ***[source/ResourceMetadata/ResourceMetadata.Web/Scripts/config.js](https://github.com/MarlabsInc/webapi-angularjs-spa/tree/master/source/ResourceMetadata/ResourceMetadata.Web/Scripts/config.js)*** holds the api url used by the Client application. Update this file to change the api url appropriately.
2. If you haven't installed Node.js, download and install it from http://nodejs.org/
3. Navigate to the Scripts directory of ResourceMetadata.Web project ***[source/ResourceMetadata/ResourceMetadata.Web/Scripts/](https://github.com/MarlabsInc/webapi-angularjs-spa/tree/master/source/ResourceMetadata/ResourceMetadata.Web/Scripts)*** in command prompt.
4. Run command **npm install**
5. Execute gulp tasks
    1. Run command **gulp build**.
    2. In order to clean the destination files created by build task, run **gulp cleanbuild**.

# Roadmap Targets

* Code refactoring.
* Unit tests with Karma/Jasmine
* Task automation with Gulp.js
* Leverage Browserify 
* Performance optimizations and best prarctices for SPA.



