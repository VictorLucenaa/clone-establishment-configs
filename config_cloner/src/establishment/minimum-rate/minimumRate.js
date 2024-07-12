const https = require("https");

async function cloneMinimumRate(minimumRate, destinationToken) {
  const options = {
    hostname: "api.anota.ai",
    port: 443,
    path: `/auth/establishment`,
    method: "POST",
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
  req.write(minimumRate);
  req.end();
}

async function changeMinimumRate(sourceStablishmentData, destinationToken) {
  const minimumRate = JSON.stringify({
    minimum_order_amount: sourceStablishmentData.minimum_order_amount,
  });

  try {
    cloneMinimumRate(minimumRate, destinationToken);
  } catch (err) {
    console.error("erro ao clonar formas de entrega!", err);
  }
}

module.exports = changeMinimumRate;
