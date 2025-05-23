# 🚀 Volteras Project Roadmap 🚀

This roadmap outlines our journey in building the Volteras application, tracking both completed milestones and future plans. It's based on our architectural decisions (ADRs) and development progress.

## ✅ Completed Milestones

### 🏗️ Project Setup and Architecture
- [x] Initial project scaffolding and repository setup
- [x] Decision to use a simple multi-service directory structure instead of full monorepo tools
- [x] Implementation of go-task as a task runner for cross-language automation
- [x] Establishment of production-ready development environment with linting tools:
  - [x] Frontend: ESLint, Prettier, TypeScript
  - [x] Backend: Black, Flake8, isort

### 🎨 Frontend Development
- [x] Selection of Park UI as the component library with Atomic Design architecture
- [x] Implementation of a style system for theming
- [x] Setup of Storybook for component development and documentation
- [x] Scaffolding of component folder structure following Atomic Design principles
- [x] Integration of React Query for backend data fetching
- [x] Implementation of React Table for data display

### 🔧 Backend Development
- [x] Decision to use synchronous FastAPI endpoints with SQLAlchemy
- [x] Creation of initial endpoints returning mocked vehicle data
- [x] Establishment of backend-frontend communication
- [x] Implementation of database to store vehicle data
- [x] Creation of Vehicle concept in the backend
- [x] Development of filtering logic for vehicle IDs

### 🔄 Integration
- [x] Connection of frontend dropdown to backend vehicle ID list
- [x] Implementation of query parameters for vehicle ID filtering

## 🔮 Future Plans

### 🎨 Frontend Enhancements
- [ ] Implement advanced filtering options:
  - [ ] Add date range picker for timestamp filtering
  - [ ] Add multi-select filters for other fields
- [ ] Add sorting functionality to the data table
- [ ] Add data visualization components:
  - [ ] Create line charts for speed and state of charge over time
  - [ ] Implement elevation profile visualization
  - [ ] Add interactive dashboard with multiple visualization types
- [ ] Improve responsive design for mobile devices

### 🔧 Backend Improvements
- [ ] Enhance filtering capabilities:
  - [ ] Implement timestamp range filtering (start/end date)
  - [ ] Add filtering by other vehicle data fields
- [ ] Implement POST endpoint for populating the database with CSV data
- [ ] Implement endpoints to both clear and re-seed the database

### 🧪 Testing and Quality
- [ ] Increase test coverage for frontend components
- [ ] Add integration tests for critical user flows
- [ ] Implement end-to-end testing
- [ ] Set up continuous integration pipeline

### 🚀 Deployment and Operations
- [ ] Implement infrastructure as code using Github Actions to run linting and testing tasks on checkin
- [ ] Implement terraform modules to run in our Github Actions to spin up frontend, backend and database in Render
- [ ] Configure automated deployments

---

This roadmap is a living document that will evolve as the project progresses. It reflects both our accomplishments and our vision for the future of the Volteras application.
