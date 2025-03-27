# Product Catalog API

This is a simple product catalog API built with **Node.js**, **Express**, and **Sequelize** (ORM) that connects to a **MySQL** database. The API allows users to manage categories and products, with basic CRUD operations. It supports product creation, updating, deletion, and retrieval, along with category management.

## Technologies Used
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web framework for Node.js
- **Sequelize** - Promise-based Node.js ORM for MySQL
- **MySQL** - Relational database
- **dotenv** - For managing environment variables

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v14 or above)
- **MySQL** (installed and running)


## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ajokatem/product-catalog-api.git
   cd product-catalog-api
Install dependencies:

Install the required dependencies with npm:

bash
Copy
Edit
npm install
Create a .env file:

Copy the contents of the .env.example file into a new .env file in the root directory. You will need to update the database credentials.

Example .env:

bash
Copy
Edit
MYSQL_HOST=localhost
MYSQL_DB=mydatabase
MYSQL_USER=root
MYSQL_PASSWORD=password
PORT=5000
Create MySQL Database:

Log into MySQL:

bash
Copy
Edit
mysql -u root -p
Create a new database for the project:

sql
Copy
Edit
CREATE DATABASE mydatabase;
Start the server:

Run the server using the following command:

bash
Copy
Edit
npm start
This will start the API server on http://localhost:5000.

Endpoints
Categories
Create a new category
POST /categories
Request body:

json
Copy
Edit
{
  "name": "Electronics"
}
Get all categories
GET /categories
Response:

json
Copy
Edit
[
  {
    "id": 1,
    "name": "Electronics"
  },
  {
    "id": 2,
    "name": "Clothing"
  }
]
Products
Create a new product
POST /products
Request body:

json
Copy
Edit
{
  "name": "Smartphone",
  "description": "Latest model",
  "price": 799.99,
  "categoryId": 1,
  "stock": 50
}
Get all products
GET /products
Response:

json
Copy
Edit
[
  {
    "id": 1,
    "name": "Smartphone",
    "description": "Latest model",
    "price": 799.99,
    "categoryId": 1,
    "stock": 50
  }
]
Get a single product by ID
GET /products/:id
Response:

json
Copy
Edit
{
  "id": 1,
  "name": "Smartphone",
  "description": "Latest model",
  "price": 799.99,
  "categoryId": 1,
  "stock": 50
}
Update a product
PATCH /products/:id
Request body:

json
Copy
Edit
{
  "price": 749.99
}
Delete a product
DELETE /products/:id
No request body is required.

Error Handling
The API has basic error handling. If there’s an error (e.g., missing required fields, product not found), the API will respond with an appropriate HTTP status code and error message.

Example error response:

json
Copy
Edit
{
  "message": "Product not found"
}
Testing
You can test the API using tools like Postman or Insomnia.


Feel free to contribute to the project by forking the repository, creating a branch, and submitting a pull request.


This README provides setup instructions, the technologies used, API endpoints, and error handling information. You can customize it further as needed!