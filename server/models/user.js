import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, require: true, uniqe: true},
    fullName: {type:string,require:true},
    password:{type:string,require:true,minlength: 6},
    profilePic: {type:string, default: ""},
    bio: {type: string},
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;