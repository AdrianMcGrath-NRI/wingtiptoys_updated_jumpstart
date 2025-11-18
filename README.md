# WingtipToys - Modern E-Commerce Platform

A modernized version of the Microsoft WingtipToys sample application, rebuilt using:
- **Backend**: .NET 8 REST Web API with Swagger/OpenAPI
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: EF Core + SQL Server
- **Authentication**: ASP.NET Identity + JWT
- **State Management**: React Query + Context API

## 📋 Prerequisites

- .NET 8 SDK
- Node.js 18+ (LTS)
- SQL Server (or SQL Server in Docker)
- Git

## 🚀 Getting Started

### Option 1: Using GitHub Codespaces

1. Open this repository in GitHub Codespaces
2. The dev container will automatically set up the environment
3. Skip to the "Running the Application" section

### Option 2: Local Development

#### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/wingtiptoys_updated_jumpstart.git
cd wingtiptoys_updated_jumpstart
```

#### 2. Set Up the Database

##### Using Docker (Recommended)

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrong@Passw0rd" \
   -p 1433:1433 --name sql-server --hostname sql-server \
   -d mcr.microsoft.com/mssql/server:2022-latest
```

##### Using Local SQL Server

Update the connection string in `src/WingtipToys.Api/appsettings.json` to match your SQL Server instance.

#### 3. Set Up the Backend

```bash
cd src/WingtipToys.Api

# Restore packages
dotnet restore

# Run migrations
dotnet ef database update

# Build the project
dotnet build

# Run the API
dotnet run
```

The API will be available at `https://localhost:5000` (or `http://localhost:5001`)

**API Documentation (Swagger)**: Navigate to `https://localhost:5000/swagger` once the API is running.

#### 4. Set Up the Frontend

```bash
cd src/WingtipToys.Frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env if your API runs on a different port

# Run the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
.
├── src/
│   ├── WingtipToys.Api/          # .NET 8 Web API
│   │   ├── Controllers/           # API endpoints
│   │   ├── Data/                  # EF Core DbContext & initializers
│   │   ├── DTOs/                  # Data transfer objects
│   │   ├── Models/                # Domain models
│   │   ├── Services/              # Business logic services
│   │   └── Migrations/            # EF Core migrations
│   │
│   └── WingtipToys.Frontend/      # React TypeScript app
│       ├── src/
│       │   ├── api/               # API client services
│       │   ├── components/        # Reusable React components
│       │   ├── contexts/          # React Context providers
│       │   ├── pages/             # Page components
│       │   ├── types/             # TypeScript type definitions
│       │   └── hooks/             # Custom React hooks
│       └── public/                # Static assets
│
├── tests/
│   ├── WingtipToys.Api.Tests/     # Backend unit tests
│   └── WingtipToys.Frontend.Tests/ # Frontend unit tests
│
└── .devcontainer/                 # GitHub Codespaces configuration
```

## 🔑 Key Features

### Backend (API)

- ✅ RESTful API with Swagger/OpenAPI documentation
- ✅ Entity Framework Core with SQL Server
- ✅ Database migrations and seed data
- ✅ ASP.NET Identity for user management
- ✅ JWT authentication
- ✅ CORS configuration for frontend
- ✅ Structured with controllers, services, and DTOs

### Frontend

- ✅ Modern React with TypeScript
- ✅ Tailwind CSS for styling
- ✅ React Router for navigation
- ✅ React Query for server state management
- ✅ Context API for authentication and cart state
- ✅ Axios for API communication
- ✅ ESLint + Prettier for code quality

## 📝 Available Scripts

### Backend

```bash
cd src/WingtipToys.Api

# Build the project
dotnet build

# Run the API
dotnet run

# Run tests
dotnet test

# Create a new migration
dotnet ef migrations add MigrationName

# Apply migrations
dotnet ef database update

# Remove last migration
dotnet ef migrations remove
```

### Frontend

```bash
cd src/WingtipToys.Frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code
npm run format
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Register**: POST `/api/auth/register` with username, email, and password
2. **Login**: POST `/api/auth/login` with username and password
3. **Token**: Include the received token in the Authorization header: `Bearer {token}`

## 🗄️ Database Schema

The application includes the following main entities:

- **Products**: Store products with name, description, price, and category
- **Categories**: Product categories (Cars, Planes, Trucks, Boats, Rockets)
- **Orders**: Customer orders with shipping information
- **OrderDetails**: Line items for orders
- **CartItems**: Shopping cart items (session-based)
- **AspNetUsers**: User accounts (via ASP.NET Identity)

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Products
- `GET /api/products` - Get all products (optional: `?categoryId=1`)
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/{id}` - Update a product
- `DELETE /api/products/{id}` - Delete a product

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID

### Cart
- `GET /api/cart/{cartId}` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{itemId}` - Update cart item
- `DELETE /api/cart/{itemId}` - Remove item from cart
- `DELETE /api/cart/clear/{cartId}` - Clear cart

### Orders (Requires Authentication)
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create a new order

## 🧪 Testing

### Backend Tests

```bash
cd tests/WingtipToys.Api.Tests
dotnet test
```

### Frontend Tests

```bash
cd tests/WingtipToys.Frontend.Tests
npm test
```

## 🐳 Docker Support

Build and run with Docker:

```bash
# Backend
docker build -t wingtiptoys-api -f src/WingtipToys.Api/Dockerfile .
docker run -p 5000:80 wingtiptoys-api

# Frontend
docker build -t wingtiptoys-frontend -f src/WingtipToys.Frontend/Dockerfile .
docker run -p 3000:80 wingtiptoys-frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Original WingtipToys application by Microsoft
- corn-mendoza's version of the WingtipToys repository
