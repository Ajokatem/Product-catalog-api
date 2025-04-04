
# **Product Catalog API**

This is a simple product catalog API built with **Node.js**, **Express**, and **Sequelize** (ORM) that connects to a **MySQL** database. The API allows users to manage categories and products, with basic CRUD operations. It supports product creation, updating, deletion, and retrieval, along with category management and product variants.

---

## **Technologies Used**
- **Node.js** - Server-side JavaScript runtime.
- **Express.js** - Web framework for Node.js.
- **Sequelize** - Promise-based Node.js ORM for MySQL.
- **MySQL** - Relational database.
- **dotenv** - For managing environment variables.

---

## **Prerequisites**

Before you start, ensure you have the following installed:
- **Node.js** (v14 or above).
- **MySQL** (installed and running).

---

## **Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/Ajokatem/product-catalog-api.git
cd product-catalog-api
```

### **2. Install Dependencies**
Install the required dependencies with npm:
```bash
npm install
```

### **3. Create a .env File**
Copy the contents of the `.env.example` file into a new .env file in the root directory. Update the database credentials as needed.

Example .env:
```properties
MYSQL_HOST=localhost
MYSQL_DB=product_catalog
MYSQL_USER=root
MYSQL_PASSWORD=your_password
PORT=5000
```

### **4. Create the MySQL Database**
Log into MySQL:
```bash
mysql -u root -p
```

Create a new database for the project:
```sql
CREATE DATABASE product_catalog;
```

### **5. Sync the Database**
Run the Sequelize sync script to create the tables:
```bash
node config/sync.js
```

### **6. Start the Server**
Run the server using the following command:
```bash
npm start
```

This will start the API server on `http://localhost:5000`.

---

## **API Endpoints**

### **Categories**

#### 1. **Create a New Category**
- **URL**: `/categories`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
      "name": "Electronics"
    }
    ```
- **Response**:
    ```json
    {
      "id": 1,
      "name": "Electronics"
    }
    ```

#### 2. **Get All Categories**
- **URL**: `/categories`
- **Method**: `GET`
- **Response**:
    ```json
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
    ```

---

### **Products**

#### 1. **Create a New Product**
- **URL**: `/products`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
      "name": "Smartphone",
      "description": "Latest model",
      "price": 799.99,
      "categoryId": 1,
      "stock": 50,
      "discount": 10
    }
    ```
- **Response**:
    ```json
    {
      "id": 1,
      "name": "Smartphone",
      "description": "Latest model",
      "price": 799.99,
      "categoryId": 1,
      "stock": 50,
      "discount": 10
    }
    ```

#### 2. **Get All Products**
- **URL**: `/products`
- **Method**: `GET`
- **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "Smartphone",
        "description": "Latest model",
        "price": 799.99,
        "categoryId": 1,
        "stock": 50,
        "discount": 10
      }
    ]
    ```

#### 3. **Get a Product by ID**
- **URL**: `/products/:id`
- **Method**: `GET`
- **Response**:
    ```json
    {
      "id": 1,
      "name": "Smartphone",
      "description": "Latest model",
      "price": 799.99,
      "categoryId": 1,
      "stock": 50,
      "discount": 10
    }
    ```

#### 4. **Update a Product**
- **URL**: `/products/:id`
- **Method**: `PATCH`
- **Request Body**:
    ```json
    {
      "price": 749.99,
      "stock": 30
    }
    ```
- **Response**:
    ```json
    {
      "id": 1,
      "name": "Smartphone",
      "description": "Latest model",
      "price": 749.99,
      "categoryId": 1,
      "stock": 30,
      "discount": 10
    }
    ```

#### 5. **Delete a Product (Soft Delete)**
- **URL**: `/products/:id`
- **Method**: `DELETE`
- **Response**:
    - **Success**: `204 No Content`.

#### 6. **Get Low Stock Products**
- **URL**: `/products/inventory/low-stock`
- **Method**: `GET`
- **Response**:
    ```json
    [
      {
        "id": 2,
        "name": "T-Shirt",
        "stock": 3
      }
    ]
    ```

#### 7. **Add a Variant to a Product**
- **URL**: `/products/:id/variants`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
      "name": "RAM",
      "value": "16GB"
    }
    ```
- **Response**:
    ```json
    {
      "id": 1,
      "name": "RAM",
      "value": "16GB",
      "productId": 1
    }
    ```

#### 8. **Get All Variants for a Product**
- **URL**: `/products/:id/variants`
- **Method**: `GET`
- **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "RAM",
        "value": "16GB"
      }
    ]
    ```

#### 9. **Delete a Variant**
- **URL**: `/products/:id/variants/:variantId`
- **Method**: `DELETE`
- **Response**:
    - **Success**: `204 No Content`.

---

## **Error Handling**
All error responses follow this structure:
```json
{
  "message": "Error description"
}
```

- **400 Bad Request**: Missing or invalid fields.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Unexpected server errors.

---

## **API Design Overview**
- **RESTful Principles**: Categories and Products are separate entities with their own CRUD operations.
- **Relationships**: Products are associated with Categories using a foreign key (`categoryId`).
- **Soft Delete**: Products are soft-deleted using a `deleted` flag.
- **Sequelize ORM**: Used for efficient database querying and handling.

---

## **Example Workflow**
1. **Create a Category**:
    - `POST /categories` to create a category like "Electronics".
2. **Create a Product**:
    - `POST /products` to create a product under the "Electronics" category.
3. **Get All Products**:
    - `GET /products` to view all available products.
4. **Update a Product**:
    - `PATCH /products/:id` to modify the price or stock of a specific product.
5. **Delete a Product**:
    - `DELETE /products/:id` to mark a product as deleted.

---

Feel free to contribute to the project by forking the repository, creating a branch, and submitting a pull request!