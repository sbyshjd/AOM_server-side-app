const mongoose   = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
    {
    eventname: String,
    description: String,
    starttime:Date,
    endtime:Date,
    mode:{type:String,enum:['group','self']},
    type:{type:String,enum:['meeting','holiday','activity']},
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    forwho:[{type:Schema.Types.ObjectId,ref:'User'}],
    participants:[{type:Schema.Types.ObjectId,ref:'User'}]
    }, 
    {timestamps:true}
)

const Event = mongoose.model('Event',EventSchema);

module.exports = Event;