# Luxe Avenue Admin

The Laravel 12 back office for the Luxe Avenue storefront. It provides protected admin access, catalogue and collection management, WhatsApp order tracking, customer history, store settings, and a public API boundary for the Next.js storefront.

## Local setup

```bash
cd admin
composer install
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve --port=8001
```

Create a MySQL database named `kay_raluxe_admin` in phpMyAdmin first, or run the equivalent SQL:

```sql
CREATE DATABASE kay_raluxe_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

The default local configuration expects XAMPP/phpMyAdmin MySQL on `127.0.0.1:3306` with the `root` user and an empty password. Update `DB_USERNAME` and `DB_PASSWORD` in `.env` if your MySQL credentials are different.

Open `http://127.0.0.1:8001/login`.

Seeded development access:

- Email: `admin@kayraluxe.lb`
- Password: `ChangeMe123!`

Change the seeded password before deploying. The admin uses MySQL, managed through phpMyAdmin, for its catalogue, customers, orders, and settings.

## Admin areas

- `/admin` dashboard metrics, seven-day sales activity, inventory watch, and recent orders
- `/admin/products` product CRUD with prices, sale prices, image uploads, galleries, sizes, colours, stock, and merchandising flags
- `/admin/collections` collection CRUD with publication status and hero image uploads
- `/admin/orders` order search, filtering, detail view, and status workflow
- `/admin/customers` customer profiles and order history
- `/admin/settings` WhatsApp, Instagram, address, delivery, and announcement settings
- `/admin/content` homepage campaigns and every page hero title, description, and image upload

## Storefront API

- `GET /api/products`
- `GET /api/collections`
- `GET /api/settings`
- `GET /api/content`
- `POST /api/orders`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (Bearer token)
- `POST /api/auth/logout` (Bearer token)

The API validates stock, size, colour, quantity, and current pricing before creating an order. Customer accounts use hashed bearer tokens stored in MySQL. Website content images are uploaded to Laravel's public storage. Set the Next.js `NEXT_PUBLIC_ADMIN_API_URL` environment variable to the deployed Laravel API URL plus `/api`, and set Laravel's `FRONTEND_URL` to the deployed storefront origin for CORS.
