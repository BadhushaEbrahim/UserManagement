var express = require('express');
var router = express.Router();



const { userSignup, userLogin, verifyToken,userImageUpdate } = require('../controllers/userController');
const { adminLoginn,getAllUsers,deleteUsers,updateUsers,getUserDetails,adminSearchUser,verifyAdminToken } = require('../controllers/adminControllers');
const { uploadSingleFile } = require('../util/multer');
const protect = require('../util/authMiddleWare');


/* USER ROUTES */
router.post('/signup',userSignup);
router.post('/login',userLogin);
router.post('/verifyUserToken',verifyToken)
router.post('/updateImage/:id',uploadSingleFile,userImageUpdate)


/* ADMIN ROUTES */
router.post('/adminLogin',adminLoginn)
router.get('/getallusers',getAllUsers)
router.delete('/deleteUser/:id',deleteUsers)
router.get('/admineditUser/:id',getUserDetails)
router.put('/updateUser/:id',updateUsers);
router.get('/searchUser/:userkey',adminSearchUser)
router.post('/verifyAdminToken',verifyAdminToken)

module.exports = router;
