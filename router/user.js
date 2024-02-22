const express= require("express");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const router = express.Router();
const usercontroller = require("../controllers/user.js");


router.route("/signup")
.get( usercontroller.renderSignupFrom)
.post(wrapAsync( usercontroller.signup));

//login
router.route("/login")
.get(usercontroller.renderLoginFrom)
.post(saveRedirectUrl,
passport.authenticate("local", {failureRedirect: "/login", failureFlash:true}),usercontroller.login), 


router.get("/logout", usercontroller.logout);

module.exports = router;