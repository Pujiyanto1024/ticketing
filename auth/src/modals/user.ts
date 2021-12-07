import mongoose from 'mongoose';

interface USerAttr {
  email: string,
  password: string
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

const User = mongoose.model('User', userSchema);

const buildUser = (attrs: USerAttr) => {
  return new User(attrs);
};

export { User, buildUser };