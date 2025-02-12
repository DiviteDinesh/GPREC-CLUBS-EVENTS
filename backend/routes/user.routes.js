import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout); 
router.get('/getuser', userController.getUser); // ✅ Added new route

export default router;
