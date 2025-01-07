const multer = require("multer");

// Configurazione di multer per salvare i file in memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
