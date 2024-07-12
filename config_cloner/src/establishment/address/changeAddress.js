const https = require("https");

const {
  getDestinationStablishment,
  getSourceStablishment,
} = require("../utilities/stablishment-data");

function changeDestinationAddress(unitId, address, destinationToken) {
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

  const data = JSON.stringify({
    address: {
      name: address.name,
      num: address.num,
      complement: address.complement,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      addressFormated: address.addressFormated,
      location: address.location,
      hided: address.hided,
      reference: address.reference,
    },
  });

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    res.on("data", (chunk) => {});

    res.on("end", () => {
      console.log("Endereço clonado com sucesso!");
    });
  });

  req.write(data);
  req.end();
}

async function changeAddress(
  sourceStablishmentData,
  destinationStablishmentData,
  destinationToken
) {
  try {
    if (sourceStablishmentData.units[0].address) {
      const address = sourceStablishmentData.units[0].address;

      changeDestinationAddress(
        destinationStablishmentData.units[0]._id,
        address,
        destinationToken
      );
    }
  } catch (err) {
    console.log("Erro ao trocar endereço!", err);
  }
}
(module.exports = changeAddress), changeDestinationAddress;
