# NG App Refresher

Refresher C# .NET MVC &amp; AngularJS 1.x

### TASK

Interface with the HackerNew API: https://github.com/HackerNews/API

### Application Features
- C# MVC + WebAPI Application
- Angular 1.X SPA
- FE & BE tests
- View list of best HackerNews stories
- Filter/Search the list of best HackerNews stories
- View details of a HackerNews story
- Serverside Caching of the stories fetched from HackerNews
- Clientside caching of the stories fetched from BE
- Azure hosted

### VIEW IN BROWSER

- http://ngshipleycloud.cloudapp.net/

### GETTING STARTED

- Setup Visual Studio to support: Azure, TypeScript, SCSS, & ReSharper.
- Clone the repo
- Load the solution in VS
- Set Startup Project to Webclient
- Resharper > Run All Tests
- Build & Run in Debug

### NOTES

- Currently unable to run clientside tests via PhantomJS. There is an unresolved issue/bug in TypeScript/Promises/Jasmine/PhantomJS that is keeping promises from resolving in TypeScript. The app & tests run and complete in the browser.
- Get Best Stories tests run slow due to the thread.sleep, will need to wrap those calls in a service so that it can be mocked easily.
