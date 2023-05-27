const Post=require("../models/postModel");
const Comment=require("../models/commentModel");
const Like=require("../models/likeModel");

exports.createPost=async(req,res)=>{
    try{
        const{title,body}=req.body;
        const post= new Post({
            title,body
        });
        const savePost=await post.save();
        res.status(200).json({
            post:savePost,
            message:"create post sucessfully"
        })


    }catch(err){
        console.error(err);
        console.log(err)
        res.status(500).json({
            sucess:false,
            data:"internal server error",
            message:err.message,
        })

    }
};

exports.getAllPost=async (req,res)=>{
    try{
        const posts=await Post.find().populate("likes").populate("comments").exec();
        res.status(200).json({
            post:posts,
            message:"get all post sucessfully"
        });


    }catch(err){
        console.error(err);
        console.log(err)
        res.status(500).json({
            sucess:false,
            data:"internal server error",
            message:err.message,
        })
        
    }
    
}
