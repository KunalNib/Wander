const { model } = require("mongoose");
const User=require("../models/user.js");


module.exports.getSignup=(req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.postSignup=async(req,res,next)=>{
    try{
        let{username,email,password}=req.body;
    const newUser=new User({email,username});
    let registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    req.flash("success","Welcome to WanderLust!");
    req.login(registeredUser,(err)=>{
        if(err){
            next(err)
        }
        req.flash("success","Welcome to WanderLust!");
        res.redirect("/listings");
    })
    }catch(err){
        req.flash("error",err.message);
        res.redirect('/signup');
    }
}

module.exports.getLogin=(req,res)=>{
    res.render("./users/login.ejs")
}

module.exports.postLogin=async (req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    if (res.locals.redirectUrl) {
      return res.redirect(res.locals.redirectUrl);
    }
    res.redirect("/listings");
  }

module.exports.logOut=(req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
}