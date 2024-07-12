const https = require("https");

function getSourceStablishment(token) {
  const options = {
    hostname: "api.anota.ai",
    path: `/auth/establishment`,
    headers: {
      Authorization: token,
    },
  };

  return new Promise((resolve, reject) => {
    https
      .get(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (json !== null || undefined) {
              console.log("Unidade de origem encontrada");
              resolve(json);
            } else {
              console.log("Unidade de origem não encontrada");
              reject("Unidade de origem não encontrada");
            }
          } catch (err) {
            console.error(
              "Erro ao processar a resposta da unidade de origem:",
              err
            );
            reject(err);
          }
        });
      })
      .on("error", (e) => {
        console.error(`Erro: ${e.message}`);
        reject(e);
      });
  });
}

function getDestinationStablishment(token) {
  const options = {
    hostname: "api.anota.ai",
    path: `/auth/establishment`,
    headers: {
      Authorization: token,
    },
  };

  return new Promise((resolve, reject) => {
    https
      .get(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (json !== null || undefined) {
              console.log("Unidade de destino encontrada");
              resolve(json);
            } else {
              console.log("Unidade de destino não encontrada");
              reject("Unidade de destino não encontrada");
            }
          } catch (err) {
            console.error(
              "Erro ao processar a resposta da unidade de destino:",
              err
            );
            reject(err);
          }
        });
      })
      .on("error", (e) => {
        console.error(`Erro: ${e.message}`);
        reject(e);
      });
  });
}

module.exports = { getSourceStablishment, getDestinationStablishment };
