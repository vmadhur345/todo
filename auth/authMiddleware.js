import jwt from 'jsonwebtoken';
import User from '../models/User.js';  

const protect = async (req, res, next) => {
  let token;

  // Check if token is in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token

      // Verify token (using verifyToken function from jwt.js)
      const decoded = verifyToken(token);

      // Attach user info to request object (excluding password field)
      req.user = await User.findById(decoded.userId).select('-password');
      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  // If no token found in Authorization header
  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

export default protect;
