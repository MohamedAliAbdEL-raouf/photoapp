const photoModel=require('../models/photo/photo.models');
module.exports.addPhoto = async (req,res)=>{
    const {createdBy} = req.body;

    if(req.file){
        await photoModel.insertMany({path:req.file.filename,createdBy});
        res.json({message:"added"});
    }else{
        res.json({message:"image only"});
    }
};

module.exports.getPhoto = async (req,res)=>{
    let PAGE_NUMER = req.query.page;
    if(!PAGE_NUMER||PAGE_NUMER<=0){
        PAGE_NUMER=1;
    };
    let PAGE_LIMIT = 5;
    let skipt = (PAGE_NUMER-1)*PAGE_LIMIT;
    let count = await photoModel.find({}).count()
  let getPhoto = await photoModel.find({}).sort({count:-1}).populate("createdBy up down","name pic_url-_id").skip(skipt).limit(PAGE_LIMIT);
  res.json({pages:Math.ceil((count/PAGE_LIMIT)),page:PAGE_NUMER,getPhoto});

};

module.exports.up = async (req,res)=>{
    const {post_id,createdBy} = req.body;
   let post = await photoModel.findOne({post_id,up:{$in:[createdBy]}}); 
   console.log(post);
   if(post){
    await photoModel.findByIdAndUpdate(post_id, {$inc: {count:-1} ,$pull: {up:createdBy} });
    res.json({message:"dislike"});
   }else{
    await photoModel.findByIdAndUpdate(post_id, {$inc: {count:1} ,$push: {up:createdBy},$pull: {down:createdBy} });
    res.json({message:"like"});
   }

};

module.exports.down = async (req,res)=>{
    const {post_id,createdBy} = req.body;
   let post = await photoModel.findOne({post_id,down:{$in:[createdBy]}}); 
   console.log(post);
   if(post){
    await photoModel.findByIdAndUpdate(post_id, {$inc: {count:1} ,$pull: {down:createdBy}});
    res.json({message:"like"});
   }else{
    await photoModel.findByIdAndUpdate(post_id, {$inc: {count:-1} ,$push: {down:createdBy},$pull: {up:createdBy} });
    res.json({message:"dislike"});
   }
};