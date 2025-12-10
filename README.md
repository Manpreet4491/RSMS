# Retail Service Management System (RSMS) 🛒

RSMS is a full-stack Retail Service Management System that allows users to browse and manage retail service records through a clean, responsive UI.  
It provides powerful search, filter, sorting, and pagination features on top of a Spring Boot REST API.  
The goal is to simulate a realistic dashboard for operations teams to quickly find and analyse retail service data.  
The project is split into a React frontend and a Spring Boot backend for clear separation of concerns. ✨  

---

## Tech Stack

- 🎨 **Frontend**
  - React (SPA for dashboard UI)
  - Modern JavaScript (ES6+)
  - Component-based architecture (reusable table, filter bar, pagination controls)
  - CSS for layout and styling

- ⚙️ **Backend**
  - Java + Spring Boot
  - Spring Web (REST API)
  - Spring Data JPA
  - H2 in-memory database (for quick local development)

- 🧰 **Tooling & Build**
  - npm / Node.js for frontend dependency management
  - Maven/Gradle for backend build and dependency management
  - Git & GitHub for version control and collaboration

---

## Search Implementation Summary 🔍

- A global text search input is provided above the results table.  
- The frontend keeps the search term in React state and performs a **case-insensitive match** against key fields of each record (for example: name, ID, category, and location).  
- As the user types, the dataset already loaded in memory is filtered; only records whose combined string fields contain the search term are shown.  
- Search is composed together with filters, sorting, and pagination so the user always sees a consistent subset of data.

---

## Filter Implementation Summary 🎛️

- Dedicated filter controls (dropdowns / checkboxes) allow narrowing the dataset by attributes such as category/type, status, and other domain-specific fields.  
- Each filter stores its value in React state; a pure function applies all active filters over the base dataset to produce a filtered array.  
- Filters can be combined (e.g., status + category + search text), and clearing a filter resets only that specific constraint without affecting others.  
- The filtered data is then passed to the sorting and pagination logic, ensuring a predictable order of operations: **raw data → search → filters → sort → paginate**.

---

## Sorting Implementation Summary ↕️

- Table column headers that are sortable show a visual indicator and are clickable.  
- Clicking a header toggles between ascending and descending order, tracked via `sortField` and `sortDirection` in component state.  
- A comparator function handles both string and numeric fields and is applied to the filtered list before pagination.  
- Sorting is stable and always applied on the same in-memory collection that has already been searched and filtered, so the user’s view remains consistent.

---

## Pagination Implementation Summary 📄

- The results table is paginated on the client side with a fixed page size (for example, 10 records per page).  
- The component tracks the `currentPage` and calculates `startIndex` / `endIndex` to slice the processed (searched + filtered + sorted) list.  
- Pagination controls (Previous / Next buttons and page indicators) update `currentPage` and are disabled when the user is on the first or last page.  
- A small summary (e.g., “Showing X–Y of N results”) helps users understand where they are in the dataset.

---

## Setup Instructions 🧪

### 1. Clone the repository

```bash
git clone https://github.com/Manpreet4491/RSMS.git
cd RSMS

cd backend
# If using Maven wrapper
./mvnw spring-boot:run
# or, if Maven is installed globally
mvn spring-boot:run


cd ../frontend
npm install
npm run dev   # or npm start, depending on the setup



