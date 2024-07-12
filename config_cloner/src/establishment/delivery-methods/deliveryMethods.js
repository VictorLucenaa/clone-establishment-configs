const https = require("https");

async function cloneDeliveryMethods(unitId, deliveryMethods, destinationToken) {
  const options = {
    hostname: "api.anota.ai",
    port: 443,
    path: `/auth/establishment/establishment-unit/${unitId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: destinationToken,
    },
  };

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    res.on("data", (chunk) => {});

    res.on("end", () => {
      console.log("formas de entrega clonadas com sucesso!");
    });
  });
  req.write(deliveryMethods);
  req.end();
}

function filterDeliveryMethods(sourceStablishmentData) {
  return JSON.stringify({
    acceptDelivery: sourceStablishmentData.units[0].acceptDelivery,
    acceptLocal: sourceStablishmentData.units[0].acceptLocal,
    acceptTake: sourceStablishmentData.units[0].acceptTake,
  });
}

async function changeDeliveryMethods(
  sourceStablishmentData,
  destinationStablishmentData,
  destinationToken
) {
  const unitId = destinationStablishmentData.units[0]._id;
  const deliveryMethods = filterDeliveryMethods(sourceStablishmentData);

  try {
    if ((deliveryMethods && unitId !== null) || undefined) {
      cloneDeliveryMethods(unitId, deliveryMethods, destinationToken);
    } else {
      console.log(
        "Não foi possível clonar formas de entrega, dados não encontrados."
      );
    }
  } catch (err) {
    console.error("erro ao clonar formas de entrega!", err);
  }
}

module.exports = changeDeliveryMethods;
