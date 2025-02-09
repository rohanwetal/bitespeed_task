# 🚀 PostgreSQL + Sequelize ORM Setup

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

Welcome to the **PostgreSQL + Sequelize** setup guide! This project provides a clean and efficient boilerplate for integrating **PostgreSQL** with **Sequelize ORM** in a Node.js environment. 🚀

---

## 📌 Features
✅ **PostgreSQL Setup** - Easily connect to a PostgreSQL database  
✅ **Sequelize ORM** - Manage your database schema with ease  
✅ **Environment Variables** - Secure database credentials using `.env`  
✅ **Minimalist Code** - Clean and structured architecture  
✅ **Scalable & Secure** - Designed for real-world applications  

---

## 📂 Folder Structure
```
📦 project-folder
 ┣ 📂 src
 ┃ ┣ 📂 config
 ┃ ┃ ┗ 📜 database.js  # Sequelize configuration
 ┃ ┣ 📂 models
 ┃ ┃ ┗ 📜 user.js       # Example Sequelize model
 ┃ ┣ 📂 controllers
 ┃ ┃ ┗ 📜 userController.js  # Example API controller
 ┃ ┗ 📂 routes
 ┃ ┃ ┗ 📜 userRoutes.js  # Express routes
 ┣ 📜 .env              # Environment variables
 ┣ 📜 package.json      # Project dependencies
 ┣ 📜 README.md         # This cool README 😎
```

---

## 🛠 Installation & Setup

### 1️⃣ Install PostgreSQL
- **Windows:** Download and install from [PostgreSQL official site](https://www.postgresql.org/download/windows/)
- **Mac:** Install via Homebrew:
  ```sh
  brew install postgresql
  ```
- **Linux (Ubuntu/Debian):**
  ```sh
  sudo apt update
  sudo apt install postgresql postgresql-contrib
  ```

### 2️⃣ Setup the Database
```sql
CREATE DATABASE bitespeed;
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE bitespeed TO myuser;
```

### 3️⃣ Clone & Install Dependencies
```sh
git clone https://github.com/your-username/project-folder.git
cd project-folder
npm install
```

### 4️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```ini
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
DB_NAME=bitespeed
DB_PORT=5432
```

### 5️⃣ Run the Application
```sh
node src/config/database.js
```
✅ If everything is set up correctly, you should see:
```
Database connected
```

---

## 📌 Sequelize Model Example
Here’s how to define a `User` model:
```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = User;
```

---

## 📌 API Route Example
Here’s a basic API route using **Express.js**:
```js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;
```

---

## 🤝 Contributing
Feel free to fork this repository, submit issues, or contribute improvements! 🚀

---

## 💡 Author
👨‍💻 **Your Name**  
📧 **your.email@example.com**  
🔗 [GitHub](https://github.com/your-username) | [LinkedIn](https://www.linkedin.com/in/your-profile)

