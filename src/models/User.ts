import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
    name: String
})

export default model("user", UserSchema)