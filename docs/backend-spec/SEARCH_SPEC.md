# RED7 Search, Filtering & Indexing Specification
**Version:** 1.0.0  
**Search Engine:** PostgreSQL Full-Text Search (`tsvector`) + Trigram Similarity (`pg_trgm`)

---

## 1. Search Scope & Business Requirements

The RED7 catalog requires high-precision football and streetwear search handling:
1. **Club & National Team Matching:** Real Madrid, AC Milan, Barcelona, Argentina, Manchester City.
2. **Player & Squad Names:** Bellingham, Saka, Messi, Pulisic, Modric.
3. **Typo Tolerance & Fuzzy Matching:** Handling spelling mistakes (e.g. `"Madird"`, `"Belingham"`, `"Mlan"`).
4. **Faceted Filtering:** Filtering by department/category, club, size (`S` to `2XL`), maximum price ceiling, and in-stock availability.
5. **Instant Autocomplete & Trending Chips:** Providing fast instant lookups (<30ms) for the search modal.

---

## 2. PostgreSQL Full-Text Search Configuration

### 2.1 Weighted Document Vector
The `products.search_vector` column assigns weighted importance to fields:
- **Weight A (1.0):** `products.title` + `products.club`
- **Weight B (0.4):** `products.subtitle` + `products.league`
- **Weight C (0.2):** `products.department` + `products.badge`
- **Weight D (0.1):** `products.description`

### 2.2 SQL Query Implementation
```sql
SELECT 
    p.id,
    p.slug,
    p.title,
    p.subtitle,
    p.price,
    p.original_price,
    p.club,
    p.department,
    p.in_stock,
    p.stock_count,
    ts_rank_cd(p.search_vector, query) AS rank,
    similarity(p.title, :raw_search_term) AS trigram_sim
FROM products p,
     websearch_to_tsquery('english', :raw_search_term) query
WHERE 
    (p.search_vector @@ query OR similarity(p.title, :raw_search_term) > 0.25)
    AND (:category_filter IS NULL OR p.category = :category_filter)
    AND (:club_filter IS NULL OR p.club = :club_filter)
    AND (:max_price IS NULL OR p.price <= :max_price)
ORDER BY 
    CASE WHEN :sort_by = 'price-low' THEN p.price END ASC,
    CASE WHEN :sort_by = 'price-high' THEN p.price END DESC,
    CASE WHEN :sort_by = 'newest' THEN p.created_at END DESC,
    CASE WHEN :sort_by = 'best-selling' THEN p.reviews_count END DESC,
    rank DESC, 
    trigram_sim DESC
LIMIT :limit OFFSET :offset;
```

---

## 3. Supported Facets & Query Parameters

| Parameter | Type | Default | Example | Target Field |
| :--- | :--- | :--- | :--- | :--- |
| `query` / `q` | String | None | `"Madrid"` | `title`, `club`, `subtitle` |
| `category` | Enum | None | `football-jerseys` | `products.category` |
| `club` | Multi-String | None | `Real Madrid,AC Milan` | `products.club` |
| `size` | Multi-Enum | None | `M,L` | Joined `product_variants.size` |
| `maxPrice` | Number | None | `800` | `products.price <= 800` |
| `inStockOnly` | Boolean | `false` | `true` | `products.in_stock = true` |
| `sort` | Enum | `featured` | `price-low` | Order by clause |
| `page` | Integer | `1` | `1` | Pagination offset |
| `limit` | Integer | `20` | `20` | Page batch size |

---

## 4. Facet Aggregations Endpoint (`GET /catalog/filters`)

Used by `src/app/shop/page.tsx` to dynamically render filter counts in the Filter Modal:
```json
{
  "totalCount": 409,
  "clubs": [
    { "name": "Real Madrid", "count": 84 },
    { "name": "AC Milan", "count": 62 },
    { "name": "Argentina", "count": 48 },
    { "name": "Barcelona", "count": 52 },
    { "name": "Manchester City", "count": 39 }
  ],
  "sizes": [
    { "size": "S", "count": 380 },
    { "size": "M", "count": 395 },
    { "size": "L", "count": 390 },
    { "size": "XL", "count": 360 },
    { "size": "2XL", "count": 290 }
  ],
  "priceRange": {
    "min": 349.00,
    "max": 999.00
  }
}
```

---

## 5. Performance Optimization & Caching Strategy
1. **GIN Indexes:** Both `idx_products_search_vector` and `idx_products_title_trgm` ensure full-text queries execute in `<15ms` for a 50,000 SKU catalog.
2. **Edge Caching:** Common catalog queries (`/products`, `/categories`) are cached at Cloudflare/Fastly CDN with a 120-second TTL and purged via webhook on admin product updates.
3. **Database Pre-warming:** Frequently queried terms ("AC Milan", "Madrid", "Bellingham") are pre-indexed in memory via PostgreSQL shared buffers.
