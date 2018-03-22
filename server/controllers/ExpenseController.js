var ExpenseModel = require('../models/ExpenseModel.js');

/**
 * ExpenseController.js
 *
 * @description :: Server-side logic for managing Expenses.
 */
module.exports = {

    /**
     * ExpenseController.list()
     */
    list: function (req, res) {
        ExpenseModel.find(function (err, Expenses) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Expense.',
                    error: err
                });
            }
            return res.json(Expenses);
        });
    },

    /**
     * ExpenseController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ExpenseModel.findOne({_id: id}, function (err, Expense) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Expense.',
                    error: err
                });
            }
            if (!Expense) {
                return res.status(404).json({
                    message: 'No such Expense'
                });
            }
            return res.json(Expense);
        });
    },

    /**
     * ExpenseController.create()
     */
    create: function (req, res) {
        var Expense = new ExpenseModel({
			_id : req.body._id,
			comment : req.body.comment,
			amount : req.body.amount,
			payer : req.body.payer,
			chargedTo : req.body.chargedTo,
			method : req.body.method,
			unit : req.body.unit,
			datetime : req.body.datetime

        });

        Expense.save(function (err, Expense) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Expense',
                    error: err
                });
            }
            return res.status(201).json(Expense);
        });
    },

    /**
     * ExpenseController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ExpenseModel.findOne({_id: id}, function (err, Expense) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Expense',
                    error: err
                });
            }
            if (!Expense) {
                return res.status(404).json({
                    message: 'No such Expense'
                });
            }

            Expense._id = req.body._id ? req.body._id : Expense._id;
			Expense.comment = req.body.comment ? req.body.comment : Expense.comment;
			Expense.amount = req.body.amount ? req.body.amount : Expense.amount;
			Expense.payer = req.body.payer ? req.body.payer : Expense.payer;
			Expense.chargedTo = req.body.chargedTo ? req.body.chargedTo : Expense.chargedTo;
			Expense.method = req.body.method ? req.body.method : Expense.method;
			Expense.unit = req.body.unit ? req.body.unit : Expense.unit;
			Expense.datetime = req.body.datetime ? req.body.datetime : Expense.datetime;
			
            Expense.save(function (err, Expense) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Expense.',
                        error: err
                    });
                }

                return res.json(Expense);
            });
        });
    },

    /**
     * ExpenseController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ExpenseModel.findByIdAndRemove(id, function (err, Expense) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Expense.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
