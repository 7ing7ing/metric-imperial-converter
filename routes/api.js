"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) {
      res.send("invalid number and unit");
    }
    if (!initNum) {
      res.send("invalid number");
    }
    if (!initUnit) {
      res.send("invalid unit");
    }
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      ),
    });
  });
};
