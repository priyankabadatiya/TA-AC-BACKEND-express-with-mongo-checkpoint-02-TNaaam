let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var remarkSchema = new Schema({
    title: {type: String, required: true},
    author: String,
    likes: {type: Number, default: 0},
    events: {type: Schema.Types.ObjectId, ref: 'Event', required: true}
}, {timestamps: true});

module.exports = mongoose.model('Remark', remarkSchema);