const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TaskSchema = new Schema ({
    taskname:String,
    startdate: Date,
    enddate: Date,
    user:{type:Schema.Types.ObjectId,ref:'User'},
    project:{type:Schema.Types.ObjectId,ref:'Project'}
})

const Task = mongoose.model('Task',TaskSchema);

module.exports = Task;