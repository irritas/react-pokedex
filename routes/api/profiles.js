var express = require('express');
var router = express.Router();
var profilesCtrl = require('../../controllers/profiles');

router.use(require('../../config/auth'));
router.post('/create', checkAuth, profilesCtrl.create);
router.get('/show', checkAuth, profilesCtrl.show);
router.put('/add', checkAuth, profilesCtrl.add);
router.put('/remove', checkAuth, profilesCtrl.remove);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;