const express = require('express');
const sequelize = require('./config/database');
const identifyRoutes = require('./routes/identify');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', identifyRoutes);

sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection failed:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
