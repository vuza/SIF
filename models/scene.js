var mongoose = require('mongoose');

var sceneSchema = new mongoose.Schema({
    title: String,
    text: String,
    choices: [],	//?
    start: Boolean
});

module.exports = mongoose.model('Scene', sceneSchema);