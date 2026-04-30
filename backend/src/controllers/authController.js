const { supabase, supabaseAdmin } = require("../config/supabase");

// SIGNUP

module.exports.signup = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    // ✅ restrict roles
    const allowedRoles = ["student", "teacher"];
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: "Invalid role" });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          name, // 👈 store temporarily
        },
        emailRedirectTo: "http://localhost:5173/verify",
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: "Signup successful. Check your email.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// LOGIN
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.cookie("access_token", data.session.access_token, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    message: "Login successful",
    user: data.user,
  });
};

// SET COOKIE AFTER MAGIC LINK
module.exports.setCookie = (req, res) => {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ error: "No token provided" });
  }

  res.cookie("access_token", access_token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Cookie set" });
};

module.exports.logout = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
  });

  res.json({ message: "Logged out successfully" });
};


module.exports.createProfile = async (req, res) => {
  try {
    const token = req.cookies.access_token;

    const { data } = await supabase.auth.getUser(token);
    const user = data.user;

    const role = user.user_metadata.role;
    const name = user.user_metadata.name;

    // profiles
    await supabaseAdmin.from("profiles").insert({
      id: user.id,
      email: user.email,
      role,
      name,
    });

    // role tables
    if (role === "student") {
      await supabaseAdmin.from("students").insert({
        id: user.id,
      });
    }

    if (role === "teacher") {
      await supabaseAdmin.from("teachers").insert({
        id: user.id,
      });
    }

    res.json({ message: "DONE" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};