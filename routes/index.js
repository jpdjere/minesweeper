var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/users', function(req, res, next) {
  res.send({"from":"me"});
});

router.post('/createGame', (req,res) => {
  let {rows, columns, mines} = req.body
  console.log("rows, columns, mines",rows, columns, mines);
})

module.exports = router;
