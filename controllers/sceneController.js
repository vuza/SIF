var Story = require('../models/story');
var Scene = require('../models/scene');
var Choice = require('../models/choice');
var errHandler = require('./errHandler');

var sceneController = {
    create: function(req, res){
        // Get data
        var title = req['body']['title'];
        var text = req['body']['text'];
        var choices = (req['body']['choices'] == '' || typeof req['body']['choices'] == 'undefined') ? JSON.parse(req['body']['choices']) : '';
        var start = (req['body']['start'] === 'true');

        // Validate data
        var invalidReq = false;

        if(!title || title == '' || title.length < 2)
            invalidReq = true

        if(!text || text == '' || text.length < 5)
            invalidReq = true;

        if(invalidReq){
            res.status(500).send('Invalid request');
            return;
        }

        // Create scene
        var createScene = function(){
            var scene = new Scene({
                title: title,
                text: text,
                choices: choices,
                start: start
            });

            scene.save(function(err, scene){
                if(errHandler.do(err, res)) return;

                res.status(200).send(scene);
            });
        }

        // If this scene is start, set start = false to all others
        if(start){
            Scene.update({}, {start: false}, {}, function(err){
                if(errHandler.do(err, res)) return;

                createScene();
            });
        } else
            createScene();
    },

    delete: function(req, res){
        // Get data
        var _id = req['query']['_id'];

        // Delete scene
        Scene.findById(_id).remove(function(err){
            if(errHandler.do(err, res)) return;

            res.status(200).send('scene ' + _id + ' deleted');
        });
    },

    update: function(req, res){
        // Get data
        var _id = req['body']['_id'];
        var title = req['body']['title'];
        var text = req['body']['text'];
        var choices = (req['body']['choices'] == '' || typeof req['body']['choices'] == 'undefined') ? JSON.parse(req['body']['choices']) : '';
        var start = (req['body']['start'] === 'true');

        // Validate data
        var invalidReq = false;

        if(!_id || _id == '')
            invalidReq = true;

        if(!title || title == '' || title.length < 2)
            invalidReq = true

        if(!text || text == '' || text.length < 5)
            invalidReq = true;

        if(invalidReq){
            res.status(500).send('Invalid request');
            return;
        }

        // Update scene
        var updateScene = function(){
            Scene.findOneAndUpdate({_id: _id}, {
                title: title,
                text: text,
                choices: choices,
                start: start
            });
        }

        // If this scene is start, set start = false to all others
        if(start){
            Scene.findAndUpdate({}, {start: false}, {}, function(err, scenes){
                if(errHandler.do(err, res)) return;

                updateScene();
            });
        } else
            updateScene();
    },

    get: function(req, res){
        var _id = req['query']['_id'];

        if(!_id || _id == ''){
            res.status(500).send('No valid id');
        }

        Scene.findById(_id, function(err, scene){
            if(errHandler.do(err, res)) return;

            res.status(200).send(scene);
        })
    },

    getMultiple: function(req, res){
        // Get data
        var ids = (req['query']['ids'] != '' || typeof req['query']['ids'] == 'undefined') ? JSON.parse(req['query']['ids']) : '';

        if(!ids || ids == '')
            res.status(500).send('No valid ids');

        Scene.find(
            {
                _id: {
                    $in: ids
                }
            },
            function(err, scenes){
                if(errHandler.do(err, res)) return;

                res.status(200).send(scenes);
            }
        );
    }
};

module.exports = sceneController;