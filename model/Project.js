const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ProjectSchema = new Schema ({
    projectname: String,
    status:{type:String,enum:['Ongoing','suspend','finished']},
    owner: {type:Schema.Types.ObjectId,ref:'User'},
    leader:{type:Schema.Types.ObjectId,ref:'User'},
    team:[{type:Schema.Types.ObjectId,ref:'User'}],
    

})