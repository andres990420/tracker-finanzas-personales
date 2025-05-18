import express from "express";
import dotenv from "dotenv";
import configureDI from "./config/diContainer.ts";
import initBudgetModule  from "./modules/Budgets/BudgetModule.ts";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const container = configureDI();

initBudgetModule(app, container);

app.listen(PORT, () => console.log("listening port:", PORT));
