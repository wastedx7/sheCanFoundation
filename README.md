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
