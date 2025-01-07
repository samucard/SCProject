// userController.js
const { User, Company, Op } = require("../models/index"); // Import corretto dal file index.js
const bcrypt = require("bcryptjs"); // Importa bcrypt per l'hashing delle password
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken"); // Importa jwt


// Funzione per registrare un utente e un'azienda
const registerUser = async (req, res) => {
  try {
    if (!req.body || !req.body.username) {
      console.error("Errore: req.body è vuoto o username mancante.");
      return res.status(400).send("Errore: Dati mancanti nella richiesta.");
    }

    const {
      username,
      email,
      password,
      firstName,
      lastName,
      birthDate,
      residence,
      address,
      manager,
    } = req.body;

    if (!username || !password) {
      return res.status(400).send("Username e password sono obbligatori.");
    }

    console.log("User model:", User);

    // Controlla se l'utente esiste già
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
    });
    if (existingUser) {
      return res.status(400).json("Username o email già in uso");
    }

    // Controlla se la company esiste già
    let company = await Company.findOne({
      where: { address, manager },
    });

    // Gestire il caricamento del file logo
    let logoPath = null;
    if (req.file) {
      const logoDir = path.join(__dirname, "../uploads/logos"); // Percorso assoluto della directory
      const logoFilename = `${Date.now()}.svg`;
      logoPath = path.join("uploads/logos", logoFilename); // Percorso relativo per il database

      // Crea la directory se non esiste
      if (!fs.existsSync(logoDir)) {
        fs.mkdirSync(logoDir, { recursive: true });
      }

      // Scrive il file nel percorso assoluto
      fs.writeFileSync(path.join(logoDir, logoFilename), req.file.buffer);
    }

    // Se la company non esiste, la creiamo
    if (!company) {
      company = await Company.create({
        address,
        manager,
        logo_path: logoPath,
      });
    }

    // Hash della password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creazione dell'utente associato alla company
    await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      birthDate,
      residence,
      companyId: company.id, // Associazione alla company
    });

    res.status(201).send("Registrazione avvenuta con successo");
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    res.status(500).send("Errore durante la registrazione");
  }
};

// Funzione per autenticare un utente
const loginUser = async (req, res) => {
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  try {
    const { username, password } = req.body;

    // Trova l'utente tramite username e includi la Company associata
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Company,
          as: "company",
          attributes: ["id", "address", "manager", "logo_path"],
        },
      ],
    });

    if (!user) {
      return res.status(401).send("Credenziali non valide");
    }

    // Confronta la password inserita con quella crittografata nel database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Credenziali non valide");
    }

    // Genera un token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Scadenza del token
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Errore durante il login:", error);
    res.status(500).send("Errore durante il login");
  }
};

// Funzione per recuperare i dettagli dell'utente
const getUserDetails = async (req, res) => {
  try {
    // Trova l'utente in base all'ID decodificato dal token, includendo la Company
    const user = await User.findByPk(req.userId, {
      attributes: ["firstName", "lastName", "email", "birthDate", "residence"], // Specifica i campi da restituire
      include: [
        {
          model: Company,
          as: "company",
          attributes: ["id", "address", "manager", "logo_path"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json("Utente non trovato");
    }

    res.json(user); // Restituisce i dati dell'utente, inclusa la Company
  } catch (error) {
    console.error("Errore durante il recupero dei dettagli:", error);
    res.status(500).json("Errore del server");
  }
};

module.exports = { registerUser, loginUser, getUserDetails };
