# App Submission Review Dashboard

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm i
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features
App keeps in memory Search field, and selected status. It uses cursor for infinite scroll. Data are stored in cached array in memory. That will reset each time server is restarted.

Deployed version:


## Infrastruction
For _preview_ an array in memory is used to display functionalities/features of the app. Memory is limited to lifespan of the server, each time server restarts, it will reset memory to default __seeds__ in __src/server/db.ts__

For production it would be best to use `Postgres` with `Prisma` and `zod`. That way app would be more production ready and persist changes of data.

### Concerns in Prod
- A long scroll through apps will increase browser cache that of ReactQuery that might make a user browser crash.

### Security
- CORS can be based on environment and for Staging and Dev allow non-origin API calls for local environments to test with closer to production ready data vs local / messy data.
- CORS also can use middleware that has Conditional Logic based on request / query params. It can also log CORS violations. It is possible to modiry requests before these reach the API.
- CORS middleware allows to use different CORS rules per endpoint.
- XSS, sanitize user inputs before storing.
- CSRF token for all changing operations that user can do on the website


### prompts

```
NextJS app, MUI, in memory db. 
Create a db.ts file that will be used by nextjs and which will create 100 app items each time server spin up. It will generate information about apps pending submission in a format below. When memory array is empty, it should run a function that will generate random names of apps. Use most popular apps for content creators as dummy data. for images use ui-avatars API and for each app set a random color which will be used as background parameter in ui-avatars api size of 100 {id name developer description status category image createAt color} It should return a DB as object. When it runs seedData function it will create 10 most popular categories and attach them randomly to apps. It will create random color for each app in hex. it will attach random statuses to apps. statuses: [approved, pending, rejected, flagged]
```

```
From my NextJS frontend I want to display a list of apps from generated DB. This list must be paginated with cursor ordered by createdAt and use IntersectionObserver to create infinite scroll. I must insure that users scroll and don't see repetitive / duplicate apps that were already displayed. Size of a page is 10. I will also create a filter in UI to filter apps by status and search apps by name. To fetch data I will use tanstack to fetch data
```

```
I need function to encode and decode Cursor of pagination.
```

```
From now on, your code must be scalable and abstract. You must follow good code practices and principles of decoupling code. Create me a two hooks that will - fetch app submissions from API with cursor. Cursor is an encrypted hash. - update status of an app and reflect that change in the UI. I use a list of items SubmissionsList where I display a list of all items. Each submission info is displayed in SubmissionCard which displays image, title, dev, category, description. On the bottom right in a row I show 3 actions: Approve, Reject, Flag. Those buttons will use a function that will call API to reflect user choice. Keep answers short, concise, stick to good principle of scalable app.
```

```
Create me a route to moderate a submission. It must update submission with one of the statuses
```