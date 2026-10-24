# Eco-Track

Eco-Track is a full-stack web app that helps people understand and cut the carbon footprint of how they travel. Users log journeys on a map, see the CO₂ each trip produces, earn points and achievements, compare themselves on a leaderboard, and learn about lower-carbon ways to get around.

Built as a **team project** by five developers (2025–26). This is the integrated version we demoed, with the full commit history preserved.

## Features

- **Accounts:** register and log in, secured with JWT authentication (Spring Security)
- **Journey logging:** search places, get real routes on an interactive Leaflet map (OpenRouteService), and save journeys and favourite routes
- **Carbon calculator:** compare the emissions of different transport modes for a trip, using real route distances (Postcodes.io, Nominatim, OSRM)
- **Dashboard:** weekly CO₂ saved, points chart, recent journeys and achievements
- **Achievements:** awarded automatically after each journey is saved
- **Profile and leaderboard:** personal stats, tiers and the top five users
- **Education page:** animated content on transport emissions and a news feed filtered by topic preferences

## Tech stack

| Layer | Technologies |
|-------|--------------|
| Front-end | React 19, Vite, React Router, Chart.js / Recharts, Leaflet, GSAP |
| Back-end | Java 17, Spring Boot, Spring Data JPA, Spring Security, JWT |
| Database | H2 (in-memory, seeded with test data on start-up) |
| External APIs | OpenRouteService, Postcodes.io, Nominatim, OSRM |

## Running locally

**Back-end** (http://localhost:8080)

```bash
cd back-end/app_core
./mvnw spring-boot:run
```

Requires Java 17+. The database is seeded on every start with tiers, transport modes, a test user, journeys and achievements. Set a `JWT_SECRET` environment variable for anything beyond local use.

**Front-end** (http://localhost:5173)

```bash
cd front-end
cp .env.example .env   # then add your free OpenRouteService key
npm install
npm run dev
```

## My role: Mekael Syed

I owned the **dashboard** and **achievements** features end to end and was the team's **integration lead**.

- **Dashboard (Spring Boot + React):** REST endpoint, a service computing weekly CO₂, points, chart data and recent journeys, DTOs, and the React dashboard with stat cards, weekly bar chart, recent activity and achievements
- **Achievements:** full CRUD API and auto-award logic that runs after every journey is saved
- **Seed data:** rewrote the database initialiser to seed all tiers, transport modes, a test user, journeys and achievements
- **Front-end structure:** unified routing with an auth guard, rebuilt the navbar, and rewrote the login and register pages with shared styling
- **Integration:** merged every member's front-end and back-end work into the single branch we demoed, resolved merge conflicts, and fixed the bugs that stopped it running together (a journey page that froze the browser, map/navbar layering, a database column overflow on route geometry, and a compile error in the security config)

## Team

| Member | Feature |
|--------|---------|
| Mekael Syed ([@mxsszn](https://github.com/mxsszn)) | Dashboard, achievements, integration |
| Patrick Swiderski ([@qb-edu](https://github.com/qb-edu)) | Authentication, login/register, profile, security |
| Tayyab Qaiser ([@tayy4b1](https://github.com/tayy4b1)) | Journey logging, transport modes, saved routes |
| Baasit ([@baasit-se](https://github.com/baasit-se)) | Education page, news and topic preferences |
| Dipta Roy ([@roy2004-eng](https://github.com/roy2004-eng)) | Carbon calculator |
