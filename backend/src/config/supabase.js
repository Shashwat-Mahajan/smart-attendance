// config/supabase.js

const { createClient } = require("@supabase/supabase-js");

// Public client (for normal auth)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

// Admin client (ONLY backend use)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

module.exports = { supabase, supabaseAdmin };
