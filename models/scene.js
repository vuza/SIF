var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sceneSchema = new Schema({
    title: String,
    text: String,
    choices: [],	//?
    start: Boolean
});

module.exports = mongoose.model('Scene', sceneSchema);