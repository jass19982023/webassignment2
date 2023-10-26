/* //Assignment: Assignment 2 Express Portfolio – Authentication 
// Laura Amangeldiyeva - student id: 301167661 
// Date: 2022/02/15 */
var express = require('express');
var router = express.Router();

//listing user 
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;