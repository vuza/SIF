var Story = require('../models/story');
var Scene = require('../models/scene');
var Choice = require('../models/choice');

var choiceController = {
    createAndAddToScene: function(req, res) {
    	//Get data
        console.log(req.body.scene);
    	var scene = (req.body.scene !== '' && typeof req.body.scene != 'undefined') ?
            JSON.parse(req.body.scene) :
            null;

        var nextScene = (req.body.nextScene !== '' && typeof req.body.nextScene != 'undefined') ?
            JSON.parse(req.body.nextScene) :
            null;

        //Validate
        invalidReq = false;

        if (scene === null)
            invalidReq = true;

        if (nextScene === null)
            invalidReq = true;

        if (!invalidReq) {
            //Persist
            var choice = new Choice({
                text: "",
                nextScene: nextScene
            });

            //add choice to scene
            scene.choices.push(choice);

            choice.save(function(err) {
                if (errHandler.do(err, res)) return;

                res.status(200).send('ok');
            });
        } else {
            res.status(500).send('nok');
        }
	},

	delete: function(req, res) {
		var _id = req.query._id;

        Choice.find({
            _id: _id
        }).remove(function(err) {
            if (errHandler.do(err, res)) return;

            res.status(200).send('ok');
        });
	},

	update: function(req, res) {
		//Get Data
        var _id = req.body._id;
        var text = req.body.text;
        var nextScene =
            (req.body.scene !== '' && typeof req.body.scene != 'undefined') ?
            JSON.parse(req.body.scene) :
            null;

        //Validate
        invalidReq = false;

        if (text === '')
            invalidReq = true;

        if (!invalidReq) {
            Choice
                .update({
                        _id: _id
                    }, {
                        text: text,
                        nextScene: nextScene
                    },
                    function(err) {
                        if (errHandler.do(err, res)) return;

                        res.status(200).send('ok');
                    }
                );
        } else {
            res.status(500).send('invalid request');
        }
	}
};

module.exports = choiceController;