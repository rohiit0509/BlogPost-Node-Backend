import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require: [true, 'Enter an email address.'],
        unique: [true, 'That email address is taken.'],
    },
    password:String,
    phone:String,
    userName:String,
    userProfile:String
})

const OtpSchema = new mongoose.Schema({
    email:String,
    otpCode:Number,
    expireIn:Date
})
export const OtpModel = mongoose.model('Otp', OtpSchema)

export default mongoose.model('User', userSchema); 
