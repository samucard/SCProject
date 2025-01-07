const User = require("./models/User");

(async () => {
  try {
    await User.sync({ alter: true });
    console.log("La tabella User è stata sincronizzata");
  } catch (error) {
    console.error("Errore durante la sincronizzazione:", error);
  }
})();
