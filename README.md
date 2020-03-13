# Using Sessions and Cookies

Guided project for **Node Auth 2** Module.

## Prerequisites

- [DB Browser for SQLite](https://sqlitebrowser.org) installed.
- A rest client like [Insomnia](https://insomnia.rest/download/) or [Postman](https://www.getpostman.com/downloads/) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `npm install` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds support for `sessions` and `cookies` to the API.


AuthN only happens once

AuthZ happens on every request after

A `session` is a virtural wristband

cookies are stored in a cookie jar

jar sent as a req header

cookies are a small chunk of persistant data stored 

flow of cookies:>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
+`client sends creds to server (login)`
+`Server verifies the creds (check hash)`
+`Server creates session for the client - session is stored as a random num`
+`server sends session data back to client as a "Set-Cookie" header`
+`Client stores the cookie in the jar`
+`client sends cookie on every subsequesnt req`
+`server verifies the cookie is valid`
+`server provides acces to the resorces (authorized!)`

-`express-session`-


checkout:

`PAW` alt to insomnia