var Story = require('../models/story');
var Scene = require('../models/scene');
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

        s.save(function (err) {
            if(errHandler.do(err, res)) return;

            res.status(200).send('ok');
        });
    },

    delete: function(req, res){
        
        //TODO
        //Story.find({_id: '55afd4e7d707f87b230a6e8a'}).remove().exec();

        res.status(200).send('ok');
    },

    update: function(req, res){
        //TODO
    },

    get: function(req, res){
        //TODO
    },

    getMultiple: function(req, res){
        Story.find(function(err, stories) {
            if (err) return console.error(err);

            res.status(200).send(stories);
        });
    },

    rate: function(req, res){
        //TODO
    }
};

module.exports = storyController;