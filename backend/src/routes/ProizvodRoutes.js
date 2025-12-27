const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProizvodController');
const authorize = require('../middleware/authorize');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
// create/update/delete should be admin-only
router.post('/', authorize(['ADMIN']), controller.create);
router.put('/:id', authorize(['ADMIN']), controller.update);
router.delete('/:id', authorize(['ADMIN']), controller.delete);

module.exports = router;
