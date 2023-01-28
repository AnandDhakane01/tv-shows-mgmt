import { Application } from "express";
import { DataSource } from "typeorm";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import dotenv from "dotenv";
import config from "./db/config.js";

dotenv.config();

const port = 5000;
const app: Application = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "*" }));
// app.use(express.urlencoded({ encoded: true }));

// DB connection
const AppDataSource = new DataSource(config);
(async () => {
  try {
    await AppDataSource.initialize();
    console.log("connected to DB!");
  } catch (err) {
    console.error("connected to DB");
  }
})();

app.use("/", routes);

// app listen
try {
  app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}

export default AppDataSource;
