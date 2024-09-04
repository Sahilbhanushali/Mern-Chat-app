const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // Decode and verify the token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "defaultSecret"
      );

      // Find the user based on the decoded token and attach to request
      req.user = await User.findById(decoded.id).select("-password");

      // Proceed to next middleware or route handler
      next();
    } catch (error) {
      console.error("Error verifying token:", error.message);
      res.status(401).json({
        message: "Not authorized, token failed",
        error: error.message,
      });
    }
  } else {
    // No token provided or incorrect format
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
});

module.exports = protect;
