\# Job Application Management System



A full-stack application for creating, tracking, updating, and deleting job applications.



\## Tech Stack



\- Java

\- Spring Boot

\- React.js

\- REST APIs

\- PostgreSQL

\- Spring Data JPA

\- Maven



\## Features



\- Add new job applications

\- View saved applications

\- Update application details and status

\- Delete applications

\- Track application status

\- PostgreSQL database persistence

\- RESTful API communication between React and Spring Boot



\## Architecture



React Frontend

&#x20;     ↓

REST API

&#x20;     ↓

Spring Boot Controller

&#x20;     ↓

Service Layer

&#x20;     ↓

Repository / Spring Data JPA

&#x20;     ↓

PostgreSQL



\## REST API Endpoints



| Method | Endpoint | Purpose |

|---|---|---|

| GET | `/api/applications` | Get all applications |

| GET | `/api/applications/{id}` | Get application by ID |

| POST | `/api/applications` | Create an application |

| PUT | `/api/applications/{id}` | Update an application |

| DELETE | `/api/applications/{id}` | Delete an application |



\## Project Structure



\- `job-management` - Spring Boot backend

\- `job-management-frontend` - React frontend



\## Current Status



Core full-stack CRUD functionality is complete.

