const { validateCreateRequestAirport } = require("./aiport-middleware");
const {
  validateCreateRequest,
  validatePatchRequest,
  validatePutRequest,
} = require("./airplane-middleware");
const { validateFlightRequest } = require("./flight-middleware");

module.exports = {
  validateCreateRequest,
  validatePatchRequest,
  validatePutRequest,
  validateCreateRequestAirport,
  validateFlightRequest,
};
