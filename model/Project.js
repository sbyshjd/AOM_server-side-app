const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ProjectSchema = new Schema (
    {
    projectname: String,
    projectcode: String,
    startdate: Date,
    enddate:Date,
    status:{type:String,enum:['ongoing','suspend','finished']},
    partner: {type:Schema.Types.ObjectId,ref:'User'},
    leader:{type:Schema.Types.ObjectId,ref:'User'},
    team:[{type:Schema.Types.ObjectId,ref:'User'}],
    phase:{type:String,enum:['Tender','SO','VO','DO','TO','UO','PR']}
    },
    {timestamps:true}
)

const Project = mongoose.model('Project',ProjectSchema);

module.exports = Project;