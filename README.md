# Movie-App

A modern movie browsing app built with Next.js and powered by The Movie Database (TMDB) API. Users can explore now playing movies, search for titles, view detailed pages with credits and recommendations, and manage a personal wishlist. Favorites are persisted via a custom API backed by MongoDB.

## Live Demo
`https://movie-app-peach-psi.vercel.app/`

---

## Features
- Now Playing feed with pagination
- Movie details page with credits, videos, recommendations, and similar titles
- Search with query persistence and paginated results
- Wishlist (favorites) management via a custom Next.js API + MongoDB
- Responsive UI with Bootstrap, Tailwind CSS v4, and Font Awesome icons

## Tech Stack
- **Framework**: Next.js (App Router)
- **UI**: React 19, Bootstrap 5
- **Icons**: Font Awesome, React Icons
- **Data**: TMDB API (`https://api.themoviedb.org/3`)
- **Backend API**: Custom Next.js Route Handlers for favorites
- **Database**: MongoDB via Mongoose (for favorites)

---

## Getting Started

### 1) Prerequisites
- Node.js 18+ and npm
- TMDB account with an API Read Access Token (v4)
- MongoDB connection string (for wishlist/favorites)

### 2) Installation
```bash
npm install
```

### 3) Environment Variables
Create a `.env.local` file in the project root and add:
```bash
# TMDB v4 API Read Access Token (Bearer token)
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=YOUR_TMDB_V4_ACCESS_TOKEN

# Optional: Used in metadata generation in movie details
API_KEY=YOUR_TMDB_V3_API_KEY

# MongoDB connection string for favorites
MONGODB_URI=mongodb+srv://USER:PASS@HOST/DB_NAME?retryWrites=true&w=majority
```

Notes:
- The app primarily uses the v4 Bearer token via `NEXT_PUBLIC_TMDB_ACCESS_TOKEN`.
- `API_KEY` (v3) is referenced in metadata generation; include it if you see metadata errors.
- Ensure `.env.local` is not committed to version control.

### 4) Run Locally
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 5) Build & Start
```bash
npm run build
npm start
```

### 6) Lint
```bash
npm run lint
```

---

## NPM Scripts
- `dev`: Run Next.js in development mode
- `build`: Create an optimized production build
- `start`: Start the production server
- `lint`: Run ESLint

---

## Project Structure
```text
src/
  app/
    page.js                 # Home (Now Playing + Search)
    search/page.js          # Search page with results
    movie/[id]/page.js      # Movie details page
    api/themoviedbApi.js    # TMDB API helpers
    api/favorites/          # Favorites routes (MongoDB-backed)
    contexts/
      LanguageContext.js    # Language provider
      FavoritesContext.js   # Favorites provider
    layout.js               # Root layout (providers + Navbar)
  components/
    MovieContainer.jsx
    SearchForm.jsx
    SearchResultsContainer.jsx
    MovieCard/
      MovieCard.jsx
    WishCard/
      WishCard.jsx
  lib/
    db.js                   # MongoDB connection helper
    models/Favorite.js      # Favorite model (Mongoose)
```

---

## API Overview

### TMDB Client (`src/app/api/themoviedbApi.js`)
- `getNowPlayingMovies(page = 1, language = 'en-US')`
- `getMovieDetailsByID(id, language = 'en-US')` appends `credits,videos,recommendations,similar`
- `searchByQuery(query, page = 1, language = 'en-US')` with guard for forbidden/empty queries

### Favorites API (Custom Next.js API + MongoDB)
- `POST /api/favorites` Add a movie to favorites (JSON body includes movie identifiers/fields)
- `GET /api/favorites` Get all favorites
- `DELETE /api/favorites` Remove a movie from favorites (by movie id in body/query)
- `GET /api/favorites/check?movieId=ID` Check if a movie is already in favorites

The API is implemented using Next.js Route Handlers and Mongoose models:
- Connection helper: `src/lib/db.js`
- Model: `src/lib/models/Favorite.js`
- Routes: `src/app/api/favorites/` and `src/app/api/favorites/check/`

---

## Development Notes
- The Navbar and providers are mounted in `src/app/layout.js`.
- The details page dynamically generates metadata based on TMDB data.
- UI combines Bootstrap utilities and Tailwind classes; prefer consistent class usage when adding new components.

---

## Roadmap Ideas
- Enhanced wishlist UI and user auth
- Unit tests and E2E coverage

---

 

