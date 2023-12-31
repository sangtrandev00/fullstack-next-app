import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  id: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;

// The "models" object is provided by Mongoose library and stores all the registered models.
// The "User" model is registered in the "models" object with the name "User".
// The "models" object is provided by Mongoose library and stores all the registered models.
// The "User" model is registered in the "models" object with the name "User".
// This prevents redefining the model and ensures that the existing model is reused