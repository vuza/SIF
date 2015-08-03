var express = require('express');
var router = express.Router();
var storyController = require('./controllers/storyController');
var sceneController = require('./controllers/sceneController');
var choiceController = require('./controllers/choiceController');

// Routes

// Story
router.post('/story', storyController.create);
router.delete('/story', storyController.delete);
router.put('/story', storyController.update);
router.get('/story', storyController.get);
router.get('/stories', storyController.getMultiple);
router.put('/story/rate', storyController.rate);

// Scenes
router.post('/scene', sceneController.create);
router.delete('/scene', sceneController.delete);
router.put('/scene', sceneController.update);
router.get('/scene', sceneController.get);
router.get('/scenes', sceneController.getMultiple);

// Choices
router.post('/choice', choiceController.createAndAddToScene);
router.delete('/choice', choiceController.delete);
router.put('/choice', choiceController.update);

module.exports = router;