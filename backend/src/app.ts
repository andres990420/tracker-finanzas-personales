import express from "express";
import dotenv from "dotenv";
import configureDI from "./config/diContainer.ts";
import initBudgetModule from "./modules/Budgets/budgetModule.ts";
import connect from "./db/db_connection.ts";
import initUserModule from "./modules/User/userModule.ts";
import passport from "passport";
import session from "express-session";
import "./modules/User/auth/passportConfig.ts";
import cors from "cors";
import { validateUser } from "./modules/User/auth/userAuth.ts";
import initTransactionModule from "./modules/Movements/transactionModule.ts";
import "./common/mediator.ts";
import { initCategoryModule } from "./modules/Category/categoryModule.ts";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

await connect();

const container = configureDI();

initBudgetModule(app, container);
initCategoryModule(container);
initUserModule(app, container);
initTransactionModule(app, container);

app.listen(PORT, () => console.log("listening port:", PORT));
