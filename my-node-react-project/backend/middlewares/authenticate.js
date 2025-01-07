const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Token mancante");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usa una variabile d'ambiente per la chiave segreta
    req.userId = decoded.userId; // Assicurati che il token contenga `userId` nel payload
    next();
  } catch (error) {
    res.status(401).send("Autenticazione fallita");
  }
};

module.exports = authenticate;
