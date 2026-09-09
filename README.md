# SARANG — Admin Dashboard

An enterprise-grade admin platform built with React, Vite, and Material UI —
a custom design system layered on top of MUI rather than stock defaults.

## Tech stack

- **React 19** + **Vite** (JavaScript, no TypeScript)
- **Material UI** (`@mui/material`, `@mui/icons-material`) with a custom SARANG design system layered on top
- **react-router-dom** for routing
- **recharts** for data visualization
- **zustand** for global UI state (theme, sidebar, notifications, settings, auth)
- **date-fns** for date formatting

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. The app boots straight into the eCommerce dashboard at
`/dashboard/ecommerce` (mock-authenticated by default — see [Mock authentication](#mock-authentication)).

### Scripts

| Command           | Description                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR        |
| `npm run build`   | Type-free production build to `dist/`     |
| `npm run preview` | Preview the production build locally      |
| `npm run lint`    | Run Oxlint over the project               |

## Project structure

```
src/
├── assets/        static images/icons
├── components/    layout, navigation, dashboard, tables, charts, and shared components
├── pages/         route-level screens, grouped by area (dashboard, ecommerce, apps, pages, authentication, errors)
├── data/          realistic mock datasets
├── services/      thin async wrappers over the mock data (swap for real API calls later)
├── store/         zustand stores for cross-cutting UI state
├── hooks/         reusable hooks (debounce, pagination, search, sort, filter, fullscreen, notifications)
├── theme/         SARANG design tokens and the MUI theme built from them
├── routes/        route configuration and the ProtectedRoute guard
└── utils/         formatting, export/import, storage, and validation helpers
```

## Design system

Every structural value (sidebar width, topbar height, card radius, spacing, shadows) lives in
`src/theme/dimensions.js` as `SARANG_LAYOUT` / `SARANG_SHADOWS`, and every color lives in
`src/theme/colors.js` as `darkPalette` / `lightPalette`. `src/theme/components.js` builds the MUI
`components` override map from those tokens so the UI never falls back to stock MUI styling.
Components should always consume these tokens rather than hardcoding new colors, radii, or spacing.

## Notable features

- Dark/light/system theme (dark by default) with a persisted customization panel (sidebar mode, density, content width, topbar mode)
- Collapsible sidebar with nested navigation, and a topbar with quick search, mega menu, app launcher, notifications, fullscreen, and language menu
- Command palette (`Ctrl`/`Cmd`+`K`) searching products, orders, customers, users, and navigation, with recent searches and highlighted matches
- The full eCommerce dashboard: welcome card with a live clock, KPI cards, store performance donut, weekly performance range chart, tabbed sales report (Today/Monthly/Annual), top products, recent orders, revenue by location, and an activity timeline
- Reusable `DataTable` (search, sort, filter, pagination, row selection, bulk actions, CSV/JSON export, CSV import) powering Products, Orders, Customers, Users, and Inventory
- Product, order, and user detail drawers opened via both a click and a matching route (`/ecommerce/products/:id`, etc.)
- Mock authentication (login, register, forgot/reset password, 2FA, lock screen) behind a `ProtectedRoute`
- Error boundary plus dedicated 403/404/500/maintenance pages

Modules not yet built out (Chat, Tasks, Invoice, HRM, Email, Calendar, Promo) render an honest
"Coming Soon" state rather than fake, non-functional buttons.

## Mock authentication

`src/store/useAuthStore.js` persists auth/lock state to `localStorage` and is the single place a
real backend (REST/GraphQL/Supabase/Firebase) would plug in — UI components never touch mock data
directly, they go through `src/services/*`. The app starts authenticated for convenience; visit
`/auth/login` to see the sign-in flow, or use the user menu's **Lock Screen** action.

## Known limitations

- No reference screenshots were supplied for this build, so the visual design follows the SARANG
  design system and the given brand palette rather than a pixel-matched source image.
- Several apps (Chat, Tasks, Invoice, HRM, Email, Calendar, Promo) are intentionally scaffolded as
  "Coming Soon" screens; CRM/Finance/Projects apps redirect to their dashboard equivalents.
- Data is entirely mocked in `src/data/*`; nothing persists beyond `localStorage`-backed UI state.

See [CHANGELOG.md](./CHANGELOG.md) for release history.
