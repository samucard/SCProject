// userRoutes.js
const express = require("express");
const upload = require("../middlewares/uploads"); // Importa multer configurato
const authenticate = require("../middlewares/authenticate"); // Importa il middleware di autenticazione
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../controllers/userController");

const router = express.Router();

// Registrazione
router.post("/register", upload.single("logo"), registerUser);

// Login
router.post("/login", loginUser);

// Recupero dettagli utente
router.get("/details", authenticate, getUserDetails);

module.exports = router;
