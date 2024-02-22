const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async(req, res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    console.log(newReview);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
 
 
    await newReview.save();
    await listing.save();
    req.flash("success", " review created");
    res.redirect( `/listings/${listing._id}`);
 }


 module.exports.reviewDelete = async (req, res) =>{
   let{id, reviewId} = req.params;
   let add =  await Listing.findByIdAndUpdate(id, {$pull:{ reviews: reviewId}});
   console.log(add);
   let adds= await Review.findByIdAndDelete(reviewId);
   console.log(adds)
    req.flash("success", " review deleted");
    res.redirect(`/listings/${id}`);
};