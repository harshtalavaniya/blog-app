const express=require("express");
const app=express();
const dbConnect=require("D:/Blogapp/config/database");

app.use(express.json())
require("dotenv").config();
const PORT=process.env.PORT || 5000;

const blogRoutes=require("D:/Blogapp/routes/blog")

app.use("/api/v1",blogRoutes);

app.listen(PORT,()=>{
    console.log("run server on",PORT);
});

dbConnect();

app.get("/",(req,res)=>{
    res.send("hello");
})

