const sequelize = require('../config/database');
const Contact = require('./contact');

const db = { sequelize, Contact };

module.exports = db;
