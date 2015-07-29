var mongoose = require('mongoose');

var choiceSchema = new mongoose.Schema({
    text: String,
    nextScene: {type: Schema.Types.ObjectId, ref: 'Scene'}
});

module.exports = mongoose.model('Choice', choiceSchema);