import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('User', userSchema);