# Job-Scheduler
# Frontend - Job Scheduler Dashboard

Next.js dashboard for managing and monitoring jobs.

## Structure

```
frontend/
├── pages/
│   ├── _app.js           # App wrapper
│   └── index.js          # Main dashboard page
├── services/
│   └── api.js            # API service layer
├── styles/
│   └── globals.css       # Global styles
├── package.json
├── next.config.js
└── .env.local
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Frontend

```bash
# Development
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## Features

### 1. Job Dashboard
- View all jobs in a sortable table
- Real-time status updates
- Statistics cards showing job counts
- Responsive design for all screen sizes

### 2. Filters
- Filter by status: All, Pending, Running, Completed
- Filter by priority: All, Low, Medium, High
- Filters work independently or combined

### 3. Create Job Modal
- Form to create new jobs
- Task name input
- Priority dropdown
- JSON payload editor with validation
- Real-time validation

### 4. Job Detail Panel
- Slides in when clicking a job row
- Shows complete job information
- Formatted JSON payload viewer
- Run job button
- Timestamps (created, completed)

### 5. Run Job
- One-click job execution
- Disabled for running/completed jobs
- Real-time status updates
- Visual feedback with animations

## Design System

### Typography
- **Headers**: Crimson Pro (serif)
- **Body**: DM Sans (sans-serif)
- **Code**: Courier New (monospace)

### Colors
```css
--color-bg: #fafaf9          /* Background */
--color-surface: #ffffff      /* Cards/panels */
--color-border: #e7e5e4       /* Borders */
--color-text-primary: #1c1917 /* Primary text */
--color-text-secondary: #57534e /* Secondary text */
--color-accent: #0c4a6e       /* Buttons/links */
--color-pending: #f59e0b      /* Pending status */
--color-running: #3b82f6      /* Running status */
--color-completed: #10b981    /* Completed status */
```

### Animations
- Fade-in-up for main sections
- Slide-in-right for detail panel
- Smooth transitions on hover
- Loading spinners for async operations

## Components

### Job Table
- Sortable columns
- Clickable rows
- Status badges with icons
- Priority indicators
- Action buttons

### Statistics Cards
- Total jobs
- Pending count
- Running count
- Completed count
- Hover effects

### Create Job Form
- Validated inputs
- JSON payload editor
- Priority selection
- Submit/cancel actions

### Detail Panel
- Sticky positioning
- Close button
- Job overview
- Formatted payload
- Run job action

## API Integration

The frontend uses Axios to communicate with the backend:

```javascript
// services/api.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const jobsAPI = {
  createJob: async (jobData) => { ... },
  getJobs: async (filters) => { ... },
  getJobById: async (id) => { ... },
  runJob: async (id) => { ... }
};
```

## State Management

Uses React hooks for state:
- `useState` - Component state
- `useEffect` - Side effects (data fetching)

### Key State Variables
- `jobs` - All jobs from API
- `filteredJobs` - Jobs after applying filters
- `selectedJob` - Currently selected job for detail view
- `filters` - Current filter settings
- `loading` - Loading state for async operations
- `showCreateForm` - Modal visibility
- `createFormData` - Form input values

## Responsive Breakpoints

```css
/* Desktop: Default styles */
/* Tablet: max-width: 1024px */
/* Mobile: max-width: 768px */
```

### Mobile Optimizations
- Stacked layout for detail panel
- Reduced font sizes
- Adjusted padding/spacing
- Touch-friendly button sizes
- 2-column statistics grid

## User Interactions

### Creating a Job
1. Click "Create Job" button
2. Fill form fields
3. Submit (validates JSON)
4. Modal closes
5. Jobs list refreshes

### Filtering Jobs
1. Select filter dropdown
2. Choose option
3. Table updates immediately
4. Statistics update

### Running a Job
1. Click "Run Job" button
2. Status changes to "running"
3. After 3 seconds, changes to "completed"
4. Webhook triggers (backend)

### Viewing Job Details
1. Click any job row
2. Detail panel slides in
3. View all information
4. Close or select another job

## Error Handling

- API errors show alerts
- Invalid JSON in create form shows validation message
- Network errors are caught and logged
- User-friendly error messages

## Performance Optimizations

- Efficient re-renders with proper state management
- CSS animations (hardware accelerated)
- Debounced API calls where appropriate
- Lazy loading (Next.js built-in)

## Browser Support

Supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

- # Backend - Job Scheduler API

Express.js REST API for the Job Scheduler system.

## Structure

```
backend/
├── controllers/
│   └── jobController.js    # HTTP request handlers
├── services/
│   ├── jobService.js       # Business logic
│   └── webhook.js          # Webhook notifications
├── routes/
│   └── jobRoutes.js        # API route definitions
├── database/
│   ├── connection.js       # MySQL connection pool
│   └── schema.sql          # Database schema
├── app.js                  # Main Express application
├── package.json
└── .env.example
```

## Environment Variables

Required variables in `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=job_scheduler
DB_PORT=3306
PORT=5000
WEBHOOK_URL=https://webhook.site/your-unique-url
NODE_ENV=development
```

## API Endpoints

### Health Check
- `GET /health` - Check API status

### Jobs
- `POST /api/jobs` - Create a new job
- `GET /api/jobs` - Get all jobs (with optional filters)
- `GET /api/jobs/:id` - Get a single job
- `POST /api/run-job/:id` - Run a job

## Running the Backend

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## Database Schema

The `jobs` table structure:

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Auto-increment primary key |
| taskName | VARCHAR(255) | Job name |
| payload | JSON | Job data |
| priority | VARCHAR(20) | Low, Medium, or High |
| status | VARCHAR(20) | pending, running, completed |
| createdAt | TIMESTAMP | Creation time |
| updatedAt | TIMESTAMP | Last update time |
| completedAt | TIMESTAMP | Completion time (nullable) |

## Job Processing Flow

1. User creates job (status: `pending`)
2. User clicks "Run Job"
3. Status changes to `running`
4. Simulated 3-second processing
5. Status changes to `completed`
6. Webhook notification sent

## Webhook Payload

When a job completes, this payload is sent:

```json
{
  "event": "job.completed",
  "timestamp": "2024-01-20T10:30:03.000Z",
  "data": {
    "jobId": 1,
    "taskName": "Send Welcome Email",
    "priority": "High",
    "status": "completed",
    "payload": {
      "email": "user@example.com",
      "template": "welcome"
    },
    "createdAt": "2024-01-20T10:30:00.000Z",
    "completedAt": "2024-01-20T10:30:03.000Z"
  }
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common error codes:
- 400: Bad request (validation error)
- 404: Job not found
- 500: Internal server error

## Logging

All requests and important events are logged to console:
- Request method and path
- Job creation
- Job execution start/complete
- Webhook triggers
- Database errors

## Testing with cURL

```bash
# Create a job
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "taskName": "Test Job",
    "priority": "High",
    "payload": {"test": true}
  }'

# Get all jobs
curl http://localhost:5000/api/jobs

# Get jobs by status
curl http://localhost:5000/api/jobs?status=pending

# Run a job
curl -X POST http://localhost:5000/api/run-job/1
```
