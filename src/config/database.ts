import { type Options } from 'sequelize';

const configDatabase: Options = {
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  timezone: '+07:00',
};

export default configDatabase;
