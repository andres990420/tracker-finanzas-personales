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
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
// app.use(passport.initialize());
// app.use(passport.session());
// app.use((req, res, next)=>{
//    passport.authenticate(
//       "local",
//       async (err: unknown, user: any, info: any) => {
//         if (err) {
//           return next(err);
//         }
//         if (!user) {
//           // Si la autenticación falla, responde con error
//           return res
//             .status(401)
//             .json({ message: info?.message ||  "Credenciales inválidas" });
//         }
//         req.logIn(user, (err: unknown) => {
//           if (err) {
//             return next(err);
//           }
//           // Si la autenticación es exitosa, responde con el usuario o un mensaje de éxito
//           return res
//             .status(200)
//             .json({ message: "Inicio de sesión exitoso", user });
//         });
//       }
//     )(req, res, next);
// })

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
