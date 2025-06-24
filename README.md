# Task Management Application

This application is designed to help users manage their tasks efficiently. It integrates with Firebase Realtime Database to store and retrieve tasks dynamically.

## Features

-   Task categorization by status (e.g., Active, Completed).
-   Search functionality with customizable filters (e.g., by title or description).
-   Add, edit, and delete tasks with a modern UI.
-   Responsive design for seamless use on all devices.

---

## Getting Started

Follow the steps below to set up and run the application:

### Prerequisites

Ensure you have the following installed:

1. **Node.js** (v16.x or later) and **npm** (v8.x or later).
2. A Firebase project with a Realtime Database.

---

### Setup Instructions

#### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project.
3. Enable the **Realtime Database** for the project.

#### 2. Add Sample Tasks to the Database

1. Navigate to the Realtime Database section of your Firebase project.
2. Add a collection (e.g., `tasks`)

#### 3. Set Up Environment Variables

1. In the root folder of the project, create a .env file.
2. Copy the Firebase Realtime Database URL and add it to the .env file as shown: VITE_API_URL="https://your-database-url.firebasedatabase.app/"

#### 4. Running the Application

1. Go to terminal
2. Install dependencies: npm install
3. Start the development server: npm run dev
