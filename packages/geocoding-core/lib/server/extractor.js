GdsGeocoding.Extractor = {};

var csvparse = Npm.require('csv-parse');
var fs = Npm.require("fs");

var getCsvSizeAsync = function (csvPath, cb) {
  var input = fs.createReadStream(csvPath);
  var parser = csvparse({
                          columns: true
                        });

  input.pipe(parser);

  parser.on('readable', function(){
    while((record = parser.read())){
      record = parser.read()
    }
  });

  parser.on('error', function(err){
    console.log("parse error: ", err.message);
  });

  parser.on('finish', function(){
    cb(null, parser.count);
  });
}
GdsGeocoding.Extractor.getCsvSize = Meteor.wrapAsync(getCsvSizeAsync);

var getAddressArrayFromCsvAsync = function (csvPath, lineLimit, cb) {
  var input = fs.createReadStream(csvPath);
  var output = [];
  var parser = csvparse({
                          columns: true
                        });

  input.pipe(parser);

  parser.on('readable', function(){
    while((record = parser.read()) && parser.count <= lineLimit){
      output.push(record);
      // console.log(parser.count)
    }
  });
  // Catch any error
  parser.on('error', function(err){
    console.log(err.message);
  });

  parser.on('finish', function(){
    cb(null, output);
  });
}
GdsGeocoding.Extractor.getAddressArrayFromCsv = Meteor.wrapAsync(getAddressArrayFromCsvAsync);

GdsGeocoding.Extractor.extractCsv = function(csvPath, addressColName, lineLimit) {
  var limit = lineLimit || GdsGeocoding.Extractor.getCsvSize(csvPath);
  var arrAddress = GdsGeocoding.Extractor.getAddressArrayFromCsv(csvPath, limit);
  console.log("Total parsed address: ", arrAddress.length);
  // console.log("Parsed address: ", arrAddress);

  for(var i=0; i<arrAddress.length; i++){
    var success = GdsGeocoding.Extractor.processAddress(arrAddress[i], arrAddress, i, addressColName[0]);
    if(!success && addressColName.length > 1 && arrAddress[i][addressColName[0]] !== arrAddress[i][addressColName[1]])
      var success = GdsGeocoding.Extractor.processAddress(arrAddress[i], arrAddress, i, addressColName[1]);
    console.log("Processing address #" + (i+1) + " out of " + arrAddress.length + ". Success?:", success);
  }

  return arrAddress;
}

GdsGeocoding.Extractor.processAddress = function(address, arrAddress, j, addressColName) {
  var arrKeys = Object.keys(address);
  var addressIndex = arrKeys.indexOf(addressColName);
  if(addressIndex >= 0) {
    var addr = address[arrKeys[addressIndex]].trim();
    addr = filterAddress(addr);

    return geocodeAddress(addr, arrAddress, j);
  }

  return false;
}

var geocodeAddress = function(addr, arrAddress, i) {
  var arrResult = Remote.call("performSearch", addr);

  var bestAddress = Remote.call("getBestAddress", addr, arrResult);
  if(bestAddress !== null){
    if(bestAddress.dictionary){
      console.log("from dictionary");
      arrAddress[i].Output_Address = bestAddress.dictionary.formattedAddress;
      arrAddress[i].Latitude = bestAddress.dictionary.latitude;
      arrAddress[i].Longitude = bestAddress.dictionary.longitude;
      arrAddress[i].isAccurate = bestAddress.accurate;
      arrAddress[i].Accuracy_Level = bestAddress.level;
    }
    else {
      console.log("from listing");
      arrAddress[i].Output_Address = bestAddress.formattedAddress;
      arrAddress[i].Latitude = bestAddress.latitude;
      arrAddress[i].Longitude = bestAddress.longitude;
      arrAddress[i].isAccurate = bestAddress.accurate;
      arrAddress[i].Accuracy_Level = bestAddress.level;
    }
    return true;
  }
  else{
    console.log("failed");
    arrAddress[i].Output_Address = "";
    arrAddress[i].Latitude = "";
    arrAddress[i].Longitude = "";
    arrAddress[i].isAccurate = "";
    arrAddress[i].Accuracy_Level = "";
    return false;
  }
}

var filterAddress = function(addr) {
  // var addr = (addr).replace(/"/g,"");
  // var addr = (addr).replace(" MALAYSIA","");
  var uniqueList=addr.split(',');

  for(var i=0; i<uniqueList.length; i++)
    uniqueList[i] = uniqueList[i].trim();

  return uniqueList.filter(function(item,i,allItems){
    return i==allItems.indexOf(item);
  }).join(',');
}
