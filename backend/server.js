import express from "express" ;
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";
import cors from "cors";
import connectMongoDB from "./db/connectMongoDB.js";
import "./passport/github.auth.js";
import passport from "passport";
import session from "express-session"
import authRoutes from "./routes/auth.route.js";

const app = express();

dotenv.config();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Allow cookies or authorization headers to be sent
  }));

app.get("/",(req,res)=>{
    res.send("Server is ready")
})

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/auth", authRoutes);



app.listen(5000,()=>{
    console.log("Server started on http://localhost:5000");
    connectMongoDB();
})


