# NG App Refresher Exercise

Refresher Exercise in C# .NET MVC &amp; AngularJS 1.x

### TASK

Interface with the HackerNews API: https://github.com/HackerNews/API

### Application Features
- C# MVC + WebAPI Application
- Angular 1.X SPA
- FE & BE tests
- View list of best HackerNews stories
- Filter/Search the list of best HackerNews stories
- View details of a HackerNews story
- Serverside session caching of the stories fetched from HackerNews
- Clientside in-memory caching of the stories fetched from BE
- Azure hosted

### VIEW IN BROWSER

- http://ngshipleycloud.cloudapp.net/

---

### SOLUTION ORGANIZATION

##### Projects
```
> Application       // Serverside Service & Domain Layer
> Tests             // Serverside Tests
> Webclient         // Clientside concerns, API concerns, & Clientside Tests
```

##### Webclient (Beyond standard MVC/WebAPI setup)
```
> Assets
  > Content         // Styles
  > Scripts         // Vendor JavaScript
> ClientApp
  > _Tests          // Clientside Tests
  > External        // Services that make external api calls
  > Interactors     // Actions that control app behavior
  > Views           // NG Controllers & Templates
```

##### Application
```
> External
  - [X]Adapter.cs   // Services that make external api calls
> Stories
  > Interactors     // Actions that control app behavior (Represents Domain/Service Logic)
  - Story.cs        // Entity/Model
```

---

### GETTING STARTED

- Setup Visual Studio to support: Azure, TypeScript, SCSS, & ReSharper.
- Clone the repo
- Load the solution in VS
- Set Startup Project to Webclient
- Resharper > Run All Tests
- Build & Run in Debug

### NOTES

- Throttling HackerNews best stories request to only fetch 20 stories. Will need to research azure cloud services more to see if it is possible to keep it always on or if it can take a session.timeout setting.
- Unthrottled, the first server call to HackerNews is a beast (~10 minutes), it is fetching 500 stories with thread.sleeps. Future versions could load smaller lists and have user request more, fetch chunks of the list and push them down to the client, or something of those sorts.
- Tests around 'Get Best Stories' tests run slow due to the thread.sleep, will need to wrap those sleepers in a service so that it can be mocked easily.
- Currently unable to run clientside tests via PhantomJS. There is an unresolved issue/bug in TypeScript/Promises/Jasmine/PhantomJS that is keeping promises from resolving in TypeScript. The app & tests run and complete in the browser.
- Test naming conventions might be a bit odd for those who are not familiar with my testing practices. For this exercise I went with Mockist tests (I generally prefer classical style tests as they are more flexible in larger scale refactoring). For examples of both see: https://github.com/joeyshipley/TestingPractices
