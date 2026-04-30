const { supabaseAdmin, supabase } = require("../config/supabase");

// 🔥 ADMIN → CREATE TEACHER
module.exports.createTeacher = async (req, res) => {
  try {
    const { email, password, name, employee_id, department } = req.body;

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name, // optional but useful
      },
    });

    if (error) throw error;

    const userId = data.user.id;

    // profiles
    await supabase.from("profiles").insert({
      id: userId,
      email,
      role: "teacher",
      name, // 👈 store here also
    });

    // teachers
    await supabase.from("teachers").insert({
      id: userId,
      employee_id,
      department,
    });

    res.json({ message: "Teacher created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 TEACHER → CREATE STUDENT
module.exports.createStudent = async (req, res) => {
  try {
    const { email, password, name, enrollment_no, department, year } = req.body;

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
      },
    });

    if (error) throw error;

    const userId = data.user.id;

    // profiles
    await supabase.from("profiles").insert({
      id: userId,
      email,
      role: "student",
      name,
    });

    // students
    await supabase.from("students").insert({
      id: userId,
      enrollment_no,
      department,
      year,
    });

    res.json({ message: "Student created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
