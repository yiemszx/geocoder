GdsGeocoding.Export = {};

var JSON2CSV = function (objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    var line = '';

    var head = array[0];
    for (var index in array[0])
        line += index + ',';

    line = line.slice(0, -1);
    str += line + '\r\n';


    for (var i = 0; i < array.length; i++) {
        var line = '';

        for (var index in array[i])
            line += array[i][index] + ',';

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
}


var modifyStructure = function(arrAddress, exportObj) {
  var newArr = [];

  for(var i=0; i<arrAddress.length; i++){
    var json = arrAddress[i];
    json.address = (json.address).replace(/"/g,"");
    var keysAtIndex = Object.keys(json);

    var newObj =  { };
    // console.log("keysAtIndex:", keysAtIndex);
    for(var j=0; j<keysAtIndex.length; j++){
      newObj[keysAtIndex[j]] = '"' + json[keysAtIndex[j]] + '"';
    }
    // console.log("newObj", newObj)
    // addressUpdateDelivery(json._id, deliveryID);
    newArr.push(newObj);
  }
  // deliveryUpdate(deliveryID);
  return newArr;
}

var createCSV = function(csvStr, path, append) {
  var fs = Npm.require("fs");
  var stats;

  try {
    stats = fs.statSync(path);
    csvStr = csvStr.split("\n").slice(1).join("\n");
    var wstream = fs.createWriteStream(path, {'flags': 'a'});
  }
  catch (e) {
    var wstream = fs.createWriteStream(path);
  }

  wstream.write(csvStr);
  wstream.end(function () { console.log('Done!'); });
}

GdsGeocoding.Export.toCSV = function (arr, path) {
  var arrAddress = arr;
  console.log("arrAddress.length:", arrAddress.length)
  // console.log("arrAddress:", arrAddress)
  var newArr = modifyStructure(arrAddress);

  var csvStr = JSON2CSV(newArr);
  var append = false;
  createCSV(csvStr, path, append);
}

GdsGeocoding.Export.filterCount = function (exportObj) {
  var arrAddress = getAddresses(exportObj);
  return arrAddress.length;
}
