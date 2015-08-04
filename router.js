var express = require('express');
var router = express.Router();
var passport = require('passport');
var storyController = require('./controllers/storyController');
var sceneController = require('./controllers/sceneController');
var choiceController = require('./controllers/choiceController');
var authController = require('./controllers/authController');

// Routes

// Story
router.post('/story', authController.isAuthenticated, storyController.create);
router.delete('/story', authController.isAuthenticated, storyController.delete);
router.put('/story', authController.isAuthenticated, storyController.update);
router.get('/story', storyController.get);
router.get('/stories', storyController.getMultiple);
router.put('/story/rate', storyController.rate);

// Scenes
router.post('/scene', authController.isAuthenticated, sceneController.create);
router.delete('/scene', authController.isAuthenticated, sceneController.delete);
router.put('/scene', authController.isAuthenticated, sceneController.update);
router.get('/scene', sceneController.get);
router.get('/scenes', sceneController.getMultiple);

// Choices
router.post('/choice', authController.isAuthenticated, choiceController.createAndAddToScene);
router.delete('/choice', authController.isAuthenticated, choiceController.delete);
router.put('/choice', authController.isAuthenticated, choiceController.update);

// Authorization
router.post('/login', passport.authenticate('login'), authController.login);
router.post('/signup', passport.authenticate('signup'), authController.signup);
router.get('/logout', authController.logout);

module.exports = router;