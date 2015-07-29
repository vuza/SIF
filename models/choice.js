var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var choiceSchema = new Schema({
    text: String,
    nextScene: {type: Schema.Types.ObjectId, ref: 'Scene'}
});

module.exports = mongoose.model('Choice', choiceSchema);