## Demo

The project is currently live.
[frappe.lib](https://frappe-lib.vercel.app/)


## Getting Started
To run the project locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser on a desktop.


## Screenshots

Overview
![image](https://ik.imagekit.io/knowyouresops/Screenshot%202024-03-12%20at%204.55.55%20PM_9MJ569Ypy_z.png?updatedAt=1710306843787)

Search books
![image](https://ik.imagekit.io/knowyouresops/Screenshot%202024-03-12%20at%204.57.10%20PM_8twYvyYINeq.png?updatedAt=1710306844207)

Get Member Profile
![image](https://ik.imagekit.io/knowyouresops/Screenshot%202024-03-12%20at%204.57.49%20PM_QiDWwc_kxv.png?updatedAt=1710306841803)

Issue Book Flow
![image](https://ik.imagekit.io/knowyouresops/Screenshot%202024-03-12%20at%205.00.23%20PM_g6cqS-7fZG.png?updatedAt=1710306841574)

Import Books From Frappe
![image](https://ik.imagekit.io/knowyouresops/Screenshot%202024-03-13%20at%2010.43.32%20AM_zbFjdnYQFn.png?updatedAt=1710306840499)


## Frontend

The project uses Nextjs, tailwind Css and Shadcn Components.
- it uses structure based routing for the pages.
- The landing page is at the `page.tsx` in the root folder.


## Backend (Server-Side)

All the Server side code is under `src/app/server`.
 - It is structured around usecases (books, issues, members etc).
 -  Each usecase has its own files like API (membersAPI), Manager (membersManager) and Repository (membersRepo).
 - Follows Clean or Layered Architecture which maintains domain boundaries. eg: Only Repos have DB related code and only API files interact with the frontend.


## Database
The project uses Supabase (a hosted Postgres) for persistence. The server uses supabase client to talk to the DB via REST.

Normalised schema
![image](https://ik.imagekit.io/knowyouresops/Screenshot%202024-03-13%20at%2010.20.51%20AM_ewvvTEPPC3.png?updatedAt=1710306840166)

Table naming convention
- The schema is normalised.
- All the table names are plural (eg: books, issues). 
- Every column has a prefix of the table's name, this generally avoids confusion and makes searching the column usage across codebase easy.





