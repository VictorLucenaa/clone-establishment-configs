const https = require("https");

const { getSourceStablishment } = require("../utilities/stablishment-data");

async function changeStablishmentInfo(
  sourceStablishmentData,
  destinationToken
) {
  const options = {
    hostname: "api.anota.ai",
    port: 443,
    path: `/auth/establishment/edit-public-infos`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: destinationToken,
    },
  };

  const data = filterResponseData(sourceStablishmentData);

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    res.on("data", (chunk) => {});

    res.on("end", () => {
      console.log("Informações da loja clonadas com sucesso!");
    });
  });

  req.write(data);
  req.end();
}

function filterResponseData(sourceStablishmentData) {
  const filteredData = JSON.stringify({
    company_name: sourceStablishmentData.sign.company_name,
    cpf_cnpj: sourceStablishmentData.sign.cpf_cnpj.value,
    cpf_cnpj_type: sourceStablishmentData.sign.cpf_cnpj.type,
    fantasy_name: sourceStablishmentData.units[0].name,
    image: sourceStablishmentData.page_image,
    phones: sourceStablishmentData.units[0].phones,
    segments: sourceStablishmentData.segments,
  });

  return filteredData;
}

module.exports = changeStablishmentInfo;
