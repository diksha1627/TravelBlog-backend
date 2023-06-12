import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
app.use(cors())
app.use(express.json()); 
app.use("/api/user",router);
app.use("/api/blog",blogRouter);


mongoose.connect(
"mongodb://diksha:Alpha113.@ac-gzpeqd8-shard-00-00.zpie1go.mongodb.net:27017,ac-gzpeqd8-shard-00-01.zpie1go.mongodb.net:27017,ac-gzpeqd8-shard-00-02.zpie1go.mongodb.net:27017/?ssl=true&replicaSet=atlas-mkgko1-shard-0&authSource=admin&retryWrites=true&w=majority").then(()=>{app.listen(5000)
console.log("Connected to Database and Listening to port 5000")}).catch((err)=>console.log(err));
