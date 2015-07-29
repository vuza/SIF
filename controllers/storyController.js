var db = require('../db');

var Story = require('../models/story');
var Scene = require('../models/scene');

var storyController = {
    create: function(req, res){

        //Test code
        var s = new Story({
            title: 'TestStory',
            author: 'Matthias Wagner',
            scenes: null,
            avgRating: 3
        });

        s.save(function (err) {
            if (err) {
                console.error(err);
                res.status(500).send('nok');
                return;
            }

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