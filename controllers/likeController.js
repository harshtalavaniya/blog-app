const Post=require("../models/postModel");
const Like=require("../models/likeModel");
exports.likePost=async (req,res)=>{
    try{
        const { post,user}=req.body;

        // create comment object
        const like=new Like({
            post,user
        });
        // save ,create

        const savedLike=await like.save();

        // find post and add comment in post array
        //$push is update function 
        const updatedPost= await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true} ).populate("likes").exec();
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

exports.unlikePost=async (req,res)=>{
    try{
        const{post,like}=req.body;
        const deleteLike= await Like.findByIdAndDelete({post:post,_id:like})

        // update post 
        const updatedPost= await Post.findByIdAndUpdate(post,{$pull:{likes:deleteLike._id}},{new:true} ).populate("likes").exec();
      
        res.status(200).json({
            post:updatedPost
        })
    } catch(err){
        console.error(err);
        console.log(err)
        res.status(500).json({
            sucess:false,
            data:"internal server error",
            message:err.message,
        })

    }
}