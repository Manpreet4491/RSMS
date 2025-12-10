# RSMS Architecture Document 🏗️

This document describes the overall architecture of the Retail Service Management System (RSMS), including backend and frontend design, data flow, folder structure, and the responsibilities of key modules.

---

## Backend architecture ⚙️

The backend is implemented using **Spring Boot** and follows a layered architecture:

- **Controller layer (`controller`)**
  - Exposes REST endpoints (e.g., `/api/...`) for the frontend.
  - Handles HTTP requests, request validation, and returns JSON responses.
  - Maps incoming DTOs to domain models and vice versa.

- **Service layer (`service`)**
  - Encapsulates business logic.
  - Orchestrates operations involving repositories and other services.
  - Applies filtering, sorting, and pagination logic if/when done on the server side (using Spring Data `Pageable`).

- **Repository layer (`repository`)**
  - Uses **Spring Data JPA** to interact with the H2 database.
  - Defines repository interfaces per aggregate (e.g., `StoreRepository`, `OrderRepository` etc.).
  - Supports derived queries and custom query methods for search and filter operations.

- **Domain / Entity layer (`model` / `entity`)**
  - Represents database tables as JPA entities.
  - Encodes the core business concepts of RSMS (e.g., store, service, ticket, etc.).

- **Configuration (`resources`)**
  - `application.properties` configures the H2 database, JPA settings, server port, and H2 console.
  - Optional `data.sql` or `schema.sql` can pre-load sample data for local testing.

This layered approach keeps concerns separated and makes it easy to evolve business logic without breaking API contracts. 🧩

---

## Frontend architecture 🎨

The frontend is a **React** single-page application:

- **Entry point**
  - A root file (such as `main.jsx`/`index.js`) renders the `<App />` component into the DOM.
  - Global providers (e.g., routing, context, or query clients) would be wired here if needed.

- **App shell**
  - `<App />` defines the overall layout: header, content container, and main dashboard view.
  - Provides a consistent layout across the application.

- **Components**
  - **Filter Bar Component**: Search input, dropdown filters, and reset controls.
  - **Table Component**: Displays tabular data with sortable headers.
  - **Pagination Component**: Handles page navigation and range display.
  - **Shared UI Components**: Buttons, badges, loaders, and message states (empty, error, loading).

- **State management**
  - Local component state (via React hooks) stores search text, selected filters, sort configuration, and current page.
  - Derived data (searched/filtered/sorted arrays) is computed from the base dataset and passed down as props.

- **API layer**
  - A thin abstraction over `fetch`/`axios` centralizes HTTP calls to the backend.
  - Handles base URL, common headers, and error handling.

The frontend is designed to be modular and scalable, so additional views or charts can be added without changing core infrastructure. ✨

---

## Data flow 🔁

End-to-end data flow for a typical user interaction:

1. **Initial load**
   - User opens the frontend URL in a browser.
   - The frontend calls a backend endpoint (e.g., `GET /api/records`) to fetch the initial dataset.
   - Backend controller delegates to service → repository → H2 DB and returns the result as JSON.

2. **Search & filters**
   - User types in the search input or changes a filter (category/status/etc.).
   - React updates local state (`searchTerm`, selected filters).
   - A pure function recomputes the visible list:
     - Start with the base data.
     - Apply text search.
     - Apply filters.
     - Apply sorting.
   - Result is passed to the table for rendering.

3. **Sorting**
   - User clicks a column header.
   - React updates `sortField` and `sortDirection`.
   - A comparator is applied to the current filtered dataset, and the sorted list is rendered.

4. **Pagination**
   - When user navigates pages, `currentPage` updates.
   - The system calculates `startIndex`/`endIndex` based on page size and slices the processed list.
   - Only records for that page are displayed, while counts still reflect the full filtered dataset.

