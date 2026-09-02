# Event Feedback Management System

A full stack web app for collecting and reviewing event feedback, built with
**Node.js / Express** (backend) and **MongoDB** (database), with a plain
HTML/CSS/JS frontend.

## Project Structure

```
event-feedback-system/
├── models/
│   └── Feedback.js        # Mongoose schema (Level 3)
├── routes/
│   └── feedback.js        # API routes: GET/POST /api/feedback (Levels 2-4)
├── public/
│   ├── index.html          # Home page (Level 1)
│   ├── events.html         # Events listing (Level 1)
│   ├── feedback.html       # Feedback submission form (Level 1 & 4)
│   ├── feedback-list.html  # Displays all feedback (Level 2-4)
│   ├── css/style.css       # Styling (Level 5)
│   └── js/script.js        # Frontend logic: fetch, validation, rendering (Level 4)
├── server.js               # Express app entry point (Level 2)
├── package.json
├── .env.example
└── README.md
```

## Setup & Run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up MongoDB**
   - Easiest option: install MongoDB locally, or create a free cluster on
     [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Copy `.env.example` to `.env` and set `MONGO_URI` to your connection string:
     ```bash
     cp .env.example .env
     ```

3. **Start the server**
   ```bash
   npm start
   ```
   (or `npm run dev` if you have `nodemon` installed, for auto-restart on changes)

4. **Open the app**
   Visit `http://localhost:5000` in your browser.

## How the Levels Map to This Code

| Level | What it covers | Where to look |
|-------|----------------|----------------|
| 1 – Frontend Pages | Home, nav, Events page, feedback form | `public/*.html` |
| 2 – Backend Setup | Express server, welcome route, receive feedback route | `server.js`, `routes/feedback.js` |
| 3 – Database Basics | Mongoose schema, save & retrieve feedback | `models/Feedback.js`, `routes/feedback.js` |
| 4 – Frontend-Backend Connection | `fetch()` calls, success messages, validation | `public/js/script.js` |
| 5 – Final Touch & Review | Styling, working nav, end-to-end test | `public/css/style.css`, manual testing below |

## Testing the Full Flow (Level 5)

1. Go to **Home** → confirm the title/description render and nav links work.
2. Go to **Events** → confirm the 3 sample events display.
3. Go to **Feedback** → submit the form:
   - Try submitting with empty fields → you should see a validation error.
   - Fill in all fields and submit → you should see a green success message.
4. Go to **View Feedback** → confirm your new submission appears at the top
   of the list with the correct star rating.
5. Restart the server and refresh the page → feedback should still be there
   (proves it's persisted in MongoDB, not just in memory).

## API Reference

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/feedback/welcome` | Returns a welcome message |
| POST | `/api/feedback` | Submits new feedback (`name`, `email`, `event`, `rating`, `message`) |
| GET | `/api/feedback` | Returns all feedback, newest first |

