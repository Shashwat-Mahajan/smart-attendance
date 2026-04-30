const { supabaseAdmin } = require("../config/supabase");

// 🔥 CREATE ADMIN (PROTECTED)
module.exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email & password required" });
    }

    // 🔒 Create admin user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // skip email verification
      user_metadata: {
        role: "admin",
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: "Admin created successfully",
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
