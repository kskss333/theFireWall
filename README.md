# THE FIREWALL

**An interactive cybersecurity learning platform for schools.**

THE FIREWALL is an educational platform designed to help teenagers develop practical digital-safety skills. It brings students, teachers, and parents together in one learning environment and uses interactive exercises and gamified progress to make cybersecurity education more engaging.

## What the platform includes

- **Student area** — learning dashboard, progress overview, XP, achievements, recommendations, and assigned activities.
- **Teacher area** — tools for working with classes and assignments, monitoring student progress, and preparing learning activities.
- **Parent area** — an overview of a child's learning progress, strengths, areas for improvement, recent activity, and recommendations.
- **Learning catalog** — educational modules and topics related to digital safety.
- **Interactive exercises** — practical scenarios for recognizing phishing and evaluating password strength.
- **Authentication and role-based navigation** — separate application areas for different user roles.

## Interactive learning

The project includes hands-on exercises that turn cybersecurity topics into practical tasks:

- **Phishing simulator** — review sample emails, decide whether they are safe or suspicious, and receive feedback explaining the clues.
- **Password strength simulator** — test a password against basic strength criteria and see suggestions for improvement.

## My contribution

- Developed the product concept and learning mechanics.
- Designed the interface and visual direction.
- Implemented the frontend application.
- Built the main user flows and role-specific dashboards.
- Developed interactive learning components.
- Participated in testing the platform with students.

## Tech stack

- **React 19** — UI
- **JavaScript (ES modules)** — application logic
- **Redux Toolkit / React Redux** — state management
- **React Router** — routing and protected pages
- **Ant Design** — UI components
- **Framer Motion** — interface animations
- **Axios** — HTTP client
- **DOMPurify** — sanitizing HTML displayed in the phishing exercise
- **Vite** — development server and build tool
- **MSW** — API mocking during development

## Getting started

### Requirements

- Node.js (a current LTS version is recommended)
- npm

### Installation

```bash
git clone https://github.com/kskss333/theFireWall.git
cd theFireWall
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production version |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project status

The project has been officially patented.

Some dashboard content currently uses demonstration data. The repository represents the frontend implementation; availability of backend-connected functionality depends on the server/API configuration.

---

**THE FIREWALL** — learning to recognize digital threats before they become real problems.
