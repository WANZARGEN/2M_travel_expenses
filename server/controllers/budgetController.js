var BudgetModel = require('../models/budgetModel.js');

/**
 * BudgetController.js
 *
 * @description :: Server-side logic for managing Budgets.
 */
module.exports = {
    
    /**
     * BudgetController.showByUser()
     */
    showByUser: function (req, res) {
        var userId = req.params.userId;
        BudgetModel.find({user: userId}, function (err, Budget) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Budget.',
                    error: err
                });
            }
            if (!Budget) {
                return res.status(404).json({
                    message: 'No such Budget that matches User'
                });
            }
            return res.json(Budget);
        });
    },

    /**
     * BudgetController.list()
     */
    list: function (req, res) {
        BudgetModel.find(function (err, Budgets) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Budget.',
                    error: err
                });
            }
            return res.json(Budgets);
        });
    },

    /**
     * BudgetController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        BudgetModel.findOne({_id: id}, function (err, Budget) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Budget.',
                    error: err
                });
            }
            if (!Budget) {
                return res.status(404).json({
                    message: 'No such Budget'
                });
            }
            return res.json(Budget);
        });
    },

    /**
     * BudgetController.create()
     */
    create: function (req, res) {
        var Budget = new BudgetModel({
			user : req.body.user,
			cash : req.body.cash,
			card : req.body.card

        });

        Budget.save(function (err, Budget) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Budget',
                    error: err
                });
            }
            return res.status(201).json(Budget);
        });
    },

    /**
     * BudgetController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        BudgetModel.findOne({_id: id}, function (err, Budget) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Budget',
                    error: err
                });
            }
            if (!Budget) {
                return res.status(404).json({
                    message: 'No such Budget'
                });
            }

            Budget.user = req.body.user ? req.body.user : Budget.user;
			Budget.cash = req.body.cash ? req.body.cash : Budget.cash;
			Budget.card = req.body.card ? req.body.card : Budget.card;
			
            Budget.save(function (err, Budget) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Budget.',
                        error: err
                    });
                }

                return res.json(Budget);
            });
        });
    },

    /**
     * BudgetController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        BudgetModel.findByIdAndRemove(id, function (err, Budget) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Budget.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
