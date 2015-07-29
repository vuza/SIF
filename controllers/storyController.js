var Story = require('../models/story');
var Scene = require('../models/scene');
var Choice = require('../models/choice');
var errHandler = require('./errHandler');

var storyController = {
    create: function(req, res){

        //Get Data
        var title = req.body.title;

        //Validate
        invalidReq = false;

        if(title == '' || title.length<2)
            invalidReq = true;

        //Persist
        var story = new Story({
            title: title,
            author: 'unknown',
            scenes: null,
            avgRating: 0
        });

        story.save(function (err) {
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