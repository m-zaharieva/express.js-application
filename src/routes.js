// Import third-party modules 
const router = require('express').Router();

// Import local modules (controllers)
router.use('/user', authController);



module.exports = router;