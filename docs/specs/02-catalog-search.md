# Feature Spec: Catalog, Shop & Search

## Purpose
Enables users to explore the complete catalog of season kits and terrace streetwear, apply club/size/price filters, switch grid views, and execute rapid text searches.

## UI Behavior
- **Announcement Strip**: `PAN-INDIA 48H DISPATCH // FLASH SALE DROP • BUY 4 GET 1 FREE`.
- **Catalog Controls**:
  - Filter modal trigger showing active filter count (e.g. `Filters (3)`).
  - Sort dropdown: `Most relevant`, `Price: Low to High`, `Price: High to Low`, `Newest Drop`.
  - View switcher: Toggle between 2-Column Grid and 1-Column Editorial List.
  - Active filter badges strip: Removable chips with `Clear All` button.
- **Product Grid**:
  - 4:5 aspect ratio media container with badges (`DROP #01`, `-11% OFF`, `PLAYER VER.`, `Fast selling`).
  - Quick Add to Bag floating button on each card.
  - Heart Wishlist toggle button.
  - Current price in bold ₹ + strike-through MRP + stock indicator (`Ready to ship`).
- **Interactive Search**:
  - Modal overlay / live filter with auto-suggestions, club matching, and recent searches.

## API Dependency
- `GET /products?query={q}&category={c}&club={club}&size={s}&sort={sort}&min_price={min}&max_price={max}`

## Data Structure
- `ProductFilterState`, `ProductListResponse`

## Loading, Empty, and Error States
- **Loading**: Shimmer grid skeletons with matching 4:5 aspect ratio.
- **Empty**: "No kits found matching your filters" with a 1-tap "Reset Filters" button.
- **Error**: Error message with retry button.

## Acceptance Criteria
- Matches Stitch Catalog screen spec exactly.
- Filter slide-over modal supports multiple club, category, size, and price range selections.
