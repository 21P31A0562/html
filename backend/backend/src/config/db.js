// //FILENAME : db.js

// const mongoose = require("mongoose");

// // Replace this with your MONGOURI.
// const MONGOURI = "mongodb+srv://sayedalisha9999:M4bqrg89PvBIw6C9@cluster0.gxsysne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// const InitiateMongoServer = async () => {
//   try {
//     await mongoose.connect(MONGOURI, {
//       useNewUrlParser: true
//     });
//     console.log("Connected to DB !!");
//   } catch (e) {
//     console.log(e);
//     throw e;
//   }
// };

// module.exports = InitiateMongoServer;





//FILENAME : db.js

const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://sayedalisha9999:M4bqrg89PvBIw6C9@cluster0.gxsysne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;