# Chat App

This is a fully functional chat application built with modern web technologies. Made using **Next.js**, **Convex**, **Clerk**, and **Shadcn with Tailwind CSS**. 
The app is deployed and accessible [here](https://chat-app-zelo.vercel.app/conversations).

## Features

- **Real-time Messaging**: Powered by Convex, providing seamless and scalable real-time chat.
- **User Authentication**: Secure and user-friendly authentication using Clerk.
- **Modern UI/UX**: Responsive and aesthetically pleasing design with Shadcn and Tailwind CSS.

## Tech Stack

- **Next.js**: The React framework for building fast, server-rendered React applications.
- **Convex**: Backend as a service (BaaS) for real-time, serverless data management.
- **Clerk**: Complete user management with authentication, registration, and profile management.
- **Shadcn with Tailwind CSS**: A combination of utility-first CSS (Tailwind) with a component-first design system (Shadcn) for a modern, clean, and responsive UI.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Le-Wolfie/chat-app.git
   cd chat-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root of the project and add your environment variables (e.g., API keys for Convex, Clerk, etc.).

   ```plaintext
   NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
   NEXT_PUBLIC_CONVEX_URL=your-convex-url
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
