# Archive Management System

A Laravel + React web application for physical archive management with hierarchical storage structure.

## Features

### Backend (Laravel)
- **Models & Migrations**: Complete database structure for `Archive`, `Shelf`, `Rack`, `Column`, and `User`
- **Hierarchical Relationships**: Archive → Column → Rack → Shelf
- **Authentication**: Laravel Breeze with role-based access control
- **Authorization**: Admin and User roles with different permissions
- **RESTful API**: Full CRUD operations for all entities

### Frontend (React + Inertia.js)
- **Dashboard**: Hierarchical view of storage structure with expandable sections
- **Archive Management**: Create, edit, view, and delete archive entries
- **Storage Management**: Admin-only access to create/edit shelves, racks, and columns
- **Responsive Design**: Modern UI with Tailwind CSS
- **Role-based UI**: Different actions available based on user role

### Security & Access Control
- **Admin Role**: Can create/delete shelves, racks, columns, and manage all archives
- **User Role**: Can view storage structure and manage archives (create, edit, view)
- **Protected Routes**: Middleware-based access control
- **Form Validation**: Server-side validation for all inputs

## Database Structure

```
User (id, name, email, password, role)
├── Shelf (id, name, location_description)
    ├── Rack (id, name, shelf_id)
        ├── Column (id, name, rack_id)
            └── Archive (id, title, reference_code, date_archived, status, column_id)
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd archiveapp
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Build frontend assets**
   ```bash
   npm run build
   ```

7. **Start the development server**
   ```bash
   php artisan serve
   ```

## Default Users

After running the seeder, you can log in with:

- **Admin User**: `admin@example.com` / `password`
- **Regular User**: `user@example.com` / `password`

## Usage

### Dashboard
- View the complete storage hierarchy
- Expand/collapse sections to see details
- Quick action buttons for common tasks

### Archive Management
- **Create**: Add new archive entries with location assignment
- **Edit**: Modify archive details and move between locations
- **View**: Detailed view with full location path
- **List**: Table view with filtering and sorting

### Storage Management (Admin Only)
- **Shelves**: Create and manage storage shelves
- **Racks**: Organize racks within shelves
- **Columns**: Set up columns within racks

## API Endpoints

### Archives
- `GET /archives` - List all archives
- `GET /archives/create` - Create form
- `POST /archives` - Store new archive
- `GET /archives/{id}` - Show archive details
- `GET /archives/{id}/edit` - Edit form
- `PUT /archives/{id}` - Update archive
- `DELETE /archives/{id}` - Delete archive

### Shelves (Admin Only)
- `GET /shelves` - List all shelves
- `GET /shelves/create` - Create form
- `POST /shelves` - Store new shelf
- `GET /shelves/{id}` - Show shelf details
- `GET /shelves/{id}/edit` - Edit form
- `PUT /shelves/{id}` - Update shelf
- `DELETE /shelves/{id}` - Delete shelf

### Racks (Admin Only)
- `GET /racks` - List all racks
- `GET /racks/create` - Create form
- `POST /racks` - Store new rack
- `GET /racks/{id}` - Show rack details
- `GET /racks/{id}/edit` - Edit form
- `PUT /racks/{id}` - Update rack
- `DELETE /racks/{id}` - Delete rack

### Columns (Admin Only)
- `GET /columns` - List all columns
- `GET /columns/create` - Create form
- `POST /columns` - Store new column
- `GET /columns/{id}` - Show column details
- `GET /columns/{id}/edit` - Edit form
- `PUT /columns/{id}` - Update column
- `DELETE /columns/{id}` - Delete column

## Technology Stack

- **Backend**: Laravel 12, PHP 8.2+
- **Frontend**: React 18, Inertia.js, Tailwind CSS
- **Database**: SQLite (default), supports MySQL/PostgreSQL
- **Authentication**: Laravel Breeze
- **Build Tool**: Vite

## Future Enhancements

- [ ] Search and filtering functionality
- [ ] Archive movement history tracking
- [ ] Real-time visualization with grid layout
- [ ] Bulk operations for archives
- [ ] Export/import functionality
- [ ] Advanced reporting and analytics
- [ ] Barcode/QR code integration
- [ ] Mobile-responsive improvements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
