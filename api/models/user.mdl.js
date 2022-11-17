import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, require: true },
    password: { type: String, required: true },
    image: { data: Buffer, contentType: String }
});

userSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('User', userSchema);