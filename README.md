# Chat App

This is a simple web application for chatting, developed as a front-end test task. The app uses Firebase for the backend and React for the frontend.

LIVE: [https://chatt-app-company.netlify.app/](https://chatt-app-company.netlify.app/)

## Features:

- **Real-time Chat**: Simulate real-time chatting with dummy data.
- **Search and Create Private Chat**: Users can search for other users and start private chats with them.
- **Joining and Leaving Chat**: Users have the ability to join and leave chats at any time.
- **Chat Security**: If a user isn't part of a chat, they can't see any content except the name of the chat.
- **Registration with Email and Password**: Users can register for the app using their email and password.
- **Responsive Design**: The app features a responsive design

## Architecture:

- **Custom Hooks**: Custom hooks are used throughout the project to encapsulate and reuse logic. Also custom hooks make code cleaner and more maintainable.
- **Debouncing**: Debouncing is implemented for the search functionality. The user search begins 1 second after the last character is typed, optimizing the search performance and reducing unnecessary API calls.
- **Messages and Load More**: Only the latest 50 messages are fetched when the user logs in. If the user wants to read more messages, they can load additional messages incrementally.
- **Context API**: After considering Redux Toolkit, React Query, and Context API, Context API was chosen as it is a perfect fit for this app. The app state is relatively simple, and while Redux is powerful, setting up actions, reducers, and middleware in Redux might add unnecessary complexity for the app's needs.
- **Rate Limit Messages**: The app includes a rate limit on messages to prevent spamming.

## Installation:

1.  Clone this repository or download the project files.
2.  Install dependencies using npm or yarn:
    `npm install`

3.  Set up Firebase:

- Create a Firebase project at Firebase Console.
- Add your Firebase configuration in a `.env` file:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id`
```

4. Run the application:
   `npm run dev`
