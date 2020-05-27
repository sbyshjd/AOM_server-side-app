const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ProjectSchema = new Schema ({
    projectname: String,
    projectcode: String,
    startdate: Date,
    status:{type:String,enum:['Ongoing','suspend','finished']},
    owner: {type:Schema.Types.ObjectId,ref:'User'},
    leader:{type:Schema.Types.ObjectId,ref:'User'},
    team:[{type:Schema.Types.ObjectId,ref:'User'}],
    phase:[{type:String,enum:['Tender','SO','VO','DO','TO','UO','PR']}],
    tasks:[{type:Schema.Types.ObjectId,ref:'Task'}]

})

const Project = mongoose.model('Project',ProjectSchema);

module.exports = Project;