var express = require('express');
var router = express.Router();
var BudgetController = require('../controllers/budgetController.js');

/*
 * GET
 */
router.get('/balance/:userId', BudgetController.showByUser);

/*
 * GET
 */
router.get('/', BudgetController.list);

/*
 * GET
 */
router.get('/:id', BudgetController.show);

/*
 * POST
 */
router.post('/', BudgetController.create);

/*
 * PUT
 */
router.put('/:id', BudgetController.update);

/*
 * DELETE
 */
router.delete('/:id', BudgetController.remove);

module.exports = router;
