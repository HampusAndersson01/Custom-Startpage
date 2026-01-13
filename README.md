# Custom Start Page

Welcome to the Custom Start Page project! This project provides a customizable start page for your web browser, featuring quick links to your favorite websites and services.

## Features

- Responsive design with CSS Grid for a clean and modern layout.
- Sections for Social Media, Chat and Email, Entertainment, Home, News, and Sports.
- Interactive link elements with hover effects for a user-friendly experience.

## Deploy on Coolify (Docker Compose)

### Coolify settings
- Build Pack: Docker Compose
- Base Directory: `/`
- Docker Compose Location: `/docker-compose.yaml`
- Container Port: `8080`
- Healthcheck Path: `/healthz`

### Required environment variables
| Name | Example | Purpose | Required |
| --- | --- | --- | --- |
| `REACT_APP_HOME_ASSISTANT_API` | `https://homeassistant.local:8123` | Home Assistant base URL for the dashboard data | Only if enabling the dashboard |
| `REACT_APP_ACCESS_TOKEN` | `long-lived-token` | Home Assistant long-lived access token | Only if enabling the dashboard |

Notes:
- Values are injected at container start via `/env.js` (no secrets baked into the image).
- No persistent volumes are required for this app.

### Local run with Compose (optional)
```bash
docker compose up --build
```
Then open `http://localhost:8080`.
