# Tech Event Schedule — Full-Stack App

A **full-stack** event scheduling web app: browse events, register with name/email, view confirmation, and create new events. Data is stored in **MongoDB**; the UI is built with **Next.js** (App Router), TypeScript, and Tailwind CSS.

---

## Tech Stack

| Layer        | Technology                          |
|-------------|--------------------------------------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS |
| **Backend**  | Next.js API Routes (serverless)      |
| **Database** | MongoDB with Mongoose                |
| **Deploy**   | Docker, Kubernetes                   |
| **Analytics**| PostHog                              |

---

## Features

- **Home** — Featured events (from DB or seed data)
- **Event detail** — Full event info + registration form
- **Registration** — Name + email; saved to MongoDB; redirect to confirmation page
- **Confirmation** — Shows your name, email, and registered event
- **Create Event** — Form to add new events (stored in MongoDB)
- **MongoDB in browser** — Use [mongo-express](https://github.com/mongo-express/mongo-express) (Docker) to view/edit DB records

---

## Prerequisites

- **Node.js** 20+ (for local dev)
- **Docker** (for MongoDB, or for running the whole app in containers)
- **MongoDB** — run via Docker (recommended) or install locally

---

## 1. Run locally (Node on your machine)

You run the Next.js app with `npm run dev`; MongoDB can be Docker or local.

### 1.1 Start MongoDB (Docker)

```bash
docker run -d --name event-mongo -p 27017:27017 mongo:7
```

### 1.2 Environment

Create `.env` (or copy from `.env.example`):

```bash
MONGODB_URI=mongodb://localhost:27017/event-schedule
# Optional: PostHog
NEXT_PUBLIC_POSTHOG_KEY=your_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### 1.3 Install, seed, and run

```bash
npm install
npm run seed          # Populate MongoDB with sample events
npm run dev           # http://localhost:3000
```

### 1.4 (Optional) View database in browser

```bash
docker run -d --name mongo-express --link event-mongo:mongo -p 8081:8081 \
  -e ME_CONFIG_MONGODB_URL=mongodb://mongo:27017 \
  -e ME_CONFIG_BASICAUTH=false \
  mongo-express:latest
```

Then open **http://localhost:8081** — browse `event-schedule` → `events` and `bookings`.

---

## 2. Run with Docker (app + DB in containers)

OR — you can run **everything locally using Docker**: the Next.js app and MongoDB both run in containers on your machine. No need to install Node or MongoDB on the host.

### 2.1 Build the app image

```bash
docker build -t event-schedule .
```

### 2.2 Start MongoDB

```bash
docker run -d --name event-mongo -p 27017:27017 mongo:7
```

### 2.3 Run the app container

```bash
docker run -d --name event-app -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/event-schedule \
  event-schedule
```

- **Linux**: If `host.docker.internal` doesn’t work, use your host IP or `--network host` and `mongodb://localhost:27017/event-schedule`.
- **macOS/Windows**: `host.docker.internal` points to the host, so the app in Docker can reach MongoDB on your machine.

### 2.4 Seed the database (from your host)

```bash
npm run seed   # Uses .env on host; connects to localhost:27017
```

Then open **http://localhost:3000**.

### 2.5 (Optional) Docker Compose — one command

You can add a `docker-compose.yml` to start MongoDB + app + mongo-express together; the commands above are the manual equivalent.

---

## 3. Run with Kubernetes

For a real cluster (e.g. cloud or minikube). Build and push your image, then apply the manifests.

```bash
# Build image (tag for your registry if needed)
docker build -t event-schedule:latest .

# Apply in order
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/mongo.yaml
kubectl apply -f k8s/deployment.yaml

# Check
kubectl get pods -n event-schedule

# Access: NodePort 30080 or your Ingress
# e.g. http://<node-ip>:30080
```

Update `k8s/secret.yaml` with your `MONGODB_URI` (e.g. cluster-internal MongoDB or Atlas).

---

## Summary: “Local” vs “Docker” vs “Kubernetes”

| How you run              | What runs where                          | Typical use        |
|--------------------------|------------------------------------------|--------------------|
| **Local (Node)**         | App: `npm run dev` on host; DB: Docker or local | Day-to-day dev     |
| **Local with Docker**    | App + DB in Docker on your machine       | Dev or demo on one machine |
| **Kubernetes**           | App + DB in a K8s cluster (multi-node)   | Staging / production       |


---

## Scripts

| Command       | Description                    |
|---------------|--------------------------------|
| `npm run dev` | Start Next.js dev server       |
| `npm run build` | Production build             |
| `npm run start` | Run production server        |
| `npm run seed` | Seed MongoDB with sample events |
| `npm run lint` | Run ESLint                    |

---

## UI & analytics

- **Background**: [ReactBits — Light Rays](https://reactbits.dev/backgrounds/light-rays)
- **Analytics**: [PostHog](https://posthog.com/)
