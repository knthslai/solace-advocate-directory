## Solace Candidate Assignment

![Solace Demo](public/solace-demo.gif)

## Recent Enhancements (PR's)

### [PR: feat: Implement comprehensive type system with enhanced type safety and enforcement #3](https://github.com/knthslai/solace-advocate-directory/pull/3)

**Scope:** Improves type safety, developer experience, and code quality across backend, API, and frontend.

**Key Changes:**

- Converted specialties field from jsonb → varchar[] for better performance and enforcement.
- Added centralized TypeScript definitions for database models and API routes.
- Improved component prop typing and data handling in the frontend.
- Implemented Husky + lint-staged pre-commit hooks and automated type checking.

3. **Seed the database**

```bash
curl -X POST http://localhost:3000/api/seed
```

4. **Start the development server**

```bash
npm run dev
```

### Database Configuration

The project uses PostgreSQL with Drizzle ORM. The database configuration is in `.env`:

```
DATABASE_URL=postgresql://postgres:password@localhost/postgres
```

**Note**: The application will throw a clear error if `DATABASE_URL` is not set, ensuring configuration issues are caught early.
=======
**Key Changes:**

- Integrated @tanstack/react-query with intelligent caching, background refetching, and devtools support.
- Implemented debounced search (300ms) with optimized API calls.
- Added custom hooks (useAdvocates, useAllAdvocates) and centralized API logic in services/advocates.ts.
- Built reusable SearchInput and Button components with enhanced TypeScript typing.

**Impact:**

- Faster and more efficient data fetching with reduced network requests.
- Improved loading indicators, error handling, and user feedback.
- Cleaner architecture with reusable hooks and components.
- Better debugging via React Query DevTools in development.

**Migration Notes:**

- No breaking API changes; backward compatible with existing endpoints.
- Hydration warnings resolved with suppressHydrationWarning.

---

### [PR: feat: Implement paginated advocates query with large dataset support and performance optimization #5](https://github.com/knthslai/solace-advocate-directory/pull/5)

**Scope:** Transforms advocates listing into a scalable, paginated system designed for large datasets (25K+ records) with performance testing and modern UI/UX improvements.

**Key Changes:**

- Backend: Implemented server-side pagination with page, limit, and search params; optimized queries with parallel execution; improved error handling.
- Frontend: Added useAdvocatesPaginated hook, reusable Pagination/SearchInput/Button components, and responsive Tailwind-based UI.
- Data Tools: Integrated Faker.js for seeding datasets (1K–25K+ records) with batch insertion, delay simulation, and failure rate testing.
- UI Enhancements: Debounced search across all fields, ellipsis-based pagination controls, hover effects, transitions, and loading indicators.

**Impact:**

- Efficient handling of large datasets without memory or performance issues.
- Improved user experience with responsive design, smooth navigation, and real-time feedback.
- Enhanced developer workflow with testing scripts, documentation, and simulation tools.

**Migration Notes:**

- API response updated to include pagination metadata (page, limit, totalPages, etc.) instead of simple array.
- New dependency added: @faker-js/faker for data generation.

---

### [PR: feat: Comprehensive table UI overhaul with modular components and responsive design #6](https://github.com/knthslai/solace-advocate-directory/pull/6)

**Scope:** Refactors the AdvocatesTable into a modular, responsive, and visually enhanced system with improved maintainability and user experience.

**Key Changes:**

- Architecture: Split monolithic table into reusable components (TableHeader, TableRow, TableCell, SpecialtiesCell, PhoneNumberCell, LoadingTable).
- Responsive Design: Flex-based layouts, dynamic height adjustment, sticky headers, and smooth scrolling.
- UI Enhancements: Specialty badges styled as pill-shaped elements, automatic phone number formatting, consistent spacing, and optimized column widths.
- Type Safety & Maintainability: Centralized column definitions with strict typing, DRY principles applied, and reusable modular design.

**Impact:**

- Modernized, professional look with improved readability and hierarchy.
- Enhanced mobile responsiveness and accessibility across devices.
- Easier future maintenance and reusability of isolated table components.
- Improved performance with reduced re-renders and optimized scrolling.

**Migration Notes:**

- Fully backward compatible with existing data structures and API contracts.
- No breaking changes; drop-in replacement for existing table.

