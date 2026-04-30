const { supabase } = require("../config/supabase");

// 🔐 VERIFY USER (same as before)
module.exports.verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = data.user;

    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 🔥 NEW ROLE CHECK (FROM DATABASE)
module.exports.allowRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      // 🔍 fetch role from profiles table
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error || !profile) {
        return res.status(403).json({ message: "Profile not found" });
      }

      const role = profile.role;

      if (!roles.includes(role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
};
