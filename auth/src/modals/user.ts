import mongoose from 'mongoose';

interface USerAttr {
  email: string,
  password: string
}

//interface describe user model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: USerAttr): UserDoc;
}

//interface for user document from mongo
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  // cretedAt: string;
  // updatedAt: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.build = (attrs: USerAttr) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };