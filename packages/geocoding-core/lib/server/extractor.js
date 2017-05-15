GdsGeocoding.Extractor = {};

var csvparse = Npm.require('csv-parse');
var fs = Npm.require("fs");


/**
*function to calculate & retrieve number of records in csv file
*
*@param {string} csvPath path to directory that contains csv file(s)
*@param {callback} cb callback for asynchronous function
*@return {integer} number of in csv file
*/
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
//function to wrap asynchronous function
GdsGeocoding.Extractor.getCsvSize = Meteor.wrapAsync(getCsvSizeAsync);

/**
*function to fetch all records in csv file
*
*@param {string} csvPath path to directory that contains csv file(s)
*@param {integer} lineLimit max number of records to be fetched
*@param {callback} cb callback for asynchronous function
*@return {array} of object of total records in csv file
*/
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
//function to wrap asynchronous function
GdsGeocoding.Extractor.getAddressArrayFromCsv = Meteor.wrapAsync(getAddressArrayFromCsvAsync);

/**
*function to extract all records and assign to process
*
*@param {string} csvPath path to directory that contains csv file(s)
*@param {string} addressColName name of the address column in the csv file
*@param {integer} lineLimit max number of records to be fetched
*@return {array} of object of total records in csv file that has been processed
*/
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

/**
*function to geocode address
*
*@param {string} addr address to geocode
*@param {array} arrAddress contains all the addresses fetched from csv file
*@param {integer} i index of the address
*@return {boolean} whether address is successfully geocoded or not
*/
var geocodeAddress = function(addr, arrAddress, i) {
  var arrResult = Remote.call("performSearch", addr);

  var bestAddress = Remote.call("getBestAddress", addr, arrResult);

  if(bestAddress === null){
      console.log("failed");
      arrAddress[i].Output_Address = "";
      arrAddress[i].Latitude = "";
      arrAddress[i].Longitude = "";
      arrAddress[i].isAccurate = "";
      arrAddress[i].Accuracy_Level = "";
      return false;
  }
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

/**
*function to process each address
*
*@param {string} address address to geocode
*@param {array} arrAddress contains all the addresses fetched from csv file
*@param {integer} j index of the address
*@param {string} addressColName name of the address column in the csv file
*@return {boolean} whether address is successfully geocoded or not
*/
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

/**
*function to filter address (e.g. trim, eliminates duplication)
*
*@param {string} address to be filtered
*@return {string} of filtered address
*/
var filterAddress = function(addr) {
  var uniqueList = addr.split(',');

  for(var i=0; i<uniqueList.length; i++)
    uniqueList[i] = uniqueList[i].trim();

  return uniqueList.filter(function(item,i,arrUnique){
    return i==arrUnique.indexOf(item);
  }).join(',');
}
