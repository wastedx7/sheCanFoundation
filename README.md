She Can Foundation

This repository contains a simple contact form application used by the She Can Foundation. It has two parts:

- Backend: a Spring Boot application (Java 17, Maven) exposing a contact API and a small admin interface.
- Frontend: a small React (Vite) single-page app that sends contact messages and provides an admin view to list messages.

---

<!-- Project screenshots -->
![Screenshot 58](frontend/images/Screenshot%20(58).png)
![Screenshot 59](frontend/images/Screenshot%20(59).png)

**Quick summary**

- Backend: runs on port `8080` by default and uses MySQL (configured via environment variables). The backend endpoints are:
  - `POST /api/form` — submit a contact message. JSON body: `{ "name": "...", "email": "...", "message": "..." }`.
  - `POST /api/admin/login` — admin login. JSON body: `{ "username": "...", "password": "..." }`. Returns a token.
  - `GET /api/admin/messages` — list messages. Requires `X-Admin-Token` header with the token returned from login.

- Frontend: a Vite + React app that talks to the backend at `http://localhost:8080` by default.

---

**Admin credentials**

- Username: `admin`
- Password: `admin123`

Note: The backend currently validates against these hard-coded credentials in `backend/src/main/java/com/shecanfoundation/controller/AdminController.java`.

---

**Backend — prerequisites**

- Java 17 (matching the project's `java.version` in `backend/pom.xml`).
- Maven 3.x
- MySQL (or another MySQL compatible server) if you want persistent storage.

**Backend — configure database**

The backend reads database settings from `backend/src/main/resources/application.properties`. It references environment variables for the database connection values:

- `DB_NAME` — database name (example: `shecan_db`)
- `DB_USER` — database user (example: `root`)
- `DB_PASSWORD` — database password

You can provide these environment variables in a `.env`-style file (the Spring config imports an optional file) or export them in your shell before running.

Example (Linux/macOS):

```bash
export DB_NAME=shecan_db
export DB_USER=root
export DB_PASSWORD=secret
mvn -f backend spring-boot:run
```

Example (Windows PowerShell):

```powershell
$env:DB_NAME = "shecan_db"
$env:DB_USER = "root"
$env:DB_PASSWORD = "secret"
mvn -f backend spring-boot:run
```

If you prefer to build first and run the jar:

```bash
mvn -f backend clean package
java -jar backend/target/backend-0.0.1-SNAPSHOT.jar
```

The backend will create/update the required tables automatically (`spring.jpa.hibernate.ddl-auto=update`) when it can connect to the database.

**Notes about development without MySQL**

If you don't have a MySQL server available, you can still run the backend after adjusting `application.properties` to use an embedded database (H2) or by providing a temporary MySQL instance (Docker recommended). Example Docker command to run MySQL for development:

```bash
docker run --name shecan-mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=shecan_db -p 3306:3306 -d mysql:8
```

Then set `DB_NAME=shecan_db`, `DB_USER=root`, `DB_PASSWORD=secret` and start the backend.

---

**Frontend — prerequisites & run**

- Node.js (recommended LTS) and `npm` or `pnpm`/`yarn`.

To install and run the frontend locally:

```bash
cd frontend
npm install
npm run dev
```

This will run the Vite dev server (typically on `http://localhost:5173`). The frontend expects the backend at `http://localhost:8080`; if your backend runs on a different host/port, update the API base URL in `frontend/src/App.jsx` accordingly.

To build a production bundle:

```bash
cd frontend
npm run build
```

---

**API examples**

Submit a form (curl):

```bash
curl -X POST http://localhost:8080/api/form \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","message":"Hello"}'
```

Admin login (curl):

```bash
curl -X POST http://localhost:8080/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

The response is a JSON object with a token — include it in the `X-Admin-Token` header when calling `/api/admin/messages`.

---

**Project layout**

- `backend/` — Spring Boot application (Java 17, Maven). Source under `backend/src/main/java`.
- `frontend/` — React (Vite) single-page app.

**Further notes & security**

This project is intentionally simple. The admin credentials are hard-coded and there is an in-memory token store used for session tokens. For production use:

- Move credentials to a secure store or user database and implement hashed passwords.
- Persist admin tokens or use a robust stateless token mechanism (JWT) with expiration.
- Add input validation, rate limiting, and proper CORS configuration for deployed environments.

---

If you'd like, I can also:

- Rebuild the frontend (`npm run build`) so the `dist` files no longer contain the removed credentials hint.
- Replace the hard-coded admin credentials with a more secure mechanism.

---
# She Can Foundation - Simple Contact Form

This workspace contains a minimal Spring Boot backend and a React frontend for a contact form.

Backend (Spring Boot):
- Location: [backend](backend)
- Run:

```
cd backend
mvn spring-boot:run
```

Frontend (React + Vite):
- Location: [frontend](frontend)
- Run:

```
cd frontend
npm install
npm run dev
```

Open the frontend at http://localhost:5173. The form sends a POST to `http://localhost:8080/api/form` and displays "Form Submitted Successfully" on success.
