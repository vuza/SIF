var express = require('express');
var router = express.Router();

// Routes
router.get('/test', function(req, res){
    res.send('Hello World');
})

module.exports = router;