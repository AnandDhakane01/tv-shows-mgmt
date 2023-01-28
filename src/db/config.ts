import { DataSourceOptions } from "typeorm";
import { Shows } from "../entities/shows.js";
import dotenv from "dotenv";
import { Users } from "../entities/users.js";

dotenv.config();

export default {
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Shows, Users],
} as DataSourceOptions;
