const router = require('express').Router();
const ensureAuthenticted = require('../Middleware/AuthMiddleware');
router.get('/list', ensureAuthenticted, (req, res) => {
    console.log('User Data:', req.user); 
    res.status(200).json(
        [
            {
                name: "Product 1",
                price: 100
            },
            {
                name: "Product 1",
                price: 100
            }
        ]
    )
});

module.exports = router;
