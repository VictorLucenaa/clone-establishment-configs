const https = require("https");

async function clonePaymentMethods(unitId, paymentMethods, destinationToken) {
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
      console.log("Formas de pagamento clonadas com sucesso!");
    });
  });

  req.write(paymentMethods);
  req.end();
}

function changePaymentMethods(
  sourceStablishmentData,
  destinationStablishmentData,
  destinationToken
) {
  const unitId = destinationStablishmentData.units[0]._id;

  const paymentMethods = JSON.stringify({
    credit_cards: sourceStablishmentData.units[0].credit_cards,
    goToPaymentOnlineRegister: false,
    payment_method: sourceStablishmentData.units[0].payment_method,
    payment_method_qr_code:
      sourceStablishmentData.units[0].payment_method_qr_code,
    show_option_credit: sourceStablishmentData.show_option_credit,
    show_option_pix: sourceStablishmentData.show_option_pix,
    zoop: sourceStablishmentData.units[0].zoop,
    _id: unitId,
  });

  try {
    clonePaymentMethods(unitId, paymentMethods, destinationToken);
  } catch (err) {
    console.error("erro ao clonar formas de entrega!", err);
  }
}

module.exports = changePaymentMethods;
