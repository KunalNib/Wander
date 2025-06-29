const { model } = require("mongoose");
const Listing=require("../models/listing.js");


module.exports.index=async(req,res,next)=>{
    const allListings= await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}

module.exports.deleteListing=async (req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
}

module.exports.getEdit=async (req,res,next)=>{
    let {id}=req.params;
    let data=await Listing.findById({_id:id});
    if(!data){
        req.flash("error","Listing you requested does not exist");
        return res.redirect("/listings");
    }
    let originalImageUrl=data.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs",{data,originalImageUrl});
}

module.exports.putEdit = async (req, res, next) => {
  try {
    let { id } = req.params;
    const data = req.body;

    const listing = await Listing.findByIdAndUpdate(id, { ...data }, { new: true });

    // Update image if changed
    if (req.file) {
      const url = req.file.path;
      const filename = req.file.filename;
      listing.image = { url, filename };
    }

    // Update coordinates if location or country changed
    const locationQuery = `${data.location}, ${data.country}`;

    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}`, {
      headers: {
        'User-Agent': 'WanderLustApp/1.0 (kunal@example.com)' // Replace with your email/project info
      }
    });

    // Handle non-200 response (like 403, 500, etc.)
    if (!geoRes.ok) {
      const errorText = await geoRes.text();
      console.error("Nominatim error response:", errorText.slice(0, 200));
      req.flash("error", "Failed to update coordinates. Geocoding service error.");
      return res.redirect(`/listings/${id}/edit`);
    }

    let geoData;
    try {
      geoData = await geoRes.json();
    } catch (err) {
      console.error("Nominatim invalid JSON:", err);
      req.flash("error", "Geocoding service returned an invalid response.");
      return res.redirect(`/listings/${id}/edit`);
    }

    if (geoData.length > 0) {
      const lat = parseFloat(geoData[0].lat);
      const lon = parseFloat(geoData[0].lon);
      listing.geometry = {
        type: "Point",
        coordinates: [lon, lat]
      };
    }

    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Error in putEdit route:", err);
    next(err);
  }
};



module.exports.newRoute=(req,res)=>{
    console.log(req.user);
    res.render("./listings/new.ejs");
}


module.exports.newPostRoute = async (req, res, next) => {
  try {
    if (!req.file) {
      req.flash("error", "Image is required");
      return res.redirect("/listings/new");
    }

    const url = req.file.path;
    const filename = req.file.filename;
    const data = req.body;

    // Build location query string
    const locationQuery = `${data.location}, ${data.country}`;

    // Fetch coordinates from Nominatim
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}`, {
  headers: {
    'User-Agent': 'WanderLustApp/1.0 (kunal@example.com)' // ← use your email or project name
  }
});

// Check if response is OK (status 200-299)
if (!geoRes.ok) {
  const errorText = await geoRes.text();
  console.error("Nominatim responded with error HTML:", errorText.slice(0, 200)); // Show partial HTML
  req.flash("error", "Geocoding failed. Please try again later.");
  return res.redirect("/listings/new");
}

// Try parsing JSON safely
let geoData;
try {
  geoData = await geoRes.json();
} catch (err) {
  console.error("Error parsing Nominatim JSON:", err);
  req.flash("error", "Invalid response from geocoding service.");
  return res.redirect("/listings/new");
}

// Check if location was found
if (!geoData.length) {
  req.flash("error", "Location not found");
  return res.redirect("/listings/new");
}


    const lat = parseFloat(geoData[0].lat);
    const lon = parseFloat(geoData[0].lon);

    const newlisting = new Listing({
      ...data,
      geometry: {
        type: "Point",
        coordinates: [lon, lat], // GeoJSON format: [longitude, latitude]
      },
      owner: req.user._id,
      image: { url, filename }
    });

    await newlisting.save();
    req.flash("success", "New listing created");
    res.redirect("/listings");
  } catch (err) {
    console.error("Error creating listing:", err);
    next(err);
  }
};


module.exports.showRoute=async (req,res,next)=>{
    let {id}=req.params;
    let data=await Listing.findById({_id:id}).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!data){
        req.flash("error","Listing you requested does not exist");
        return res.redirect("/listings");
    }
        res.render("./listings/show.ejs",{data});
}