import { Schema, model } from 'mongoose';

const validateEmail = function(email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const userSchema = new Schema({
    firstName : {
        type: Schema.Types.String,
        required: 'Firstname is required'
    },
    lastName : {
        type: Schema.Types.String,
        required: 'Firstname is required'
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        required: 'Email is required',
        validate : [validateEmail, 'email id is not approprite']
    },
    phoneNo: {
        type: Schema.Types.Number,
        unique: true,
        required: 'Phone Number is required',
    },
    password: {
        type: Schema.Types.String,
        required: 'Password is required'
    },
    isUser:{
        type: Schema.Types.Boolean,
        default: true,
    },
    isActive:{
        type: Schema.Types.Boolean,
        default: true,
    },
    lastLoggedIn: {
        type: Schema.Types.String,
    },
    resetPasswordToken: {
        type: Schema.Types.String
    },
    resetPasswordExpires: {
        type: Schema.Types.String
      },
}, { timestamps: true })

export default model('user', userSchema);