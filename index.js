import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import Blog from "./blogschema.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
});


app.get("/article/:blogno", (req, res) => {
    const { blogno } = req.params;

    Blog.find({blogno: blogno}, (err, result) => {
        if (err) {
            console.log("error occurred");
            res.status(400).json(err);
            return;
        } 
        console.log("all goods");
        res.status(200).json(result);
    })
});


app.post("/post", (req, res) => {
    const {blogno, title, secondary, body} = req.body;

    console.log(blogno, title, secondary, body);
    
    const newBlogPost = new Blog({
        blogno: blogno,
        title: title,
        secondary: secondary,
        body: body
    });

    console.log(newBlogPost);

    newBlogPost.save()
    .then((result) => {
        res.status(201).send(result);
        console.log("all goods");
    })
    .catch((error) => {
        console.log("error occurred");
        res.status(400).send(error);
    });
});


const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log("listening on PORT :", PORT);
})


