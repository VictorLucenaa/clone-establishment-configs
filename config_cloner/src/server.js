const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importa o middleware cors
const cloneConfigs = require("./index"); // Altere o caminho conforme necessário

const app = express();
const port = 3000;

// Usa o middleware cors para permitir requisições de outros domínios
app.use(cors());

app.use(bodyParser.json());

app.post("/clone", async (req, res) => {
  const { sourceToken, destinationToken } = req.body;

  try {
    await cloneConfigs(sourceToken, destinationToken);
    res.status(200).send("Configurações clonadas com sucesso!");
  } catch (error) {
    console.error("Erro ao clonar configurações:", error);
    res.status(500).send("Erro ao clonar configurações.");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
