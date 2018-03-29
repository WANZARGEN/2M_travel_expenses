var TravelModel = require('../models/TravelModel.js');

/**
 * TravelController.js
 *
 * @description :: Server-side logic for managing Travels.
 */
module.exports = {

    /**
     * TravelController.list()
     */
    list: function (req, res) {
        TravelModel.find(function (err, Travels) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Travel.',
                    error: err
                });
            }
            return res.json(Travels);
        });
    },

    /**
     * TravelController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        TravelModel.findOne({_id: id}, function (err, Travel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Travel.',
                    error: err
                });
            }
            if (!Travel) {
                return res.status(404).json({
                    message: 'No such Travel'
                });
            }
            return res.json(Travel);
        });
    },

    /**
     * TravelController.create()
     */
    create: function (req, res) {
        var Travel = new TravelModel({
			traveller : req.body.traveller,
			destination : req.body.destination,
			startDate : req.body.startDate,
			endDate : req.body.endDate

        });

        Travel.save(function (err, Travel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Travel',
                    error: err
                });
            }
            return res.status(201).json(Travel);
        });
    },

    /**
     * TravelController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        TravelModel.findOne({_id: id}, function (err, Travel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Travel',
                    error: err
                });
            }
            if (!Travel) {
                return res.status(404).json({
                    message: 'No such Travel'
                });
            }

			Travel.traveller = req.body.traveller ? req.body.traveller : Travel.traveller;
			Travel.destination = req.body.destination ? req.body.destination : Travel.destination;
			Travel.startDate = req.body.startDate ? req.body.startDate : Travel.startDate;
			Travel.endDate = req.body.endDate ? req.body.endDate : Travel.endDate;
			
            Travel.save(function (err, Travel) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Travel.',
                        error: err
                    });
                }

                return res.json(Travel);
            });
        });
    },

    /**
     * TravelController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        TravelModel.findByIdAndRemove(id, function (err, Travel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Travel.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
