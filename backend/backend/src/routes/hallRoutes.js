// const express = require('express');
// const Router = express.Router();

// const UserController = require('../controllers/UserController')

// //User Routes

// Router.post('/api/add-user',UserController.addUser);

// module.exports = Router;



const express = require('express');
const Router = express.Router();

const UserController = require('../controllers/UserController')

//User Routes

Router.post('/api/add-halldata',UserController.addHallData);
Router.get('/api/get-halldata', UserController.getHallData);

module.exports = Router;
