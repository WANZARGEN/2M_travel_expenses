var budgetModel = require('../models/budgetModel.js');

/**
 * budgetController.js
 *
 * @description :: Server-side logic for managing budgets.
 */
module.exports = {

    /**
     * budgetController.list()
     */
    list: function (req, res) {
        budgetModel.find(function (err, budgets) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting budget.',
                    error: err
                });
            }
            return res.json(budgets);
        });
    },

    /**
     * budgetController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        budgetModel.findOne({_id: id}, function (err, budget) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting budget.',
                    error: err
                });
            }
            if (!budget) {
                return res.status(404).json({
                    message: 'No such budget'
                });
            }
            return res.json(budget);
        });
    },

    /**
     * budgetController.create()
     */
    create: function (req, res) {
        var budget = new budgetModel({
			user : req.body.user,
			cash : req.body.cash,
			card : req.body.card

        });

        budget.save(function (err, budget) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating budget',
                    error: err
                });
            }
            return res.status(201).json(budget);
        });
    },

    /**
     * budgetController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        budgetModel.findOne({_id: id}, function (err, budget) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting budget',
                    error: err
                });
            }
            if (!budget) {
                return res.status(404).json({
                    message: 'No such budget'
                });
            }

            budget.user = req.body.user ? req.body.user : budget.user;
			budget.cash = req.body.cash ? req.body.cash : budget.cash;
			budget.card = req.body.card ? req.body.card : budget.card;
			
            budget.save(function (err, budget) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating budget.',
                        error: err
                    });
                }

                return res.json(budget);
            });
        });
    },

    /**
     * budgetController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        budgetModel.findByIdAndRemove(id, function (err, budget) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the budget.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
