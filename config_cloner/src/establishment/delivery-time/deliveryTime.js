const https = require("https");

async function cloneDeliveryTime(unitId, deliveryTime, destinationToken) {
  const options = {
    hostname: "api.anota.ai",
    port: 443,
    path: `/auth/establishment/establishment-unit/exptime/${unitId}`,
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
      console.log("Horários de entrega clonados com sucesso!");
    });
  });
  req.write(deliveryTime);
  req.end();
}

function filterDeliveryTime(sourceStablishmentData, unitId) {
  return JSON.stringify({
    time_delivery_max: sourceStablishmentData.units[0].time_delivery_max,
    time_delivery_min: sourceStablishmentData.units[0].time_delivery_min,
    time_take_max: sourceStablishmentData.units[0].time_take_max,
    time_take_min: sourceStablishmentData.units[0].time_take_min,
    _id: unitId,
  });
}

async function changeDeliveryTime(
  sourceStablishmentData,
  destinationStablishmentData,
  destinationToken
) {
  const unitId = destinationStablishmentData.units[0]._id;
  const deliveryTime = filterDeliveryTime(sourceStablishmentData, unitId);

  try {
    if ((deliveryTime && unitId !== null) || undefined) {
      cloneDeliveryTime(unitId, deliveryTime, destinationToken);
    } else {
      console.log(
        "Não foi possível clonar horários de entrega, dados não encontrados."
      );
    }
  } catch (err) {
    console.error("erro ao clonar horários de entrega!", err);
  }
}

module.exports = changeDeliveryTime;
