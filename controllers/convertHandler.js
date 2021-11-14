function ConvertHandler() {
  this.getNum = function (input) {
    let result = input.substring(0, input.search(/[a-zA-Z]/));
    if (result === "") {
      result = "1";
    }
    if (result.indexOf("/") !== -1) {
      var numAndDen = result.split("/");
      if (numAndDen.length > 2) {
        return undefined;
      }
      result = numAndDen[0] / numAndDen[1];
    }
    return parseFloat(result);
  };

  this.getUnit = function (input) {
    let unit = input.substring(input.search(/[a-zA-Z]/));
    if (!this.spellOutUnit(unit)) {
      return undefined;
    }
    if (unit !== "L") {
      unit = unit.toLowerCase();
    }
    if (unit === "l") {
      unit = unit.toUpperCase();
    }
    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    initUnit = initUnit.toLowerCase();
    switch (initUnit) {
      case "gal":
        return "L";
        break;
      case "l":
        return "gal";
        break;
      case "mi":
        return "km";
        break;
      case "km":
        return "mi";
        break;
      case "lbs":
        return "kg";
        break;
      case "kg":
        return "lbs";
        break;
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function (unit) {
    unit = unit.toLowerCase();
    switch (unit) {
      case "gal":
        return "gallons";
        break;
      case "l":
        return "liters";
        break;
      case "mi":
        return "miles";
        break;
      case "km":
        return "kilometers";
        break;
      case "lbs":
        return "pounds";
        break;
      case "kg":
        return "kilograms";
        break;
      default:
        return undefined;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    initUnit = initUnit.toLowerCase();
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        return undefined;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return (
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum +
      " " +
      this.spellOutUnit(returnUnit)
    );
  };
}

module.exports = ConvertHandler;
