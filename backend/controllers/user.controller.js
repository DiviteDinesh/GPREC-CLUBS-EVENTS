import { registerUser, loginUser, findUserById } from '../services/user.service.js';

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) addToBlacklist(token); 

    res.clearCookie("jwtToken", { httpOnly: true, secure: true, sameSite: "None" });
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

// ✅ New getUser function
export const getUser = async (req, res) => {
  try {
    const userId = req.query.userId; // Extract user ID from query params
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

// ✅ Export all functions properly
export default { register, login, logout, getUser };
