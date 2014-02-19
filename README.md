webapi-angularjs-spa
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

Client-Side
-----------
          
1. If you haven't installed Node.js, download and install it from http://nodejs.org/
2. Navigate to project directory ***[source/ResourceMetadata/ResourceMetadata.Web/Scripts/](https://github.com/MarlabsInc/webapi-angularjs-spa/tree/master/source/ResourceMetadata/ResourceMetadata.Web/Scripts)*** in command prompt.
3. Run command **npm install**
4. Execute gulp tasks
    1. Run command **gulp build**.
    2. In order to clean the destination files created by build task, run **gulp cleanbuild**.

# Roadmap Targets

* Code refactoring.
* Unit tests with Karma/Jasmine
* Task automation with Gulp.js
* Leverage Browserify 
* Performance optimizations and best prarctices for SPA.



