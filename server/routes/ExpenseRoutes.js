var express = require('express');
var router = express.Router();
var ExpenseController = require('../controllers/ExpenseController.js');

/*
 * GET
 */
router.get('/', ExpenseController.list);

/*
 * GET
 */
router.get('/sort/:sort', ExpenseController.list);


/*
 * GET
 */
router.get('/:id', ExpenseController.show);

/*
 * POST
 */
router.post('/', ExpenseController.create);

/*
 * PUT
 */
router.put('/:id', ExpenseController.update);

/*
 * DELETE
 */
router.delete('/:id', ExpenseController.remove);

module.exports = router;
