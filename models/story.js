var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new Schema({
    title: String,
    author: String,
    scenes: [{type: Schema.Types.ObjectId, ref: 'Scene'}],
    avgRating: {type: Number, min: 0, max: 5}
});

module.exports = mongoose.model('Story', storySchema);