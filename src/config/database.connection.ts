import { Sequelize } from 'sequelize';
import configDatabase from './database';

class Database {
  private static instance: Database;
  public sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      ...configDatabase,
      pool: {
        max: 20, // Maximum number of connection in pool
        min: 5, // Minimum number of connection in pool
        acquire: 60000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released
      },
      retry: {
        max: 3, // Maximum amount of times to retry
        timeout: 30000, // Maximum time to wait for a response, in milliseconds
      },
      dialectOptions: {
        connectTimeout: 60000, // Increase connection timeout
        // SSL configuration if needed
        // ssl: {
        //   require: true,
        //   rejectUnauthorized: false
        // }
      },
      logging: false,
      // process.env.NODE_ENV === 'development' ? console.log : false,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log(
        '✅ Database connection has been established successfully.',
      );
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.sequelize.close();
      console.log('Database connection closed successfully');
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }

  public async healthCheck(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const db = Database.getInstance();
export const sequelize = db.sequelize;

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    await db.disconnect();
    process.exit(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    process.exit(1);
  }
});
