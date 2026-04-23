import supabase from '../config/supabase.js';

const supabase = require("../config/supabase");

module.exports.verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: "No token" });

  const { data, error } = await supabase.auth.getUser(token);

  if (error) return res.status(401).json({ message: "Invalid token" });

  req.user = data.user;
  next();
};

// ROLE CHECK
module.exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    const role = req.user?.user_metadata?.role;

    if (!roles.includes(role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};