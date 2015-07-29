var mongoose = require('mongoose');

var storySchema = new mongoose.Schema({
    title: String,
    author: String,
    scenes: [String],
    avgRating: {type: Number, min: 1, max: 5}
});

module.exports = mongoose.model('Story', storySchema);