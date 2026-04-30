import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabaseClient";

export default function Verify() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const hash = window.location.hash;

      if (!hash) return;

      const params = new URLSearchParams(hash.substring(1));

      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (access_token && refresh_token) {
        await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        await fetch("http://localhost:5000/api/auth/set-cookie", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token }),
        });

        await fetch("http://localhost:5000/api/auth/create-profile", {
          method: "POST",
          credentials: "include",
        });

        // ✅ clean URL
        window.history.replaceState({}, document.title, "/verify");

        // ✅ ALWAYS go to login page
        navigate("/login");
      }
    };

    handleAuth();
  }, []);

  return <h1>Verifying...</h1>;
}
