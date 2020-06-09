const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const WorkTimeSchema = new Schema({
    creator: {type:Schema.Types.ObjectId,ref:'User'},
    project: {type:Schema.Types.ObjectId,ref:'Project'},
    date:Date,
    time: Number
});

const WorkTime = mongoose.model('WorkTime',WorkTimeSchema);
module.exports = WorkTime;