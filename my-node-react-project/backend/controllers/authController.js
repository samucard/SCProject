const path = require("path");
const fs = require("fs");
const { User, Company } = require("../models");

const registerUser = async (req, res) => {
  try {
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

    // Creare un nuovo utente
    const newUser = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      birthDate,
      residence,
    });

    // Gestire il caricamento del file logo
    let logoPath = null;
    if (req.file) {
      const logoFilename = `${newUser.id}-${Date.now()}.svg`;
      logoPath = path.join("uploads/logos", logoFilename);
      fs.writeFileSync(logoPath, req.file.buffer);
    }

    // Creare una nuova azienda collegata all'utente
    await Company.create({
      address,
      manager,
      logo_path: logoPath,
      userId: newUser.id,
    });

    res.status(201).json({ message: "Registrazione completata con successo" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore durante la registrazione" });
  }
};
