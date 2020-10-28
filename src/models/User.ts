import { Document, Schema, model } from "mongoose";

interface IUser extends Document{

 name:string;
 email:string;
 password:string;
    
} 

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true,
    versionKey: false
})



export default model <IUser> ('User', userSchema)