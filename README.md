Product Catalog API

Setup and Installation

Prerequisites

Node.js (v14 or later)

MongoDB (local or cloud instance)

A .env file with the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Installation

Clone the repository:

git clone https://github.com/https://github.com/Ajokatem/Product-catalog-api.git
cd product-catalog-api

Install dependencies:

npm install

Start the server:

npm start

API Documentation

Endpoints

Products

GET /products - Retrieve all products with pagination, filtering, and sorting.

POST /products - Create a new product.

GET /products/:id - Retrieve a product by ID.

PATCH /products/:id - Update a product partially.

DELETE /products/:id - Soft delete a product.

Categories

GET /categories - Retrieve all categories.

POST /categories - Create a new category.

Search & Inventory

GET /search - Search for products by name or description.

GET /inventory/low-stock - Retrieve products with low stock.

Example Requests & Responses

Create a Product

Request:

POST /products
Content-Type: application/json
{
  "name": "Laptop",
  "description": "High-end gaming laptop",
  "price": 1200,
  "category": "Electronics",
  "stock": 10
}

Response:

{
  "_id": "60b8c3f7e1d4fa2b3c4e9a21",
  "name": "Laptop",
  "description": "High-end gaming laptop",
  "price": 1200,
  "category": "Electronics",
  "stock": 10,
  "createdAt": "2025-03-19T12:00:00.000Z",
  "updatedAt": "2025-03-19T12:00:00.000Z"
}

Get All Products with Filtering

Request:

GET /products?page=1&limit=5&category=Electronics&sortBy=price&order=asc

Response:

{
  "total": 50,
  "products": [
    {
      "_id": "60b8c3f7e1d4fa2b3c4e9a21",
      "name": "Laptop",
      "price": 1200,
      "category": "Electronics",
      "stock": 10
    }
  ]
}

Assumptions & Limitations

The API does not support user authentication; it's an open API.

Soft deletion is used for products, meaning they are not removed from the database but marked as deleted: true.

Pagination defaults to 10 items per page if not specified.

Only basic validation is implemented; further validation may be needed in production.