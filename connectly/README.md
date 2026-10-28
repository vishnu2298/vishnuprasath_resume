# Connectly: Buy • Sell • Connect

A marketplace and community app for buying and selling locally and connecting with people nearby.
Designed to be **simple enough for older users**: large text, high contrast, 56 px tap targets,
labelled icons, plain language, and a built-in text-size setting (Normal / Large / Extra large).

| Part | Stack | Path |
| --- | --- | --- |
| Mobile app (iOS, Android, web) | React Native (Expo SDK 58), TypeScript, React Navigation | [`mobile/`](mobile) |
| Primary API | Node.js, Express, SQLite (`node:sqlite`), JWT auth | [`backend/`](backend) |
| Supporting service | Python, FastAPI (scam moderation and price guidance) | [`services/insights/`](services/insights) |

## Features

- **Accounts**: register, log in, change password, delete account (app-store requirement), profile with photo, bio, interests, city.
- **Buy**: category browsing, search, filters (category, city, price band), sorting (newest, nearest, price), pagination, saved items, item details with photo gallery, **Buy Now** requests.
- **Sell**: photo upload (gallery or camera), category, condition, price with **price guidance** from the Python service, edit, mark sold or relist, delete.
- **Orders**: buyer request → seller accepts or declines → handover → completed → two-way ratings and reviews. Payment is in person at handover; nothing is charged in the app.
- **Messaging**: item-linked chats, quick replies, share location, unread badges, message requests via connections.
- **Connect**: people nearby (sorted by distance), interest filters, connection requests, my connections.
- **Trust and safety**: verified badges, ratings, report listing or person, block, safety tips, scam detection (advance payment, OTP requests, gift cards and similar) that blocks risky listings and warns in chat.
- **Accessibility**: adjustable text size, high contrast palette, screen-reader labels, large touch targets, no gesture-only actions.

## Quick start

Requirements: Node 22.13+, Python 3.10+.

```bash
./dev.sh                                  # API on :4000, insights service on :5000 (seeds demo data on first run)
cd mobile && npm install && npx expo start  # press w (web), a (Android) or i (iOS), or scan with Expo Go
```

Demo login: `demo@connectly.app` / `demo1234`. Other seeded users: `rohit@`, `sneha@`, `arun@`, `divya@` … `@connectly.app`, same password.

The app finds the API automatically (`localhost:4000` on web/iOS simulator, `10.0.2.2:4000` on the Android emulator).
On a physical phone set your computer's address: `EXPO_PUBLIC_API_URL=http://192.168.x.x:4000 npx expo start`.

### Docker

```bash
JWT_SECRET=$(openssl rand -hex 32) docker compose up --build   # API :4000, insights :5000
```

## Tests

```bash
cd backend && npm test                          # 10 end-to-end API tests (in-memory DB)
cd services/insights && python -m pytest -q     # moderation and price-hint tests
cd mobile && npx tsc --noEmit                   # type check
```

## API overview

`POST /auth/register|login` · `GET|PATCH|DELETE /me` · `GET /categories` · `GET|POST /listings` · `GET|PATCH|DELETE /listings/:id` ·
`POST /listings/:id/status|favorite` · `GET /search` · `GET|POST /orders` · `POST /orders/:id/accept|decline|cancel|complete|review` ·
`GET|POST /conversations` · `GET|POST /conversations/:id/messages` · `GET /people` · `POST /connections` ·
`GET /connections/requests` · `POST /connections/:id/respond` · `GET /users/:id` · `POST /reports` · `POST|DELETE /blocks/:userId` · `POST /uploads`.

## Design notes and known limits

- The API degrades gracefully: if the Python service is down, moderation and price hints are skipped rather than failing requests.
- Chat uses 3-second polling, which keeps the backend stateless and simple. WebSockets (or push via FCM/APNs) are the next step for scale.
- SQLite suits a single instance. For multiple instances, move to PostgreSQL (the SQL is portable) and object storage for uploads.
- "Verified" is a flag set by operators; real ID or phone verification (OTP provider) needs external credentials and is not wired.
- No online payments: deals are settled in person. A payment gateway would need merchant credentials.
- Set `JWT_SECRET` in production (the API refuses to start without it when `NODE_ENV=production`).
