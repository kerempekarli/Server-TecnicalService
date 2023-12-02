const jwt = require("jsonwebtoken");

// JWT token çözme ve rol kontrolü middleware'i
function checkUserRole(allowedRoles) {
  return (req, res, next) => {
    const token = req.headers.authorization; // Örnek: Bearer eyJhbGciOiJIUzI1NiIsIn...

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, "your-secret-key", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userRoles = decoded.roles || []; // Kullanıcının rolleri

      // Kullanıcının rolleri, izin verilen roller içinde mi kontrol et
      const hasPermission = allowedRoles.some((role) =>
        userRoles.includes(role)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = decoded; // Çözülen token içindeki kullanıcı bilgisini req objesine ekle
      next();
    });
  };
}

module.exports = checkUserRole;
