# Authentication in MERN Stack with Firebase

This project is a full-stack application built using the MERN stack (MongoDB, Express.js, React, and Node.js) for user authentication and authorization. It utilizes Firebase for authentication via email/password and Google Sign-In. The application includes user registration, login, logout functionalities, and displays a list of users on the home page, fetched using React Query.

## Features

- User registration and login with email and password
- Google Sign-In for authentication
- Authentication state management with Redux
- Fetch and display users on the home page using React Query
- Responsive UI with Tailwind CSS and Shadcn UI

## Technologies Used

- **Frontend**: React, Shadcn UI, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Redux Toolkit, React Query
- **API Requests**: Axios

## Installation

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Farh4nHanz/mern-auth.git
```

### 2. Navigate to the Project Directory

```bash
cd mern-auth
```

### 3. Install Backend Dependencies

Install backend dependencies and start the server:

```bash
npm install
npm run server
```

### 4. Install Frontend Dependencies

Install frontend dependencies, and start the client:

```bash
npm install --prefix frontend
npm run client
```

### 5. Open the application in browser

Open your browser and navigate to `http://localhost:5173` to view the application.

## Configuration

To run the application, ensure you have a .env.local file with the following variables:

```makefile
NODE_ENV=development
PORT=5001

# DB SETUP
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.br1ts1h.mongodb.net/<db_name>

# FRONTEND URL
FRONTEND_URL=http://localhost:5173

# API URL
VITE_API_URL=http://localhost:5001/api/v1

# RESET PASSWORD
VITE_RESET_PASSWORD_REDIRECT=http://localhost:5173/login

# FIREBASE CONFIG
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Note

Make sure to replace placeholders like `your_mongodb_connection_string`, and Firebase configuration values with your actual credentials.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing

Feel free to submit issues, fork the repository, and create pull request. Contributors are welcome!

## Acknowledgments

- **Firebase**: Thank you to Firebase for providing a robust authentication service that simplifies user authentication with various methods, including email/password and social logins like Google. The Firebase Authentication SDK is easy to integrate and offers secure authentication solutions. For more information, visit the [Firebase Documentation](https://firebase.google.com/docs/auth).

- **MongoDB**: A special thanks to MongoDB for offering a flexible NoSQL database solution that allows for easy data storage and retrieval. Its ability to scale and handle large amounts of data makes it a great choice for modern applications. Learn more about MongoDB at [MongoDB Official Site](https://www.mongodb.com/).

- **Express.js**: Acknowledgment to the Express.js framework for Node.js, which provides a minimal and flexible web application framework that makes building APIs straightforward and efficient. It simplifies routing and middleware management, enhancing the overall backend development experience. More details can be found at the [Express.js Documentation](https://expressjs.com/).

- **React**: Thanks to React for being a powerful JavaScript library for building user interfaces. Its component-based architecture allows for the creation of reusable UI components, making the development process more efficient and organized. Explore more about React at the [React Official Site](https://reactjs.org/).

- **Redux Toolkit**: Acknowledgment to Redux Toolkit for providing a standardized way to write Redux logic. It simplifies state management and helps manage application state effectively, especially in larger applications. For more information, check out the [Redux Toolkit Documentation](https://redux-toolkit.js.org/).

- **Tailwind CSS**: Thanks to Tailwind CSS for offering a utility-first CSS framework that enables rapid UI development with a focus on responsiveness and customization. Its utility classes make it easy to build modern designs without leaving your HTML. Learn more about Tailwind CSS at the [Tailwind CSS Official Site](https://tailwindcss.com/).

- **Shadcn UI**: Acknowledgment to Shadcn UI for providing a set of components that integrate well with Tailwind CSS, allowing for the creation of beautiful and functional user interfaces. Check out their documentation for more details on how to use their components effectively. [Shadcn UI Documentation](https://ui.shadcn.com/)

- **React Query**: Thank you to React Query for providing powerful tools for fetching, caching, and synchronizing server state in React applications. It simplifies data fetching and improves the user experience by managing server state seamlessly. For more information, visit the [React Query Documentation](https://react-query.tanstack.com/).

This project is built on the shoulders of these amazing tools and libraries, which significantly enhance the development process and user experience.
