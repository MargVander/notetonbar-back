require('dotenv/config');

const host = {
  dev: 'localhost',
  production: process.env.HOST_ENV,
};

const port = {
  dev: 3306,
  production: 3309,
};

const username = {
  dev: 'root',
  production: process.env.USERNAME_ENV,
};

const password = {
  dev: 'root',
  production: process.env.PASSWORD_ENV,
};

module.exports = {
  type: 'mysql',
  host: host[process.env.NODE_ENV],
  port: port[process.env.NODE_ENV],
  username: username[process.env.NODE_ENV],
  password: password[process.env.NODE_ENV],
  database: 'notetonbar',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
