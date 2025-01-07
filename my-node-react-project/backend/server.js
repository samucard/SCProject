const dotenv = require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Percorso assoluto per la directory dei loghi
const logoDir = path.join(__dirname, "uploads/logos");
// Creare la directory se non esiste
if (!fs.existsSync(logoDir)) {
  fs.mkdirSync(logoDir, { recursive: true });
}

const app = express();
const PORT = 5001;

// Middleware per il parsing dei dati JSON e URL-encoded
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotte
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
