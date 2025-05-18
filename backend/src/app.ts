import express from "express";
import dotenv from "dotenv";
import configureDI from "./config/diContainer.ts";
import initBudgetModule  from "./modules/Budgets/BudgetModule.ts";
import connect from "./db/db_connection.ts";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

await connect();

const container = configureDI();

initBudgetModule(app, container);

app.listen(PORT, () => console.log("listening port:", PORT));
