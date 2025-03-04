/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DATABASE_URL: string;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    DB_USERNAME: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  DB_PASSWORD: envVars.DB_PASSWORD,
  DB_NAME: envVars.DB_NAME,
  DB_HOST: envVars.DB_HOST,
  DB_PORT: envVars.DB_PORT,
  DB_USERNAME: envVars.DB_USERNAME,
  DATABASE_URL: envVars.DATABASE_URL,
  natsServers: envVars.NATS_SERVERS,
};
