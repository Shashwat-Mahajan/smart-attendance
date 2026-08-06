const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

// Lazy-initialized — created on first request, not at module load time
// so SUPABASE_URL is guaranteed to be loaded from .env already
let client = null;

const getClient = () => {
  if (!client) {
    client = jwksClient({
      jwksUri: `${process.env.SUPABASE_URL}/auth/v1/.well-known/jwks.json`,
      cache: true,
      rateLimit: true,
    });
    console.log(
      "✅ JWKS client initialized:",
      `${process.env.SUPABASE_URL}/auth/v1/.well-known/jwks.json`,
    );
  }
  return client;
};

const getKey = (header, callback) => {
  getClient().getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error("❌ Failed to get signing key:", err.message);
      return callback(err);
    }
    callback(null, key.getPublicKey());
  });
};

module.exports.verifyUser = (req, res, next) => {
  let token = req.cookies?.access_token;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  jwt.verify(token, getKey, { algorithms: ["ES256"] }, (err, decoded) => {
    if (err) {
      console.error("❌ Token verification failed:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      user_metadata: decoded.user_metadata || {},
      app_metadata: decoded.app_metadata || {},
    };

    next();
  });
};

module.exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    try {
      const role = req.user.user_metadata?.role || req.user.app_metadata?.role;

      if (!role || !roles.includes(role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
};
