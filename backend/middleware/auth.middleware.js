import jwt from 'jsonwebtoken';

// Middleware to check authentication
export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // console.log("Token:", token); // Log the token
  if (!token) return res.status(401).json({ message: "Access Denied: No token provided" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Access Denied: Invalid token" });
  }
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }
  next();
};

// ✅ Make sure both `authenticate` and `isAdmin` are exported properly
export default { authenticate, isAdmin };
