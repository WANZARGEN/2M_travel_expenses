var express = require('express');
var router = express.Router();
var budgetController = require('../controllers/budgetController.js');

/*
 * GET
 */
router.get('/', budgetController.list);

/*
 * GET
 */
router.get('/:id', budgetController.show);

/*
 * POST
 */
router.post('/', budgetController.create);

/*
 * PUT
 */
router.put('/:id', budgetController.update);

/*
 * DELETE
 */
router.delete('/:id', budgetController.remove);

module.exports = router;
