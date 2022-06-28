const express = require("express");
const router = express.Router();
const db = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
 
router.route("/record").get(function (req, res) {
 const dbc = db.getDb("mernstack");
 dbc
   .collection("users")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
router.route("/record/:id").get(function (req, res) {
 let dbc = db.getDb();
 let query = { _id: ObjectId( req.params.id )};
 dbc
     .collection("users")
     .findOne(query, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
router.route("/record/add").post(function (req, response) {
 let dbc = db.getDb();
 let data = {
  firstname: req.body.firstname,
  lastname: req.body.lastname,
  address: req.body.address,
  phone: req.body.phone,
  email: req.body.email,
  profession: req.body.profession,
 };
 dbc.collection("users").insertOne(data, function (err, res) {
   if (err) throw err;
   console.log("1 document added.");
   response.json(res);
 });
});
 
router.route("/update/:id").post(function (req, response) {
 let dbc = db.getDb(); 
 let query = { _id: ObjectId( req.params.id )}; 
 let updatedValue = {   
   $set: {     
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    profession: req.body.profession,  
   }, 
  }
  dbc.collection("users").updateOne(query, updatedValue, function (err, res) {
    if (err) throw err;
    console.log("1 document updated.");
    response.json(res);
  });
});
 
router.route("/:id").delete((req, response) => {
 let dbc = db.getDb();
 let query = { _id: ObjectId( req.params.id )};
 dbc.collection("users").deleteOne(query, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = router;