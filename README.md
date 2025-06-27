# Task Management Application

This application is designed to help users manage their tasks efficiently. It integrates with Firebase Realtime Database to store and retrieve tasks dynamically, includes Firebase Authentication for secure user management, and uses Sentry for comprehensive error tracking and performance monitoring.

## Features

-   **User Authentication**: Secure email/password login and registration using Firebase Auth.
-   **Task Management**: Add, edit, and delete tasks with a modern UI.
-   **Task Categorization**: Organize tasks by status (e.g., Active, Completed).
-   **Search Functionality**: Find tasks with customizable filters (e.g., by title or description).
-   **Responsive Design**: Seamless use on all devices.
-   **Real-time Updates**: Tasks sync in real-time across sessions.
-   **Error Monitoring**: Real-time error tracking and performance monitoring with Sentry.
-   **Session Replay**: Debug issues with user session recordings.

---

## Technology Stack

-   **Frontend**: React with TypeScript
-   **State Management**: TanStack Query (React Query)
-   **Authentication**: Firebase Authentication
-   **Database**: Firebase Realtime Database
-   **Error Monitoring**: Sentry for error tracking and performance monitoring
-   **Styling**: Tailwind CSS
-   **Build Tool**: Vite

---

## Getting Started

Follow the steps below to set up and run the application:

### Prerequisites

Ensure you have the following installed:

1. **Node.js** (v16.x or later) and **npm** (v8.x or later).
2. A Firebase project with Realtime Database and Authentication enabled.
3. A Sentry account for error tracking and performance monitoring.

---

### Setup Instructions

#### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project.
3. Enable the **Realtime Database** for the project.

#### 2. Add Sample Tasks to the Database

1. Navigate to the Realtime Database section of your Firebase project.
2. Add a collection (e.g., `tasks`)

#### 3. Enable Firebase Authentication

1. In your Firebase project, navigate to **Authentication** in the left sidebar.
2. Go to the **"Sign-in method"** tab.
3. Click on **"Email/Password"**.
4. Toggle **"Enable"** for the first option (Email/Password).
5. Click **"Save"**.

#### 4. Get Firebase Configuration

1. In Firebase Console, click the **gear icon** next to "Project Overview".
2. Select **"Project settings"**.
3. Scroll down to the **"Your apps"** section.
4. If you haven't added a web app:
    - Click the **"</>"** icon (Web app icon)
    - Give your app a nickname
    - Click "Register app"
5. Copy the configuration values from the code snippet shown.

**Where to find each value:**

-   `apiKey`: Found in the Firebase config object
-   `authDomain`: Usually `your-project-id.firebaseapp.com`
-   `projectId`: Your Firebase project ID
-   `storageBucket`: Usually `your-project-id.appspot.com`
-   `messagingSenderId`: Numeric ID in the config
-   `appId`: App ID starting with `1:`

#### 5. Create and Configure Sentry Project

1. Go to [Sentry.io](https://sentry.io/) and create a free account.
2. Create a new project:
    - Click **"Create Project"**
    - Select **"React"** as the platform
    - Give your project a name (e.g., "task-management-app")
    - Choose your organization
    - Click **"Create Project"**
3. Copy the **DSN (Data Source Name)** from the project settings page.
4. In your Sentry project settings:
    - Go to **Settings** > **Projects** > **[Your Project]** > **Client Keys (DSN)**
    - Copy the DSN URL (it looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)

#### 6. Set Up Environment Variables

1. In the root folder of the project, create a `.env` file.
2. Add your Firebase configuration and Sentry DSN to the `.env` file:

```bash
# Firebase Realtime Database
VITE_API_URL="https://your-database-url.firebasedatabase.app/"

# Firebase Authentication Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Sentry Configuration
VITE_SENTRY_DSN=your_sentry_dsn_here
```

**Example:**

```bash
VITE_FIREBASE_DATABASE_URL="https://my-task-app-default-rtdb.firebaseio.com/"
VITE_FIREBASE_API_KEY=AIzaSyC-example-key-here
VITE_FIREBASE_AUTH_DOMAIN=my-task-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-task-app
VITE_FIREBASE_STORAGE_BUCKET=my-task-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

#### 7. Install Dependencies

1. Go to terminal in the project root directory.
2. Install required dependency:

```bash
npm install
```

#### 8. Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

---

## Error Monitoring & Performance Tracking

### Sentry Integration

This application uses Sentry for comprehensive error tracking and performance monitoring.

#### Features Included:

-   **Real-time Error Tracking**: Automatic capture of JavaScript errors and exceptions
-   **Performance Monitoring**: Track application performance and loading times
-   **Session Replay**: Record user sessions to debug issues more effectively
-   **User Context**: Automatically associate errors with user information
-   **Custom Error Boundaries**: Graceful error handling with user-friendly fallbacks

#### Error Reporting:

-   All unhandled exceptions are automatically reported to Sentry
-   Firebase authentication and database errors are captured with context
-   User actions and application state are included in error reports
-   Session recordings help debug complex user interactions

#### Monitoring Dashboard:

-   Access your Sentry dashboard at [sentry.io](https://sentry.io)
-   View error trends, performance metrics, and user impact
-   Set up alerts for critical errors or performance degradation
-   Monitor application health across different environments

---

## Authentication Features

### User Registration

-   Users can create new accounts with email and password
-   Display names are automatically set based on email or can be customized

### User Login

-   Secure email/password authentication
-   JWT tokens are automatically managed for API calls
-   Session persistence across browser refreshes

### User Logout

-   Secure logout with proper cleanup
-   All user data and tokens are cleared from local storage

### Protected Routes

-   Tasks are user-specific and protected
-   Authentication state is monitored in real-time
-   Automatic redirect to login for unauthenticated users

---

## Security Notes

-   Firebase configuration values in `.env` are safe to expose in frontend code
-   Actual security is handled through Firebase Security Rules
-   JWT tokens are automatically managed and refreshed by Firebase
-   All authentication state changes are monitored in real-time
-   Sentry automatically filters sensitive data and PII based on configuration

---

## Troubleshooting

### Common Issues

1. **Authentication not working**: Ensure Email/Password is enabled in Firebase Console
2. **Tasks not loading**: Check that Realtime Database URL is correct in `.env`
3. **Build errors**: Make sure all Firebase configuration values are properly set
4. **Login redirect loops**: Verify that authentication hooks are properly implemented
5. **Sentry not capturing errors**:
    - Verify that `VITE_SENTRY_DSN` is correctly set in `.env`
    - Check that Sentry initialization is called before app rendering
    - Ensure the DSN format is correct (starts with `https://`)
6. **Missing error context**: Make sure user context is set after authentication
7. **High error volume in Sentry**: Consider adjusting sample rates in production environment

### Environment Variables

Make sure your `.env` file is in the root directory and all configuration values are correctly copied:

-   Firebase configuration values from the Firebase Console
-   Sentry DSN from your Sentry project settings

### Sentry Configuration

The application is configured with:

-   **Development**: 100% error sampling for comprehensive debugging
-   **Production**: 10% performance sampling to balance monitoring with performance
-   **Session Replay**: 10% of normal sessions, 100% of error sessions
-   **User Context**: Automatically set with Firebase user information
