const express = require('express');
const router = express.Router();


// Define your authentication routes here
router.get('/screen', (req,res)=>{
    res.send("no screen available")
});

module.exports = router;
