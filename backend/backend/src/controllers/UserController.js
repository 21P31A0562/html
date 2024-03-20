
// const User = require("../models/user");


// const addUser = async (req, res, next) => {
//   console.log("write ur functionality here")
 
// }

// exports.addUser = addUser;



const HallData = require("../models/hallmodel");


const addHallData = async (req, res, next) => {
  console.log("write ur functionality here")
  const hall_data = req.body;
  console.log(req.body);
  const halldata = await HallData.create(hall_data)
  .then((response) => {
    res.status(200).send("data added successfully");
    console.log(response);
  }).catch((error) => {
    console.log(error);
  })
};

const getHallData = async(req, res) => {
  await HallData.find()
  .then((respons) => {
    console.log(respons);
    res.status(200).send(respons);
  }).catch((error) => {
    console.log(error);
  })
}

exports.addHallData = addHallData;
exports.getHallData = getHallData;