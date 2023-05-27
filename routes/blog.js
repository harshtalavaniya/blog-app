const express=require("express");
const router=express.Router();

const {createComment}=require("../controllers/commentController");
const {likePost,unlikePost}=require("../controllers/likeController");
const {createPost,getAllPost}=require("../controllers/postController");

router.post("/createcomment",createComment);
router.post("/likepost",likePost);
router.post("/unlikepost",unlikePost);
router.post("/createpost",createPost);
router.get("/getallpost",getAllPost);










module.exports=router;