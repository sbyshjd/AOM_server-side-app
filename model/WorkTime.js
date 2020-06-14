const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const WorkTimeSchema = new Schema({
    weekofyear:Number,
    year:Number,
    creator: {type:Schema.Types.ObjectId,ref:'User'},
    project: {type:Schema.Types.ObjectId,ref:'Project'},
    monday:{type:Number,default:0},
    tuesday:{type:Number,default:0},
    wednesday:{type:Number,default:0},
    thursday:{type:Number,default:0},
    friday:{type:Number,default:0},
    saturday:{type:Number,default:0},
    sunday:{type:Number,default:0} 
});

const WorkTime = mongoose.model('WorkTime',WorkTimeSchema);
module.exports = WorkTime;