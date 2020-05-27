const mongoose   = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
    username: {type:String,unique:true},
    password: {type:String},
    photo: {
        type:String,
        default:'https://res.cloudinary.com/ddycn57vj/image/upload/v1590523929/architecture-office-management-app/default-profile_qdsrui.png'
    },
    role: {type:String,enum:['partner','leader','employee'],default:'employee'},
    birthday: Date,
    email: String,
    projects: [{type:Schema.Types.ObjectId,ref:'Project'}],
    events: [{type:Schema.Types.ObjectId,ref:'Event'}],
    blogs: [{type:Schema.Types.ObjectId,ref:'Blog'}]
    },
    {timestamps:true}
)

const User = mongoose.model('User',UserSchema);

module.exports = User;

