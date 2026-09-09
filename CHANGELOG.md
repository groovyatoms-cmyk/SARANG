# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-09-09

Initial release of the SARANG admin platform.

### Added

- **Design system** (`src/theme/`): dark (default), light, and system color palettes built around
  a `#3368A0` / `#66A3BF` brand blue with mint/cream light-mode surfaces; centralized layout
  dimensions (`SARANG_LAYOUT`, `SARANG_SHADOWS`); a full MUI `components` override map so the UI
  never falls back to stock Material UI styling.
- **App shell**: collapsible sidebar with nested navigation and badges, sticky topbar with quick
  search, mega menu, app launcher, notification center, language menu, fullscreen toggle, and a
  persisted customization drawer (theme, sidebar mode, density, content width, topbar mode,
  breadcrumbs/footer visibility).
- **Command palette** (`Ctrl`/`Cmd`+`K`) searching products, orders, customers, users, and
  navigation, with recent searches, grouped results, highlighted matches, and keyboard navigation.
- **eCommerce dashboard** (`/dashboard/ecommerce`): welcome card with a live clock, KPI cards
  (Orders/Revenue/Growth) with drill-down navigation, store performance donut chart, weekly
  performance range visualization, tabbed sales report (Today/Monthly/Annual) with an area+line
  chart, top selling products, recent orders, revenue by location, and a recent activity timeline.
- **Secondary dashboards**: Analytics, CRM, Finance, and Projects, each with their own KPIs and
  charts (traffic sources, sales pipeline, income vs. expenses, active project progress).
- **Reusable `DataTable`** (`src/components/tables/`): search, sortable columns, filter selects,
  pagination, row selection, bulk actions, CSV/JSON export, and a CSV import flow
  (upload → preview → confirm → import → success). Powers Products, Orders, Customers, Users, and
  Inventory.
- **Detail drawers**: product details (edit/duplicate/archive/delete), order details (line items,
  totals, status timeline, refund/cancel/print/export), and user details (role & permissions).
  Each drawer is reachable both by clicking a row and by direct route
  (e.g. `/ecommerce/orders/:id`).
- **Authentication flow**: login, register, forgot/reset password, 2FA, and lock screen, backed by
  a mock `useAuthStore` and a `ProtectedRoute` guard — structured so a real backend can replace the
  mock implementation without touching UI components.
- **Error handling**: a React error boundary plus dedicated 403, 404, 500, and maintenance pages.
- **Honest empty states**: apps not yet built (Chat, Tasks, Invoice, HRM, Email, Calendar, Promo)
  render a clear "Coming Soon" screen instead of non-functional buttons; CRM/Finance/Projects apps
  redirect to their dashboard equivalents.
- **Feedback system**: a toast/snackbar host, confirm dialogs, and skeleton loading states for
  KPIs, charts, tables, and lists.
- **Service layer** (`src/services/`): every page reads through an async service wrapper over
  `src/data/*` mock datasets, never mock data directly, so a real API/GraphQL/Supabase backend can
  be swapped in later.

### Fixed

- Recharts `Pie` sectors failing to render in this environment — resolved by disabling
  per-chart mount animation (`isAnimationActive={false}`) across all chart types.
- MUI `Stack` forwarding layout shorthand props (`alignItems`, `justifyContent`, `flexWrap`,
  `rowGap`) straight to the DOM instead of converting them to styles — wrapped in a local `Stack`
  component (`src/components/common/Stack.jsx`) that folds them into `sx`.
- Y-axis tick labels clipping on the Sales Report, Analytics, and Finance charts — widened the
  axis and added a compact number formatter.
- `Typography`'s `textAlign` prop (not a real prop in this MUI version) silently leaking to the
  DOM — replaced with the documented `align` prop.
