# Task Management Application

This application is designed to help users manage their tasks efficiently. It integrates with Firebase Realtime Database to store and retrieve tasks dynamically, and includes Firebase Authentication for secure user management.

## Features

-   **User Authentication**: Secure email/password login and registration using Firebase Auth.
-   **Task Management**: Add, edit, and delete tasks with a modern UI.
-   **Task Categorization**: Organize tasks by status (e.g., Active, Completed).
-   **Search Functionality**: Find tasks with customizable filters (e.g., by title or description).
-   **Responsive Design**: Seamless use on all devices.
-   **Real-time Updates**: Tasks sync in real-time across sessions.

---

## Getting Started

Follow the steps below to set up and run the application:

### Prerequisites

Ensure you have the following installed:

1. **Node.js** (v16.x or later) and **npm** (v8.x or later).
2. A Firebase project with Realtime Database and Authentication enabled.

---

### Setup Instructions

#### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project.
3. Enable the **Realtime Database** for the project.

#### 2. Enable Firebase Authentication

1. In your Firebase project, navigate to **Authentication** in the left sidebar.
2. Go to the **"Sign-in method"** tab.
3. Click on **"Email/Password"**.
4. Toggle **"Enable"** for the first option (Email/Password).
5. Click **"Save"**.

#### 3. Get Firebase Configuration

1. In Firebase Console, click the **gear icon** (⚙️) next to "Project Overview".
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

#### 4. Add Sample Tasks to the Database

1. Navigate to the Realtime Database section of your Firebase project.
2. Add a collection (e.g., `tasks`)

#### 5. Set Up Environment Variables

1. In the root folder of the project, create a `.env` file.
2. Add your Firebase configuration to the `.env` file:

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
```

#### 6. Install Dependencies

1. Go to terminal in the project root directory.
2. Install required dependencies:

```bash
npm install
npm install firebase
```

#### 7. Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

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

## Technology Stack

-   **Frontend**: React with TypeScript
-   **State Management**: TanStack Query (React Query)
-   **Authentication**: Firebase Authentication
-   **Database**: Firebase Realtime Database
-   **Styling**: Tailwind CSS (assumed)
-   **Build Tool**: Vite

---

## Security Notes

-   Firebase configuration values in `.env` are safe to expose in frontend code
-   Actual security is handled through Firebase Security Rules
-   JWT tokens are automatically managed and refreshed by Firebase
-   All authentication state changes are monitored in real-time

---

## Troubleshooting

### Common Issues

1. **Authentication not working**: Ensure Email/Password is enabled in Firebase Console
2. **Tasks not loading**: Check that Realtime Database URL is correct in `.env`
3. **Build errors**: Make sure all Firebase configuration values are properly set
4. **Login redirect loops**: Verify that authentication hooks are properly implemented

### Environment Variables

Make sure your `.env` file is in the root directory and all Firebase configuration values are correctly copied from the Firebase Console.
