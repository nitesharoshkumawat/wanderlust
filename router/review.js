const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js")


//post REVEIW rout

router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
 

 //post review delete rout
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor ,wrapAsync(reviewController.reviewDelete));
 
 module.exports= router;