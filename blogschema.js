import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
    blogno: {
        required: true,
        type: Number
    },
    title: String,
    secondary: String,
    body: String
}); 

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;