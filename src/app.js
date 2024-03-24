// const express = require("express");
// const app =express();
// const port = process.env.PORT || 3000;
// app.get("/" ,(req,res)=>{
//     res.send("hello from the vishal")
// });
// app.listen(port, ()=>{
//     console.log(`server is running at port no ${port}`);
// })



// app.js starting
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/video103")
  .then(() => {
    console.log(`Connection successful`);
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
  });
// Your server code here (assuming it's running on port 3000)
const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
// require("./db/conn.js");


const static_path = path.join(__dirname, "../");
app.use(express.static(static_path));

// Define the schema
const fmSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  address: String,
  text: String
});

// Create a model
const sg = mongoose.model("sg", fmSchema);

// Body parser middlewaresgs
app.use(express.urlencoded({ extended: true }));
// Handle form submissions
app.post("/", async (req, res) => {
  try {
    // Create a new GM instance
    const gmMember = new sg({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      text: req.body.text,
    });
    // Save the data to the database
    await gmMember.save();
    res.send("Data saved successfully");
  } catch (error) {
    console.error("Error saving data to the database:", error.message);
    res.status(500).send("Error saving data to the database");
  }
});


app.get("/", (req, res) => {
  res.send("Hello from the chegg");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});



// test> use newfolder
// switched to db newfolder
// newfolder> show collections
// gms
// users
// newfolder> db.gms.find()
// [
//   {
//     _id: ObjectId("654f5c10905a9f70b2fb7bc7"),
//     name: 'Vishal Kumar',
//     age: 33,
//     gender: 'male',
//     locality: 'indian',
//     __v: 0
//   }
// ]