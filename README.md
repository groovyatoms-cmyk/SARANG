# SARANG — Admin Dashboard

An enterprise-grade admin platform built with React, Vite, and Material UI.

## Stack

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

Then open the printed local URL. The app boots straight into the eCommerce dashboard at `/dashboard/ecommerce` (mock-authenticated by default).

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

## Notable features

- Dark/light/system theme with a persisted customization panel (sidebar mode, density, content width, topbar mode)
- Command palette (`Ctrl/Cmd+K`) searching products, orders, customers, users, and navigation
- Reusable `DataTable` (search, sort, filter, pagination, bulk actions, CSV/JSON export, CSV import)
- Product and order detail drawers, notification center, mega menu, app launcher, language menu
- Mock authentication (login/register/forgot/reset/2FA/lock screen) behind a `ProtectedRoute`
- Error boundary plus 403/404/500/maintenance pages

Modules not yet built out (Chat, Tasks, Invoice, HRM, Email, Calendar, Promo) render an honest "Coming Soon" state rather than fake functionality.
