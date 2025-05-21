import express from "express";
import dotenv from "dotenv";
import configureDI from "./config/diContainer.ts";
import initBudgetModule from "./modules/Budgets/budgetModule.ts";
import connect from "./db/db_connection.ts";
import initUserModule from "./modules/User/userModule.ts";
import passport from "passport";
import session from "express-session"
import "./config/passport.ts"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true

}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next)=>{
  res.locals.user = req.user || null
  next()
})

await connect();

const container = configureDI();

initBudgetModule(app, container);
initUserModule(app, container);

app.listen(PORT, () => console.log("listening port:", PORT));
