## About eSenior
This project won **first place** at the Bitehack 2024 hackathon. 
Best out of 12 teams.

Topic was "Komfort złotego wieku" ("Comfort of the golden age") - to create project that would help elderly people benefit from today's technology.

**[Our project presentation (PDF)](Project-presentation.pdf)**

**[Quick demo](https://youtu.be/O8Nyz0S8Huo)**

## Tech stack

The project was made with Django Rest Framework and SQLite as a backend and Next.js as a frontend. Shadcn was used as a base for our own components styled with Tailwind CSS.

## How to run the app

First, run the backend server:

```bash
cd backend

python -m venv venv

.\venv\scripts\activate

pip install -r requirements.txt

py manage.py runserver
```

Then run frontend dev server:
```bash
cd frontend

npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
