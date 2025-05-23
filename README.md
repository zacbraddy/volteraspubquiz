# 🚗 Volteras Pub Quiz 🧠

Welcome to the Volteras Pub Quiz project! This monorepo contains a full-stack application for managing vehicle data with a modern React frontend and FastAPI backend.

## 🚀 Getting Started

### Prerequisites

- Node.js (v22 or higher) 📦
- Python 3.11 📦
- Docker and Docker Compose 🐳
- pnpm (for client package management) 📦
- Poetry (for server package management) 📦

### 🛠️ Setup

Clone the repository and set up both the client and server applications with a single command:

```bash
task bootstrap
```

This will:
1. Install client dependencies with pnpm
2. Set up Python virtual environment with Python 3.11
3. Install server dependencies with Poetry

## 🏃‍♂️ Running the Application

Start both the client and server applications in development mode:

```bash
task dev
```

This will:
1. Start the PostgreSQL database in a Docker container
2. Start the FastAPI server
3. Start the React client application

### 🖥️ Client Only

```bash
task client:dev
```

### 🖧 Server Only

```bash
task server:dev
```

## 🧪 Testing

Run tests for both client and server:

```bash
task test
```

### 🖥️ Client Tests Only

```bash
task client:test
```

### 🖧 Server Tests Only

```bash
task server:test
```

## 🧹 Linting

Lint both client and server code:

```bash
task lint
```

### 🖥️ Client Linting Only

```bash
task client:lint
```

### 🖧 Server Linting Only

```bash
task server:lint
```

## 📚 Storybook

Run Storybook for UI component development:

```bash
task storybook
```

Build Storybook for deployment:

```bash
task build-storybook
```

## 🏗️ Project Structure

The project is organized as a monorepo with the following structure:

```
/
├── apps/
│   ├── client/         # React frontend application
│   └── server/         # FastAPI backend application
├── documentation/      # Project documentation
└── Taskfile.yml        # Task runner configuration
```

### 🖥️ Client Architecture

The client is a modern React application built with:

- [React](https://reactjs.org/) - UI library 🎨
- [TypeScript](https://www.typescriptlang.org/) - Type safety 🛡️
- [Vite](https://vitejs.dev/) - Build tool ⚡
- [TanStack Query](https://tanstack.com/query/latest) - Data fetching and state management 📊
- [TanStack Table](https://tanstack.com/table/latest) - Table component 📋
- [PandaCSS](https://panda-css.com/) - CSS-in-JS solution 🐼
- [Park UI](https://park-ui.com/) - UI component library 🏞️
- [Storybook](https://storybook.js.org/) - UI component development 📕
- [Vitest](https://vitest.dev/) - Testing framework 🧪

### 🖧 Server Architecture

The server is a FastAPI application built with:

- [FastAPI](https://fastapi.tiangolo.com/) - Web framework 🚀
- [SQLAlchemy](https://www.sqlalchemy.org/) - ORM 🗃️
- [Pydantic](https://docs.pydantic.dev/) - Data validation 📝
- [PostgreSQL](https://www.postgresql.org/) - Database 🐘
- [Poetry](https://python-poetry.org/) - Dependency management 📦
- [Pytest](https://docs.pytest.org/) - Testing framework 🧪

## 🔌 API Endpoints

The backend provides the following API endpoints:

### Vehicle Data

#### GET `/api/v1/vehicle_data/`

Returns paginated vehicle data.

**Query Parameters:**
- `vehicle_id` (optional): UUID of a specific vehicle
- `page_size` (optional): Number of items per page (default: 10, min: 1, max: 100)
- `page` (optional): Page number (default: 0, min: 0)

**Response:**
```json
{
  "items": [...],
  "total": 100,
  "page": 0,
  "page_size": 10
}
```

#### GET `/api/v1/vehicle_data/vehicles/`

Returns a list of all vehicles.

**Response:**
```json
[
  {
    "id": "uuid",
    "make": "string",
    "model": "string"
  }
]
```

## 🤝 Contributing

1. Make sure you have all prerequisites installed
2. Clone the repository
3. Run `task bootstrap` to set up the project
4. Run `task dev` to start the development environment
5. Make your changes
6. Run `task lint` and `task test` to ensure your changes pass all checks
7. Submit a pull request

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

Happy coding! 🎉

## 📝 Note to interviewer

I didn't manage to get everything I had hoped to get done, done as part of this project within the alloted time period, 
please check out the Roadmap.md in the documentation folder for info on the direction I was heading with the project 
when I ran out of time and you can see the markdown files in the documentation/ADRs folder which describe the decisions 
I made and my reasons for them as I implemented the features.
