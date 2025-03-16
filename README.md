# Assignment-5 Full-stack Path-5 -- Backend Code

## 🔗 Links

- [Github Live Link Server Side](https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-monir-ullah)
- [Server Side Link Live Link](https://full-stack-project-assignment-1-server-side.vercel.app/)
- [Client Github Link](https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-client-side-monir-ullah)
- [Client Live Link](https://fullstack-client-side.vercel.app/)
- [Video Link](https://youtu.be/DeRUZp40JDs)

## Overview

Dive into the heart of this repository, where a robust Node.js Express MongoDB API awaits. Originally tailored for streamlining user registration and login processes, the focus is now expanding. Brace yourself for the integration of Full CRUD Operations, enabling a seamless approach to managing the inventory of a cutting-edge smartphone management system.

In this evolving codebase, discover the power of comprehensive CRUD operations, allowing you to effortlessly create, retrieve, update, and delete smartphone records. These enhancements transform the API into a versatile solution, addressing the dynamic demands of modern inventory management.

Embark on an exploration of the newly integrated functionalities, offering a holistic and efficient approach to smartphone inventory management within the realm of this Node.js Express MongoDB API.

## Features

- **Registration:** We can registration a user.
- **Login:** We cam login with correct username and password.
- **Add New Smartphone:** We Can a new smartphone into the inventory with some important info like Operating System, Brand name, price, release date and many more.
- **Full CRUD Operation:** We can create , read, update, delete in four inventory system.
- **Duplicate Smartphone:** We can duplicate a existing Product and edit that product according to our needs.
- **Sell:** Sell button is also added in our application.
- **Stock Out:** If any Product quantity become 0 because of selling that product. This product automatically deleted from the inventory.
- **Filter Product:** We can Filter product based on name,price, storage capacity, etc.
- **Sales History:** We can generate sales history based on date,month,year,week.
- **Export PDF**: We can export PDF for sales history we generated based on date, month, year, week.

## Technology Used

- [x] **Node JS**
- [x] **Express.js**
- [x] **MongoDB (Database)**
- [x] **Mongoose ODM**
- [x] **Day JS:** For handling date easily
- [x] **JSON Web Token**
- [x] **Zod:** For Data Validation

## Getting Started

Follow these steps to get the API up and running:

**Clone the repository:**

First clone the repository in your local server

```bash
   git clonehttps://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-monir-ullah.git
```

Go to the folder

```bash
cd your-repository

```

Install Dependencies (Node.js have to be install in you computer)

```bash
npm install
```

Start the server

`Before write npm run dev. Please don't forget to set .env file and set database connection. `

```bash
npm run dev
```

### .env Variables

```typescript
PORT=
DATABASE_URL=
DEV_ENVIRONMENT=
Salt_Rounds=
SECRET=

```

### One User Login Credential

#### Username: `monirullah`

#### password: `monirullah`

## API Endpoints

All the API will be accessible at `  https://full-stack-project-assignment-1-server-side.vercel.app/`

### 1. User Registration

- Endpoint: `/registration`
- Method: `POST`

### 2. User Login

- Endpoint: `/login`
- Method: `POST`

### 3. Create a Category

- Endpoint: `/add-smartphone`
- Method: `POST`

### 4. Get all Smartphone

- Endpoint: `/get-smartphone`
- Method: `GET`

### 5. Delete One Smartphone

- Endpoint: `/delete-one-smartphone`
- Method: `DELETE`

### 6. Find Single Smartphone

- Endpoint: `/get-single-smartphone`
- Method: `PATCH`

### 7.Bulk Delete Smartphone

- Endpoint: `/bulk-delete-smartphone`
- Method: `DELETE`

### 8. Update One Smartphone

- Endpoint: `/update-smartphone/:id`
- Method: `PUT`

### 8. Sells Management (Take input from admin of quantity sold of a specific product)

- Endpoint: `/sell-management`
- Method: `POST`

### 8. Get Sales History (Based On Date,Month,Week Year, Or any Date Range)

- Endpoint: `/sell-management`
- Method: `GET`

# Conclusion

In conclusion, the backend code for this Full-stack Path-5 project provides a robust and feature-rich Node.js Express MongoDB API for smartphone inventory management. The API facilitates user registration and login processes, along with the seamless integration of Full CRUD Operations for efficient inventory management.

This backend code represents a comprehensive and well-documented solution for smartphone inventory management, showcasing the power of modern web development technologies and best practices. Developers can leverage this codebase to enhance and customize their own applications, contributing to a more efficient and streamlined inventory management system.

## Contact

If you have any questions, feedback, or suggestions, feel free to reach out to us at [mullah725@gmail.com](mailto:mullah725@gmail.com). We appreciate your input and look forward to hearing from you!

# Thank You

Thank you for visiting my repository.

If you have any questions, feedback, or suggestions, please fell free to reach out.

## 🔗 Social Link

- [Monir Ullah](https://www.facebook.com/wpDeveloperMonir)
- [Email Me](mailto:mullah725@gmail.com)
# SmartPOS-Restaurant-Management-System-Backend
