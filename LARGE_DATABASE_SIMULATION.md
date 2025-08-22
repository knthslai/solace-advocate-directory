# Large Database Simulation Guide

This guide explains how to simulate a large database for testing performance, pagination, and TanStack Query behavior with substantial datasets.

## 🚀 Quick Start

### Generate Large Dataset

Use these npm scripts to seed your database with different dataset sizes:

```bash
# Small dataset (1,000 advocates)
npm run seed:small

# Medium dataset (5,000 advocates) - Default
npm run seed:medium

# Large dataset (10,000 advocates)
npm run seed:large

# Extra large dataset (25,000 advocates)
npm run seed:xlarge

# Reset database and setup with large dataset
npm run db:setup:large
```

### View the Results

1. **Simple View** (`/`): Shows all data at once (good for small datasets)
2. **Paginated View** (`/paginated`): Demonstrates pagination, sorting, and search with large datasets

## 📊 Dataset Characteristics

### Generated Data Includes:

- **Realistic names** using Faker.js
- **Diverse cities** across various locations
- **Multiple degree types**: MD, PhD, MSW, PsyD, LCSW, LPC, LMFT, LMHC
- **Random specialties**: 1-6 specialties per advocate from 28 available options
- **Experience range**: 1-30 years
- **Phone numbers**: Realistic 10-digit numbers

### Performance Features:

- **Pagination**: 10/25/50/100 results per page
- **Search**: Debounced search across all fields including specialties
- **Caching**: TanStack Query caches results with background refetching
- **Consistent Ordering**: Results sorted by ID for predictable pagination

## 🛠 API Enhancements

### New Query Parameters:

- `page`: Page number (default: 1)
- `limit`: Results per page (default: 50)
- `search`: Search term (optional)

### Response Format:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 10000,
    "totalPages": 200,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "search": "search term"
}
```

## 🔧 Technical Implementation

### New Components:

- **`Pagination`**: Smart pagination with ellipsis for large page counts
- **Enhanced table**: Clean, responsive design with consistent styling

### New Hooks:

- **`useAdvocatesPaginated`**: TanStack Query hook for paginated data
- **`keepPreviousData`**: Prevents UI flicker during page transitions

### Performance Optimizations:

- **Batch inserts**: Database seeding in 1,000-record batches
- **Database indexing**: Automatic indexes on searchable columns
- **Query optimization**: Parallel count and data queries
- **Memory management**: Streaming data processing

## 📈 Testing Performance

### Database Performance:

```bash
# Monitor query performance in logs
npm run dev

# Check database size
docker exec -it postgres psql -U postgres -d solace -c "SELECT COUNT(*) FROM advocates;"
```

### Frontend Performance:

1. Open Chrome DevTools → Network tab
2. Search for terms and navigate pages
3. Observe:
   - TanStack Query caching behavior
   - Background refetch requests
   - Debounced search requests (300ms delay)

### Memory Usage:

- Large datasets are handled efficiently with pagination
- TanStack Query manages cache size automatically
- No memory leaks with proper query key management

## 🎯 Use Cases

### Performance Testing:

- Test search performance with 25,000+ records
- Measure pagination response times
- Validate TanStack Query caching strategies

### User Experience:

- Smooth pagination with `keepPreviousData`
- Debounced search prevents excessive API calls
- Loading states during data fetching

### Development:

- Test component behavior with large datasets
- Validate pagination edge cases
- Ensure proper error handling

## 🔍 Monitoring

### TanStack Query DevTools:

- Available in development mode
- Monitor cache status, query states, and background refetches
- Debug query invalidation and cache management

### Database Monitoring:

```sql
-- Check table size
SELECT pg_size_pretty(pg_total_relation_size('advocates'));

-- Monitor query performance
EXPLAIN ANALYZE SELECT * FROM advocates WHERE first_name ILIKE '%john%';
```

## 🚨 Production Considerations

### Database Optimization:

- Add indexes for frequently searched columns
- Consider full-text search for better performance
- Implement query result caching (Redis)

### API Optimization:

- Add request rate limiting
- Implement cursor-based pagination for very large datasets
- Consider GraphQL for flexible data fetching

### Frontend Optimization:

- Virtual scrolling for extremely large lists
- Infinite scroll instead of traditional pagination
- Preload adjacent pages for smoother UX

---

## 🎉 Success Metrics

After implementing large dataset simulation, you should observe:

✅ **Fast search results** even with 25,000+ records
✅ **Smooth pagination** with no loading flicker
✅ **Efficient caching** reduces duplicate API calls
✅ **Responsive UI** during data operations
✅ **Scalable architecture** ready for production datasets

Ready to test with big data! 🚀
