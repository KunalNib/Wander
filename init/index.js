const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

main().then((res)=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect('mongodb+srv://kunalnibrad297:ouIfbpsIIRdTxSeb@cluster0.ulqw6f2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'686026cf2ea127d81e62fbc9'}))
    await Listing.insertMany(initdata.data);
}

initDB();