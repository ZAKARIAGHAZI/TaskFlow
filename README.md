# Task Flow

<p align="center>
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
  </a>
</p>

**Task Flow** is a modern task management application built with [Laravel](https://laravel.com/) (backend) and [React](https://react.dev/) (frontend, via Inertia.js).  
It uses [Breeze](https://laravel.com/docs/starter-kits#breeze) for authentication and [Laratrust](https://laratrust.santigarcor.me/) for roles and permissions.

---

## Features

- User authentication (Laravel Breeze)
- Role and permission management (Laratrust)
- Create, edit, assign, and delete tasks
- Dashboard with task statistics and charts
- Responsive design for desktop and mobile
- User management (admin only)
- Real-time feedback with flash messages

---

## Tech Stack

- **Backend:** Laravel 10+, Breeze, Laratrust
- **Frontend:** React, Inertia.js, Tailwind CSS
- **Charts:** Chart.js
- **Icons:** [Heroicons](https://heroicons.com/) (`@heroicons/react`)

---

## Getting Started

### Prerequisites

- PHP >= 8.1
- Composer
- Node.js & npm
- A database (MySQL, PostgreSQL, etc.)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/task-flow.git
    cd task-flow
    ```

2. **Install PHP dependencies:**
    ```bash
    composer install
    ```

3. **Install JavaScript dependencies:**
    ```bash
    npm install
    ```

4. **Copy and configure your environment:**
    ```bash
    cp .env.example .env
    # Edit .env and set your database credentials
    ```

5. **Generate application key:**
    ```bash
    php artisan key:generate
    ```

6. **Install and configure Breeze:**
    ```bash
    php artisan breeze:install react
    npm install && npm run dev
    php artisan migrate
    ```

7. **Install and configure Laratrust:**
    ```bash
    composer require santigarcor/laratrust
    php artisan laratrust:setup
    php artisan migrate
    ```

8. **(Optional) Seed roles and permissions:**
    ```bash
    php artisan db:seed
    ```

9. **Build frontend assets:**
    ```bash
    npm run build
    # For development, use: npm run dev
    ```

10. **Start the development server:**
    ```bash
    php artisan serve
    ```

---

## Usage

- Register a new user or log in as an admin.
- Create, assign, and manage tasks from the dashboard.
- Admins can manage users and assign roles.

---


## Credits

- [Laravel](https://laravel.com/)
- [Breeze](https://laravel.com/docs/starter-kits#breeze)
- [Laratrust](https://laratrust.santigarcor.me/)
- [React](https://react.dev/)
- [Inertia.js](https://inertiajs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [Heroicons](https://heroicons.com/)

---

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---

**Happy task managing!**
