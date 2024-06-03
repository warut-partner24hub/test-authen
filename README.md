# Next.js Authentication Project

This project is a Next.js application that includes authentication functionality. It uses NextAuth.js for handling authentication, React Hook Form for form management, Zod for schema validation, and Tailwind CSS for styling. The application includes features such as user registration, login, and form validation.

## Table of Contents

- [Next.js Authentication Project](#nextjs-authentication-project)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Register](#register)
    - [Login](#login)
  - [Testing](#testing)
  - [Technologies Used](#technologies-used)

## Features

- User registration with form validation
- User login with error handling
- Protected routes using NextAuth.js
- Styled with Tailwind CSS
- Form validation using Zod
- Password strength validation using zxcvbn

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/nextjs-authentication.git
    cd nextjs-authentication
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    DATABASE_URL=your-database-url
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-nextauth-secret
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

This application includes two main pages for authentication:

- **Register**: Allows users to create a new account.
- **Login**: Allows users to log in to their account.

### Register

The registration form includes fields for first name, last name, email, password, and confirm password. Form validation is implemented to ensure that all fields are filled correctly.

### Login

The login form includes fields for email and password. If the credentials are incorrect, an error message is displayed.

## Testing

To run tests for this project, use the following command:

```bash
npm run test
```

Tests are written using Jest and React Testing Library to ensure the correctness of the components and functionality.

## Technologies Used

- Next.js
- NextAuth.js
- React Hook Form
- Zod
- Tailwind CSS
- Jest
- React Testing Library
