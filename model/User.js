const mongoose   = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
    username: {type:String,unique:true,required:true},
    password: {type:String,required:true},
    photo: {
        type:String,
        default:'https://res.cloudinary.com/ddycn57vj/image/upload/v1590523929/architecture-office-management-app/default-profile_qdsrui.png'
    },
    role: {type:String,enum:['partner','leader','employee']},
    birthday: new Date,
    email: String,
    },
    {timestamps:true}
)

const User = mongoose.model('User',UserSchema);

module.exports = User;

