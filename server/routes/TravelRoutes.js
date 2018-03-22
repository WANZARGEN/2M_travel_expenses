var express = require('express');
var router = express.Router();
var TravelController = require('../controllers/TravelController.js');

/*
 * GET
 */
router.get('/', TravelController.list);

/*
 * GET
 */
router.get('/:id', TravelController.show);

/*
 * POST
 */
router.post('/', TravelController.create);

/*
 * PUT
 */
router.put('/:id', TravelController.update);

/*
 * DELETE
 */
router.delete('/:id', TravelController.remove);

module.exports = router;
