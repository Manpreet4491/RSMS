# Architecture Document

### Backend Architecture
The backend is built using **Java Spring Boot**, following a **Layered Architecture** pattern. It separates concerns into Controller, Service, and Repository layers. We use **Spring Data JPA** for database interactions and **PostgreSQL** as the persistent data store. The application exposes RESTful APIs to communicate with the frontend.

### Frontend Architecture
The frontend is a **Single Page Application (SPA)** built with **React** and **Vite**. It utilizes **Tailwind CSS** for styling and **React Router** for client-side navigation. State management is handled using React Hooks, and **Axios** is used for HTTP requests to the backend API.

### Data Flow
1.  **User Action:** The user interacts with the React UI (e.g., clicks "Search").
2.  **API Request:** The Frontend sends an HTTP GET/POST request via Axios to the Spring Boot Controller.
3.  **Business Logic:** The Controller passes the data to the Service Layer for processing (filtering, sorting).
4.  **Database Query:** The Service Layer calls the Repository, which executes SQL queries on PostgreSQL.
5.  **Response:** Data flows back up the chain (Database -> Repository -> Service -> Controller -> Frontend) and is rendered to the user.

### Folder Structure
```text
RSMS/
├── backend/
│   ├── src/main/java/com/rsms/
│   │   ├── controller/      # API Endpoints
│   │   ├── service/         # Business Logic
│   │   ├── repository/      # Database Access
│   │   └── entity/          # Database Models
│   └── src/main/resources/  # Config (application.properties)
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI widgets
│   │   ├── pages/           # Full page views
│   │   └── services/        # API call definitions
│   └── package.json
└── docs/
    └── architecture.md
