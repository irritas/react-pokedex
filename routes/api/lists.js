var express = require('express');
var router = express.Router();
var listsCtrl = require('../../controllers/lists');

router.use(require('../../config/auth'));
router.get('/index', checkAuth, listsCtrl.index);
router.get('/:id', checkAuth, listsCtrl.show);
router.put('/:id/add', checkAuth, listsCtrl.add);
router.put('/:id/remove', checkAuth, listsCtrl.remove);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;