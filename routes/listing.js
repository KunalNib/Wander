const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const mongoose=require("mongoose");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage})


router.get("/search", wrapAsync(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.redirect("/listings");
  }

  const regex = new RegExp(q, "i");
  const allListings = await Listing.find({
    $or: [
      { title: regex },
      { description: regex },
      { location: regex }
    ]
  });

  res.render("listings", { allListings, query: q });
}));

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("image"),validateListing,wrapAsync(listingController.newPostRoute));



//New Route
router.get("/new",isLoggedIn,listingController.newRoute,);


router
.route("/:id")
.get(wrapAsync(listingController.showRoute))
.put(isLoggedIn,isOwner,upload.single("image"),validateListing,wrapAsync(listingController.putEdit))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))


//edit & update routes
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.getEdit))


//Show Route




module.exports=router;