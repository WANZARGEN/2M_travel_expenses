var userModel = require('../models/UserModel.js');
var BudgetModel = require('../models/BudgetModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.listWithBudget()
     */
    listWithBudget: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            BudgetModel.find(function (err, Budget) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Budget.',
                        error: err
                    });
                }

                let result = []
                Budget.forEach((b) => {
                    let bid = b.user.toString()
                    users.forEach((u) => {
                        let uid = u._id.toString()
                        if(bid.toString() == uid.toString()) {
                            let obj = {}
                            obj._id = u._id
                            obj.name = u.name
                            obj.cash = b.cash
                            obj.card = b.card
                            result.push(obj)
                        }
                    })
                })
                
                return res.json(result)
            });
        });
    },

    /**
     * userController.login()
     */
    login: function (req, res) {
        var name = req.body.name;
        var password = req.body.password;
        var user;
        userModel.find(function (err, users) {
            console.log('login called')
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            users.forEach((e) => {
                if(e.name == name) user = e
            })
            if (!user) {
                console.log('login > no user data')
                return res.status(401).json({
                    message: 'No such user.'
                });
            }

            if (password != user.password) {
                console.log('login > password not match')
                return res.status(401).json({
                    message: 'Wrong password.'
                });
            }

            req.session.userId = user._id
            req.session.userName = name
            
            console.log(req.session)
            return res.json({ session:req.session });
        });
    },

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({
			name : req.body.name,
			password : req.body.password

        });
        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.name = req.body.name ? req.body.name : user.name;
			user.password = req.body.password ? req.body.password : user.password;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
