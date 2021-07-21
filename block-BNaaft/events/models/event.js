let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    host: String,
    start_date:{type:Date},
    end_date: {type:Date},
    categories: [String],
    location: String,
    likes: { type: Number, default: 0 },
    remarks: [{ type: Schema.Types.ObjectId, ref: 'Remark' }],

}, { timestamps: true });


module.exports = mongoose.model('Event', eventSchema);
