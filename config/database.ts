// config/database.ts

import { Sequelize } from 'sequelize';
const config = require(__dirname + '/../config/config.json');
const env = process.env.NODE_ENV || 'development';
const { username, password, database, host, dialect } = config[env];

const sequelize = new Sequelize({
    dialect: dialect,
    host: host,
    port: 5432,
    username: username,
    password: password,
    database: database,
});

export { sequelize };
