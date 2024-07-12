const https = require("https");

async function cloneDeliveryRegions(unitId, deliveryRegions, destinationToken) {
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
      console.log("regiões de entrega clonadas com sucesso!");
    });
  });

  req.write(deliveryRegions);
  req.end();
}

function changeDeliveryRegions(
  sourceStablishmentData,
  destinationStablishmentData,
  destinationToken
) {
  const deliveryRegions = JSON.stringify({
    name: sourceStablishmentData.units[0].name,
    regions: sourceStablishmentData.units[0].regions,
  });

  const unitId = destinationStablishmentData.units[0]._id;

  try {
    cloneDeliveryRegions(unitId, deliveryRegions, destinationToken);
  } catch (err) {
    console.error("erro ao clonar formas de entrega!", err);
  }
}

module.exports = changeDeliveryRegions;
