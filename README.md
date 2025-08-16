# Employee Management Backend

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Run `npm install`
3. Start dev server: `npm run dev`

## API
- `POST /api/auth/login` -> { token } using ADMIN_USER/ADMIN_PASS from `.env`
- Admin endpoints (Bearer token required):
  - Employees CRUD: `/api/employees`
  - Attendance CRUD: `/api/attendances`
  - Notices CRUD + pin: `/api/notices`, `PATCH /api/notices/:id/pin`
- Public endpoints (no auth required):
  - `/api/public/attendances?date=YYYY-MM-DD` (daily table)
  - `/api/public/notices` (pinned first)
