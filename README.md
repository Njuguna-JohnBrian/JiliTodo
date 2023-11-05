# Node.js Todo Application with Authentication and Role-Based Access Control

![Node.js](https://img.shields.io/badge/Node.js-14.0+-green.svg)
![Express](https://img.shields.io/badge/Express-4.17+-blue.svg)
![Knex](https://img.shields.io/badge/Knex-0.95+-orange.svg)
![Express Validator](https://img.shields.io/badge/Express%20Validator-6.9+-purple.svg)
![Angular](https://img.shields.io/badge/Angular-v17.0+-red.svg)

This is a feature-rich, secure, and scalable Node.js todo application built with Express and Knex, complete with user authentication using cookies and role-based access control. It allows you to create, manage, and organize your tasks efficiently, all within a responsive web application. The frontend is developed using Angular v17, making use of the latest Angular features, including signals.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Authentication and Roles](#authentication-and-roles)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with secure cookie-based sessions
- Role-based access control (admin, user, etc.) to manage user permissions
- Create, edit, and delete tasks with validation using Express Validator
- Organize tasks by categories and prioritize them
- Intuitive user interface with real-time updates
- Secure API endpoints with proper validation
- Data storage and retrieval with Knex and a PostgreSQL database
- Modern and responsive frontend built with Angular v17, utilizing the latest features including signals.

## Getting Started

1. Clone the repository:

    ```shell
    git clone https://github.com/Njuguna-JohnBrian/JiliTodo
    ```

2. Install dependencies:

    ```shell
    npm install
    ```

3. Set up your database configuration in `backend/database/knexfile.js`

4. Run migrations and seed the database:

    ```shell
    npm run migrate && npm run seed
    ```

5. Start the application:

    ```shell
    npm start
    ```

## Usage

- Visit `http://localhost:3000` in your web browser.
- Register an account or log in if you already have one.
- Create, manage, and organize your tasks.
- Admin users can manage roles and permissions.
- Enjoy the seamless todo management experience!

## Authentication and Roles

- Admin Role: Administrators can manage users, roles, and tasks.
- User Role: Regular users can create, edit, and manage their own tasks.

## Contributing

We welcome contributions from the open-source community. Please check out our [contribution guidelines](CONTRIBUTING.md) and feel free to open issues, submit pull requests, or provide feedback.

## License

This project is licensed under the [MIT License](LICENSE).
