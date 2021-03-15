const md5 = require("md5");
const config = require("../config/config");
const fs = require("fs");

/**
 * Return random alphabetical string
 * @param {Number} length
 * @returns {String}
 */
const generateAlpha = (length) => {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Return random Integer string
 * @param {Number} length
 * @returns {String}
 */
const generateInt = (length) => {
  let result = "";
  let characters = "0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    let character = characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );

    while (character === "0") {
      character = characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    result += character;
  }

  return result;
};

/**
 * Return random real number string
 * @param {Number} length
 * @returns {String}
 */
const generateRealNumber = (length) => {
  return (
    generateInt(generateLength(length / 2)) +
    "." +
    generateInt(generateLength(length / 2))
  );
};

/**
 * Return random alphenumberic string
 * @param {Number} length
 * @returns {String}
 */
const generateAlphNumeric = (length) => {
  let result = "";
  let characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz01234567890123456789";
  let charactersLength = characters.length;
  while (!/\d/.test(result) || !/[a-zA-Z]/g.test(result)) {
    result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  return result;
};

/**
 * Return random string length
 * @param {Number} max
 * @returns {Number}
 */
const generateLength = (max) => {
  return Math.floor(Math.random() * max) + 5;
};

/**
 * Return generate method type 0: alphabetical, 1: integer, 2: real number, 3: alphanumerics
 * @returns {Number}
 */
const generateType = () => {
  return Math.floor(Math.random() * 5) % 4;
};

/**
 * Return result of generated file and content information
 * @returns {Object}
 */
exports.generateAndSaveContent = () => {
  let fileName = md5(Date.now());
  let contentSize = 0;
  let result = {
    preview: "",
    alpha: 0,
    real: 0,
    integer: 0,
    alphanu: 0,
    downloadLink: config.generate_url + fileName,
  };

  try {
    while (contentSize <= config.contentLimit) {
      let length = generateLength(15);
      let item = "";
      let type = generateType();
      switch (type) {
        case 0:
          item = generateAlpha(length);
          result.alpha++;
          break;
        case 1:
          item = generateInt(length);
          result.real++;
          break;
        case 2:
          item = generateRealNumber(length);
          length += 1;
          result.integer++;
          break;
        case 3:
          item = generateAlphNumeric(length);
          result.alphanu++;
          break;
      }

      contentSize += length + 2;

      if (contentSize < 300) {
        result.preview = result.preview + item + ", ";
      }

      fs.appendFileSync(`${config.generate_path}/${fileName}`, item + ", ");
    }
    result.preview += "....";
  } catch (err) {
    console.error(err);
  }

  return result;
};
