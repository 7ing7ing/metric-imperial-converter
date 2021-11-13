const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

let unitInput = [
  "gal",
  "l",
  "mi",
  "km",
  "lbs",
  "kg",
  "GAL",
  "L",
  "MI",
  "KM",
  "LBS",
  "KG",
];
let recognizedUnit = [
  "gal",
  "L",
  "mi",
  "km",
  "lbs",
  "kg",
  "gal",
  "L",
  "mi",
  "km",
  "lbs",
  "kg",
];

let unitOutput = [
  "L",
  "gal",
  "km",
  "mi",
  "kg",
  "lbs",
  "L",
  "gal",
  "km",
  "mi",
  "kg",
  "lbs",
];

let spelledOut = [
  "gallons",
  "liters",
  "miles",
  "kilometers",
  "pounds",
  "kilograms",
  "gallons",
  "liters",
  "miles",
  "kilometers",
  "pounds",
  "kilograms",
];

describe("Unit Tests", function () {
  describe("ConvertHandler functions", function () {
    it("Should correctly read a whole number input.", function () {
      assert.equal(convertHandler.getNum("10L"), 10);
    });

    it("Should correctly read a decimal number input.", function () {
      assert.equal(convertHandler.getNum("10.50L"), 10.5);
    });

    it("Should correctly read a fractional input.", function () {
      assert.equal(convertHandler.getNum("1/3L"), 1 / 3);
    });

    it("Should correctly read a fractional input with a decimal.", function () {
      assert.equal(convertHandler.getNum("1/3.5L"), 1 / 3.5);
    });

    it("Should correctly return an error on a double-fraction", function () {
      assert.equal(convertHandler.getNum("3/2/3L"), undefined);
    });

    it("Should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
      assert.equal(convertHandler.getNum("L"), 1);
    });

    it("Should correctly read each valid input unit", function () {
      unitInput.forEach(function (elem, index) {
        assert.equal(convertHandler.getUnit(elem), recognizedUnit[index]);
      });
    });

    it("Should correctly return an error for an invalid input unit.", function () {
      assert.equal(convertHandler.getUnit("incorrectUnit"), "invalid unit");
    });

    it("Should return the correct return unit for each valid input unit.", function () {
      unitInput.forEach(function (elem, index) {
        assert.equal(convertHandler.getReturnUnit(elem), unitOutput[index]);
      });
    });

    it("Should correctly return the spelled-out string unit for each valid input unit.", function () {
      unitInput.forEach(function (elem, index) {
        assert.equal(convertHandler.spellOutUnit(elem), spelledOut[index]);
      });
    });

    it("Should correctly convert gal to L.", function () {
      assert.equal(convertHandler.convert(1, "gal"), 3.78541);
    });

    it("Should correctly convert L to gal.", function () {
      assert.equal(convertHandler.convert(1, "L"), 0.26417);
    });

    it("Should correctly convert mi to km.", function () {
      assert.equal(convertHandler.convert(1, "mi"), 1.60934);
    });

    it("Should correctly convert km to mi.", function () {
      assert.equal(convertHandler.convert(1, "km"), 0.62137);
    });

    it("Should correctly convert lbs to kg.", function () {
      assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
    });

    it("Should correctly convert kg to lbs.", function () {
      assert.equal(convertHandler.convert(1, "kg"), 2.20462);
    });
  });
});
