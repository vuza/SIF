var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sif');

var storySchema = new mongoose.Schema({
    title: String,
    author: String,
    scenes: [String],
    avgRating: {type: Number, min: 1, max: 5}
});

module.exports = mongoose.model('Story', storySchema);