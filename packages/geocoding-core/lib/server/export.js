GdsGeocoding.Export = {};
var aptCount =0, streetCount =0, sectionCount = 0, cityCount = 0, stateCount = 0, dashCount = 0, noneCount = 0;
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

      aptCount = json.Accuracy_Level === "apt" ? aptCount + 1 : aptCount
      streetCount = json.Accuracy_Level === "street" ? streetCount + 1 : streetCount
      sectionCount = json.Accuracy_Level === "section" ? sectionCount + 1 : sectionCount
      cityCount = json.Accuracy_Level === "city" ? cityCount + 1 : cityCount
      stateCount = json.Accuracy_Level === "state" ? stateCount + 1 : stateCount
      dashCount = json.Accuracy_Level === "-" ? dashCount + 1 : dashCount
      noneCount = json.Accuracy_Level === "none" ? noneCount + 1 : noneCount
    // json.address = (json.address).replace(/"/g,"");
    var keysAtIndex = Object.keys(json);

    var newObj =  { };
    // console.log("keysAtIndex:", keysAtIndex);
    for(var j=0; j<keysAtIndex.length; j++){
      newObj[keysAtIndex[j]] = typeof (json[keysAtIndex[j]]) === "string" ? '"' + json[keysAtIndex[j]].replace(/[\\]+"+/g, "") + '"' : '"' + json[keysAtIndex[j]] + '"'
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
  wstream.end(function () {
      console.log('Done!');
      console.log('aptCount:', aptCount)
      console.log('streetCount:', streetCount)
      console.log('sectionCount:', sectionCount)
      console.log('cityCount:', cityCount)
      console.log('stateCount:', stateCount)
      console.log('dashCount:', dashCount)
      console.log('noneCount:', noneCount)
  });
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
