const https = require("https");

async function cloneServiceCharge(serviceCharge, destinationToken) {
  const options = {
    hostname: "api.anota.ai",
    port: 443,
    path: `/auth/establishment/edit-webview`,
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
      console.log("Taxas do garçom clonadas com sucesso!");
    });
  });

  req.write(serviceCharge);
  req.end();
}

async function changeServiceCharge(sourceStablishmentData, destinationToken) {
  const serviceCharge = JSON.stringify({
    waiter_accept_tip: sourceStablishmentData.webview.waiter_accept_tip,
    waiter_tip_percent: sourceStablishmentData.webview.waiter_tip_percent,
  });

  try {
    cloneServiceCharge(serviceCharge, destinationToken);
  } catch (err) {
    console.error("erro ao clonar formas de entrega!", err);
  }
}

module.exports = changeServiceCharge;