5. **Optional server-side enhancements**
   - The same flow can be extended to send query parameters:
     - `GET /api/records?search=...&status=...&page=...&size=...&sort=field,dir`
   - Spring Data `Pageable` then performs search, filter, sort, and pagination directly in the database for large datasets.

This pipeline guarantees a clear and predictable order of operations:  
**User Action → Frontend State → (Optional API call) → Backend Layers → JSON Response → UI Update.**

---

## Folder structure 📁

A high-level view of the repository layout:

```text
RSMS/
├── backend/                      # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/rsms/...
│   │   │   │       ├── controller/    # REST controllers
│   │   │   │       ├── service/       # Business services
│   │   │   │       ├── repository/    # Spring Data repositories
│   │   │   │       └── model|entity/  # JPA entities / domain models
│   │   │   └── resources/
│   │   │       ├── application.properties  # DB & server config
│   │   │       └── data.sql (optional)     # Seed data
│   └── pom.xml / build.gradle
│
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── FilterBar.jsx
│   │   │   ├── ResultsTable.jsx
│   │   │   └── Pagination.jsx
│   │   ├── pages/                # Page-level views (e.g., Dashboard)
│   │   ├── services/             # API helpers (e.g., apiClient.js)
│   │   └── App.jsx               # Root application component
│   ├── public/
│   └── package.json
│
└── docs/
    └── architecture.md           # This architecture document





=====================================
 MODULE RESPONSIBILITIES OVERVIEW 🧠
=====================================

==========================
 BACKEND MODULES ⚙️
==========================

1) Controller Layer (REST API)
--------------------------------
• Exposes HTTP endpoints (GET, POST, PUT, DELETE).
• Accepts request params and JSON payloads.
• Validates inputs and maps them to DTOs/entities.
• Calls service layer and returns structured JSON responses.
• Manages HTTP status codes and error responses.

2) Service Layer (Business Logic)
----------------------------------
• Implements rules, workflows, and domain logic.
• Coordinates repository queries and data transformation.
• Ensures consistency and transactional behavior.
• Acts as the application core independent of UI or DB.

3) Repository Layer (Database Access)
--------------------------------------
• Uses Spring Data JPA to interact with database tables.
• Defines CRUD operations and custom query methods.
• Performs optional server-side filtering, sorting, and pagination.
• Encapsulates SQL/JPQL from upper layers.

4) Entity / Model Layer (Persistence)
--------------------------------------
• Defines domain objects mapped to database tables.
• Uses JPA annotations for schema structure and relationships.
• Acts as the foundational structure that persists state.

-------------------------
Optional:
• Could include DTOs, Mappers, Exception Handlers, Config modules.
-------------------------


==========================
 FRONTEND MODULES 🎨
==========================

1) Dashboard / Page Module
----------------------------
• Main container for the filter bar, table, and pagination components.
• Holds shared state: search, filters, sorting, pagination.
• Controls data flow from backend (or local dataset).

2) Search & Filter Module
---------------------------
• Includes UI for keyword search and category/status filters.
• Emits state changes to parent container.
• Displays reset/clear options to improve user experience.

3) Table & Sorting Module
---------------------------
• Responsible for rendering tabular dataset.
• Handles sort toggling (ASC/DESC) based on user click.
• Shows active sort indicator within header.

4) Pagination Module
----------------------
• Computes total pages, current range, and record index offsets.
• Provides navigation controls (Prev, Next, Jump).
• Notifies parent of page change events.

5) API Client Module
----------------------
• Wraps fetch/axios calls into reusable service methods.
• Handles base URLs, error handling, and future authentication logic.
• Centralizes all communication with the backend.

-------------------------
Optional:
• Component Library, Context Store, ErrorBoundary, State Hooks, Theme System.
-------------------------


=====================================
 SUMMARY
=====================================
• Backend: Controller → Service → Repository → Entity
• Frontend: Page Container → Filtering → Table → Pagination → API Layer
• Both sides communicate using JSON over REST.

