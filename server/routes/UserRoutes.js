var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');

/*
 * LOGIN
 */
router.post('/login', UserController.login);

/*
 * GET
 */
router.get('/', UserController.list);

/*
 * GET
 */
router.get('/all', UserController.listWithBudget);

/*
 * GET
 */
router.get('/:id', UserController.show);

/*
 * POST
 */
router.post('/', UserController.create);

/*
 * PUT
 */
router.put('/:id', UserController.update);

/*
 * DELETE
 */
router.delete('/:id', UserController.remove);

module.exports = router;
