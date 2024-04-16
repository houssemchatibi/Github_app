import express from "express" ;
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import cors from "cors";

const app = express();

dotenv.config();
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Server is ready")
})


app.use("/api/users", userRoutes);


app.listen(5000,()=>{
    console.log("Server started on http://localhost:5000");
})

