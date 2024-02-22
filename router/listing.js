const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const  {isLoggedIn, isOwner, validateListing} = require("../middleware");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig");
const upload = multer({ storage });



router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync (listingController.createListing));


//new rout
router.get("/new",isLoggedIn, listingController.renderNewForm );


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing,wrapAsync(listingController.updateListing ))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing))

// edit rout
router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;