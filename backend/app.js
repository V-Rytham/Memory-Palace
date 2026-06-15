import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors"
import palaceRouter from "./routes/palace.routes.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
connectDB();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors({
    origin:process.env.APP_FRONTEND,
    credentials:true
}));
app.use(express.json())
app.use(cookieParser())
app.get("/health", (req, res) => {
    res.status(200).json({message:'Health point. API is working correctly...'})
})
app.use("/api/auth", authRouter);
app.use("/api/palace", palaceRouter);
app.get("/", (req, res) => {
    res.send(`API running...`);
})
app.use((req,res)=>{

    res.status(404).json({

        message:"Route not found"

    })

});
app.listen(port, () => {
    console.log(`App is listening at port ${port}`)
})