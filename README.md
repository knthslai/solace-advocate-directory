## Solace Candidate Assignment

![Solace Demo](public/solace-demo.gif)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) featuring a comprehensive advocate directory with advanced filtering, pagination, and modern UI components.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

The project uses PostgreSQL with Drizzle ORM. There are multiple setup options:

#### Option A: Quick Setup with Docker (Recommended)

```bash
# Set up database, run migrations, and seed with sample data
npm run db:setup

# Alternative: Set up with large dataset (25k+ records)
npm run db:setup:large
```

#### Option B: Manual Setup

```bash
# Start PostgreSQL (using Docker Compose)
docker compose up -d

# Push database migrations
npx drizzle-kit push

# Seed the database (choose one)
npm run seed           # Small dataset (~50 records)
npm run seed:large     # Large dataset (25k+ records)
npm run seed:medium    # Medium dataset (5k records)
npm run seed:xlarge    # Extra large dataset (50k+ records)
```

### 3. Environment Configuration

Create a `.env` file with your database connection:

```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
```

### 4. Start Development Server

```bash
# Normal development mode
npm run dev

# Development with slow network simulation (for testing loading states)
npm run dev:slow
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run dev:slow` - Start with slow network simulation
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Management

- `npm run db:setup` - Complete database setup with sample data
- `npm run db:setup:large` - Setup with large dataset
- `npm run db:reset` - Reset database and reseed
- `npm run seed` - Seed with small dataset
- `npm run seed:large` - Seed with large dataset (25k+ records)
- `npm run seed:medium` - Seed with medium dataset (5k records)
- `npm run seed:xlarge` - Seed with extra large dataset (50k+ records)

### Database Migrations

- `npm run generate` - Generate new migration files
- `npm run migrate:up` - Run pending migrations

## Features

- **Advanced Search & Filtering**: Debounced search across all advocate fields
- **Pagination**: Efficient server-side pagination for large datasets
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Comprehensive TypeScript implementation
- **Performance Optimized**: TanStack Query for intelligent caching and state management
- **Modern UI Components**: Modular, reusable component architecture

## Recent Enhancements (PR's)

### [PR: feat: Implement comprehensive type system with enhanced type safety and enforcement #3](https://github.com/knthslai/solace-advocate-directory/pull/3)

**Scope:** Improves type safety, developer experience, and code quality across backend, API, and frontend.
**Key Changes:**

- Converted specialties field from jsonb → varchar[] for better performance and enforcement.
- Added centralized TypeScript definitions for database models and API routes.
- Improved component prop typing and data handling in the frontend.
- Implemented Husky + lint-staged pre-commit hooks and automated type checking.

**Impact:**

- Stronger compile-time validation, reduced runtime errors, and enhanced IDE support.
- Enforced code quality standards and automated checks across the team.
- More efficient queries and improved database performance.

**Migration Notes:**

- Requires database schema update (jsonb → varchar[]).
- Data migration/backup recommended before deployment.

---

### [PR: feat: Integrate TanStack Query for improved data fetching and state management #4](https://github.com/knthslai/solace-advocate-directory/pull/4)

**Scope:** Migrates data fetching from direct API calls to TanStack Query, improving caching, state management, and user experience.

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
