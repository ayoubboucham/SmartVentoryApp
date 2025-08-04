# SmartVentoryApp

SmartVentoryApp (Smart + Inventoy) is a full-stack inventory management system built with **.NET9**, **React**, and **SQL Server**.  
It allows you to manage products and categories, track stock levels, and view insightful statistics through modern data visualizations.

## 📦 Tech Stack

### Backend
- ASP.NET Core 9 Web API
- Clean Architecture + CQRS (MediatR)
- Entity Framework Core + SQL Server
- FluentValidation
- xUnit + Moq for unit testing

### Frontend
- React + TypeScript
- Vite + TailwindCSS
- Recharts for statistics and charts

### DevOps
- Docker

## 🚀 Getting Started

### 🛠️ Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## 📂 Project Structure

SmartVentoryApp/
├── SmartVentoryApp # .NET 9 Web API backend
├── SmartVentoryFront # React + Vite + Tailwind frontend
├── SmartventoryApp.Tests Testing
├── docker-compose.yml # Compose file (optional)
└── README.md
![Stats Page](./Screenshots/structure.png)

## 🧪 Run Locally (Development)

### Backend (.NET API)
```bash
cd SmartVentoryApp
dotnet restore
dotnet run
```

### Frontend (React)
```bash
cd SmartVentoryFront
npm install
npm run dev
```

### Docker
```bash
docker-compose up --build
```

## Features
Full CRUD for Products and Categories

Unified design with TailwindCSS

### Statistics Dashboard
Total KPIs:

Total Products

Total Quantity

Total Stock Value


Pie Chart: Products per Category

Bar Chart: Quantity per Category

Bar Chart: Stock Value per Category

All data fetched from the API

### Tests
Unit testing with xUnit and Moq

FluentValidation for input validation

### CORS
CORS is enabled for frontend-backend communication.

## 🖼️ UI Preview
![CRUD Page](./Screenshots/list_product.png)
![CRUD Page](./Screenshots/edit_product.png)
![Stats Page](./Screenshots/dash4.png)
![Stats Page](./Screenshots/dash3.png)
![Stats Page](./Screenshots/dash2.png)
![Stats Page](./Screenshots/dash1.png)
## Author
Developed by Ayoub Boucham 

## Deployment Ready
Both backend and frontend are containerized with Docker.
Use Docker Compose for seamless full-stack deployment.

## License

This project is licensed under the [MIT License] — free to use, modify, and distribute.
