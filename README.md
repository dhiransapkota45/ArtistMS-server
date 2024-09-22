# Backend Application for Artist Management System

This is a Node.js and Express.js backend application that serves as the API for managing artists, music, and users. It uses PostgreSQL as the database and the `pg` driver for database interactions (without any ORM). Key features include JWT authentication and role-based authorization.

## Features

- **Node.js & Express.js**: Core framework for building the API.
- **PostgreSQL**: Database for storing data related to artists, music, and users.
- **JWT Authentication**: Secure token-based authentication.
- **Role-based Authorization**: Restrict access to specific routes based on user roles (e.g., admin, user).
- **pg Driver**: Direct interaction with PostgreSQL using raw SQL queries.

## Database Tables

- **Users**: Stores user information, roles, and authentication details.
- **Artists**: Contains data about various music artists.
- **Music**: Stores information about songs and albums associated with artists.

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js**: >= 16.x
- **PostgreSQL**: Ensure PostgreSQL is installed and running on your system.

### Environment Variables

Create a `.env` file in the root directory of your project by referencing contents provided in .env.example.


### Step-by-step Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/dhiransapkota45/ArtistMS-server.git
    ```

2. **Install dependencies**:

    Navigate to the project directory and run:

    ```bash
    cd ArtistMS-server
    yarn install
    ```

3. **Set up the PostgreSQL Database**:

    - Create an empty database in PostgreSQL:
    
        ```sql
        CREATE DATABASE newartistms;
        ```

4. **Run Migrations**:

    Run the migration script to set up the necessary database tables:

    ```bash
    yarn run migrate
    ```

5. **Start the Development Server**:

    To start the development environment, run:

    ```bash
    yarn run dev
    ```

6. **Build for Production**:

    To build the application for production, use:

    ```bash
    yarn run build
    ```

    Then, start the production server:

    ```bash
    yarn run start
    ```

## License

This project is licensed under the MIT License.


