const { supabase, supabaseAdmin } = require("../config/supabase");

// SIGNUP

module.exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const allowedRoles = ["student", "teacher"];

    // ✅ Role validation
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: "Invalid role" });
    }

    // 🔍 Check existing user (fast check)
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists. Please login.",
      });
    }

    // ✅ Create user in auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
        emailRedirectTo: "http://localhost:5173/verify",
      },
    });

    if (error) return res.status(400).json({ error: error.message });

    // ✅ Insert into DB
    const { error: insertError } = await supabaseAdmin.from("users").insert([
      {
        id: data.user.id,
        email,
        role,
      },
    ]);

    // 🔥 HANDLE DUPLICATE (PRO LEVEL)
    if (insertError) {
      if (insertError.code === "23505") {
        return res.status(400).json({
          error: "User already exists (duplicate prevented)",
        });
      }
      return res.status(500).json({ error: insertError.message });
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
    sameSite: "Strict",
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
