const messages = require("../constants/messages");
const responseUtil = require("../utils/responses");
const helperUtil = require("../utils/helper");

/**
 * Generate a file with 4 objects
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.generate = async (req, res, next) => {
  try {
    let result = helperUtil.generateAndSaveContent();
    if (result) {
      return responseUtil.genericResponse(res, result);
    } else {
      return responseUtil.genericResponse(
        res,
        null,
        messages.generateError,
        "error",
        500
      );
    }
  } catch (error) {
    return responseUtil.genericResponse(
      res,
      null,
      messages.serverError,
      "error",
      500
    );
  }
};
