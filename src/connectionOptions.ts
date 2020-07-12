import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

const dotenvConfigOutput = dotenv.config();
if (dotenvConfigOutput.error) {
  console.error(dotenvConfigOutput.error);
  process.exit(1);
}

const envVars = dotenvConfigOutput.parsed!;
console.log(envVars);

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: envVars.POSTGRES_HOST,
  port: Number.parseInt(envVars.POSTGRES_PORT, 10),
  username: envVars.POSTGRES_USER,
  password: envVars.POSTGRES_PASSWORD,
  database: envVars.POSTGRES_DB,
  synchronize: true,
  logging: 'all',
  logger: 'debug',
};

export { connectionOptions };
