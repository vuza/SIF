var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new Schema({
    title: String,
    author: String,
    scenes: [{type: Schema.Types.ObjectId, ref: 'Scene'}],
    ratingCount: Number,
    ratingSum: Number
});

module.exports = mongoose.model('Story', storySchema);