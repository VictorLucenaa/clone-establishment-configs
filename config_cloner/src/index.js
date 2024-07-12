const {
  sourceToken,
  destinationToken,
} = require("./establishment/utilities/Jwt");

const {
  getDestinationStablishment,
  getSourceStablishment,
} = require("./establishment/utilities/stablishment-data");

const changeAddress = require("./establishment/address/changeAddress");
const changeStablishmentInfo = require("./establishment/info/changeInfo");
const changeStablishmentTime = require("./establishment/stablishment-time/stablishmentTime");
const changeDeliveryTime = require("./establishment/delivery-time/deliveryTime");
const changeDeliveryMethods = require("./establishment/delivery-methods/deliveryMethods");
const changeMinimumRate = require("./establishment/minimum-rate/minimumRate");
const changeServiceCharge = require("./establishment/service-charge/serviceCharge");
const changeDeliveryRegions = require("./establishment/regions/deliveryRegions");
const changePaymentMethods = require("./establishment/payment-methods/paymentMethods");

async function cloneConfigs(sourceToken, destinationToken) {
  const sourceStablishmentData = await getSourceStablishment(sourceToken);
  const destinationStablishmentData = await getDestinationStablishment(
    destinationToken
  );

  changeAddress(
    sourceStablishmentData,
    destinationStablishmentData,
    destinationToken
  );

  changeStablishmentTime(
    sourceStablishmentData,
    destinationStablishmentData,
    destinationToken
  );

  changeStablishmentInfo(sourceStablishmentData, destinationToken);

  changeDeliveryTime(
    sourceStablishmentData,
    destinationStablishmentData,
    destinationToken
  );

  changeDeliveryMethods(
    sourceStablishmentData,
    destinationStablishmentData,
    destinationToken
  );

  changeMinimumRate(sourceStablishmentData, destinationToken);

  changeServiceCharge(sourceStablishmentData, destinationToken);

  changeDeliveryRegions(
    sourceStablishmentData,
    destinationStablishmentData,
    destinationToken
  );

  changePaymentMethods(
    sourceStablishmentData,
    destinationStablishmentData,
    destinationToken
  );
}

module.exports = cloneConfigs;
