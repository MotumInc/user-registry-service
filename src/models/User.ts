import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
    name: String,
    login: String,
    hash: String,
    tokenRevision: Number
})

export default model("user", UserSchema)