// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const UserRouter = require('./src/routes/userRoutes');

// // Initiate Mongo Server
// const InitiateMongoServer = require("./src/config/db");
// InitiateMongoServer();

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Routes
// app.use('/', UserRouter);

// // Default route
// app.get("/", (req, res) => {
//   res.json({ message: "API is Working" }); // Fixed typo: "AP" to "API"
// });

// // PORT
// const PORT = process.env.PORT || 8000;

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server Started at PORT ${PORT}`); // Fixed missing backticks for template literal
// });





const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const HallRouter = require('./src/routes/hallRoutes');

// Initiate Mongo Server
 const InitiateMongoServer = require("./src/config/db");
InitiateMongoServer();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/', HallRouter);

// Default rout
app.get("/", (req, res) => {
  res.json({ message: "AP is Working" });
});

// PORT
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log('Server Started at PORT ${PORT}');
});
