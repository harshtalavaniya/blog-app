const Post=require("../models/postModel");
const Comment=require("../models/commentModel");
exports.createComment=async (req,res)=>{
    try{
        const { post,user,body}=req.body;

        // create comment object
        const comment=new Comment({
            post,user,body
        });
        // save ,create

        const savedComment=await comment.save();

        // find post and add comment in post array
        //$push is update function 
        const updatedPost= await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true} ).populate("comments").exec();
        // populate the comment array with comment document

        res.status(200).json({
            post:updatedPost
        })



    }
    catch(err){
        console.error(err);
        console.log(err)
        res.status(500).json({
            sucess:false,
            data:"internal server error",
            message:err.message,
        })

    }

}
