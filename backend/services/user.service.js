import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
  const { username, email, password, role, clubId } = userData;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({ username, email, password: hashedPassword, role, clubId });
  await newUser.save();
  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT Token
  const token = jwt.sign(
    { userId: user._id, role: user.role, clubId: user.clubId }, // ✅ Include clubId in token
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );

  return { token, user };
};

// ✅ New function to fetch user by ID
export const findUserById = async (userId) => {
  const user = await User.findById(userId).select('-password'); // Exclude password for security
  if (!user) throw new Error('User not found');
  return user;
};
