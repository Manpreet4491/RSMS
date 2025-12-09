# Retail Sales Management System

1. **Overview**  
   The Retail Sales Management System (RSMS) is a complete full-stack dashboard for the analysis of huge retail transaction data.  
   It empowers users from operations as well as analytics to inspect, filter, and arrange the sales records according to customers, products, and payment characteristics.  
   The UI has been designed in such a way that it enables very fast drill-downs (through the search bar, filters, sortable columns, and pagination) on about one million records that are stored in PostgreSQL.  
   The project is divided into a Spring Boot backend API and a React (Vite) frontend.

2. **Tech Stack**  
   - **Frontend:** React 19, Vite, Axios, CSS modules / custom styles  
   - **Backend:** Java 17, Spring Boot 3 (Web MVC, Data JPA, Validation), Lombok  
   - **Database:** PostgreSQL (Neon), JPA entity mapped to a `sales` table loaded from CSV  
   - **Build & Tools:** Maven for the backend, npm for the frontend, GitHub for version control, Render + Vercel for deployment

3. **Search Implementation Summary**  
   - The free-text query (name / phone) is captured by the dashboard search bar and sent as the `search` query parameter to the backend through `fetchSales` in `frontend/src/services/salesApi.js`.  
   - Spring binds `SalesFilterRequest.search` automatically from the query string.  
   - In `SalesRecordSpecifications.withFilters`, a case-insensitive `LIKE` pattern is formed from the `search` term and applied over the `customerName` and `phoneNumber` fields.  
   - The search predicate is then merged with other filters into a single JPA `Specification`, thus, search always adheres to the current filters and pagination applied at that time.

4. **Filter Implementation Summary**  
   - The filter state (regions, genders, productCategories, tags, paymentMethods, customerTypes, ageMin/ageMax, dateFrom/dateTo) is preserved in React state within the `SalesDashboard.jsx`, which in turn passes it to `FiltersRow` and other related filter components.  
   - In case of any filter change by the user, the dashboard updates the filter state and makes a new call `fetchSales`, where the multi-select lists are serialized into repeated query parameters (e.g. `regions=North®ions=East`).  
   - The backend part is led by `SalesFilterRequest`, which makes available the corresponding lists and the scalar fields; Spring framework takes care of binding the query parameters to this DTO automatically.  
   - `SalesRecordSpecifications.withFilters` is responsible for creating the list of predicates: it forms `IN` predicates for the filtered lists, and helps to generate range predicates for age and date, while at the same time, it creates `LIKE` predicates for tag matching on the column `tags`.  
   - All predicates are combined with `AND`, which means that every active filter is applied at once.

5. **Sorting Implementation Summary**  
   - The client-side has `sortBy` and `sortDir` in the state and sends them as query parameters to the server each time filters or sorting change.  
   - `SalesFilterRequest` sends `sortBy` (e.g. `date`, `quantity`, `customerName`) and `sortDir` (`asc`/`desc`) along with reasonable defaults (`date` + `desc`).  
   - These parameters are then redirected to a specific JPA `Sort` instance and to the `PageRequest` in `SalesService.getSales`.  
   - Since sorting is done at the database level via Spring Data JPA, it stays in line with pagination and filters, even for a huge amount of data.

6. **Pagination Implementation Summary**  
   - The client keeps track of the current page (zero-based) and the size of the page and sends them as `page` and `size` query parameters to the backend for each request.  
   - `SalesFilterRequest` `page` and `size` are allowed with defaults; `SalesService` generates a `PageRequest` using those plus the active `Sort`.  
   - `SalesRecordRepository.findAll` gives back a `Page` which has `content`, `totalElements`, `totalPages`, and `number` (current page index) as its attributes.  
   - The React `Pagination` component gets `currentPage` and `totalPages` from the API response and shows Prev/Next as well as page indicators according to the Figma design, while it is also making requests for the right page index when the user interacts.

7. **Setup Instructions**  
   1. **Prerequisites**  
      - Java 17  
      - Maven  
      - Node.js (LTS) and npm  
      - PostgreSQL database (locally or via Neon) with a `sales` table loaded from the provided CSV  
   2. **Clone the repository**  
      ```bash
      git clone https://github.com/Manpreet4491/RSMS.git
      cd RSMS
      ```
   3. **Backend setup**  
      - A PostgreSQL database should be created and the CSV file should be loaded into the database with the name `sales`, having columns that correspond to `backend/src/main/java/com/botman/backend/model/SalesRecord.java`.  
      - The following environment variables should be set (either locally or in your IDE):  
        - `DB_URL` – JDBC URL for the Postgres instance  
        - `DB_USERNAME` – user of the database  
        - `DB_PASSWORD` – password for the database  
      - In the `backend` directory, execute the command:  
        ```bash
        cd backend
        mvn spring-boot:run
        ```  
      - At `http://localhost:8080` the API will be accessible (for instance, `GET /api/sales` and `GET /api/sales/ping`).
   4. **Frontend setup**  
      - Install dependencies and run the development server from the `frontend` folder:  
        ```bash
        cd ../frontend
        npm install
        npm run dev
        ```  
      - The frontend is configured by default to access the API through `http://localhost:8080` (as seen in the `frontend/src/services/salesApi.js`).  
      - To work with the Sales Management System, open the Vite dev URL printed on the screen (typically `http://localhost:5173`) using your browser.
