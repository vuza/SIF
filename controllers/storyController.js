var Story = require('../models/story');
var Scene = require('../models/scene');
var Choice = require('../models/choice');
var errHandler = require('./errHandler');

var storyController = {
    create: function(req, res){
        // Create story
        var s = new Story({
            title: title,
            text: text,

            author: 'Matthias Wagner',
            scenes: null,
            avgRating: 3
        });

        Story.find({
            _id: _id
        }).remove(function(err) {
            if (errHandler.do(err, res)) return;

            res.status(200).send('ok');
        });
    },

    update: function(req, res) {
        //Get Data
        var _id = req.body._id;
        var title = req.body.title;
        var scenes =
            (req.body.scenes !== '' && typeof req.body.scenes != 'undefined') ?
            JSON.parse(req.body.scenes) :
            null;
        var avgRating = req.body.avgRating;

        //Validate
        invalidReq = false;

        if (title === '' || title.length < 2)
            invalidReq = true;

        if (!invalidReq) {
            Story
                .update({
                        _id: _id
                    },

                    {
                        title: title,
                        author: 'unknown',
                        scenes: scenes,
                        avgRating: avgRating
                    },
                    function(err) {
                        if (errHandler.do(err, res)) return;

                        res.status(200).send('ok');
                    }
                );
        } else {
            res.status(500).send('invalid request');
        }
    },

    get: function(req, res) {
        var _id = req.query._id;

        Story.find({_id: _id}, function(err, story) {
            if (errHandler.do(err, res)) return;

            res.status(200).send(story);
        });
    },

    getMultiple: function(req, res) {
        Story.find(function(err, stories) {
            if (errHandler.do(err, res)) return;

            res.status(200).send(stories);
        });
    },

    rate: function(req, res) {
        //TODO
    }
};

module.exports = storyController;