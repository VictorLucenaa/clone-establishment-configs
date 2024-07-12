const https = require("https");

async function cloneDeliveryTime(unitId, time, destinationToken) {
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
      console.log("Horário clonado com sucesso!");
    });
  });

  req.write(time);
  req.end();
}

function filterStablishmentTime(sourceStablishmentData) {
  return JSON.stringify({
    is_always_open: sourceStablishmentData.units[0].is_always_open,
    is_permanently_closed:
      sourceStablishmentData.units[0].is_permanently_closed,
    only_schedule: sourceStablishmentData.units[0].only_schedule,
    schedules: "",
    timezone: sourceStablishmentData.units[0].timezone,
    week: sourceStablishmentData.units[0].week,
  });
}

async function changeStablishmentTime(
  sourceStablishmentData,
  destinationStablishmentData,
  destinationToken
) {
  const time = filterStablishmentTime(sourceStablishmentData);
  const unitId = destinationStablishmentData.units[0]._id;

  try {
    if ((time && unitId !== null) || undefined) {
      cloneDeliveryTime(unitId, time, destinationToken);
    } else {
      console.log("Não foi possível clonar horários, dados não encontrados.");
    }
  } catch (err) {
    console.error("erro ao clonar horários do estabelecimento", err);
  }
}

module.exports = changeStablishmentTime;
