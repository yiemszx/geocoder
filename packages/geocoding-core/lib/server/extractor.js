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
  // console.log(address)
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
      arrAddress[i].Output_Apt = bestAddress.apt;
      arrAddress[i].Output_Street = bestAddress.street;
      arrAddress[i].Output_Section = bestAddress.dictionary.section;
      arrAddress[i].Output_City = bestAddress.dictionary.city;
      arrAddress[i].Output_State = bestAddress.state;
      arrAddress[i].Latitude = bestAddress.dictionary.latitude;
      arrAddress[i].Longitude = bestAddress.dictionary.longitude;
      arrAddress[i].isAccurate = bestAddress.accurate;
      arrAddress[i].Accuracy_Level = bestAddress.level;
    }
    else {
      console.log("from listing");
      arrAddress[i].Output_Address = bestAddress.formattedAddress;
      arrAddress[i].Output_Apt = bestAddress.apt;
      arrAddress[i].Output_Street = bestAddress.street;
      arrAddress[i].Output_Section = bestAddress.section;
      arrAddress[i].Output_City = bestAddress.city;
      arrAddress[i].Output_State = bestAddress.state;
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
    arrAddress[i].Output_Apt = "";
    arrAddress[i].Output_Street = "";
    arrAddress[i].Output_Section = "";
    arrAddress[i].Output_City = "";
    arrAddress[i].Output_State = "";
    arrAddress[i].Latitude = "";
    arrAddress[i].Longitude = "";
    arrAddress[i].isAccurate = "";
    arrAddress[i].Accuracy_Level = "";
    return false;
  }
}

GdsGeocoding.Extractor.tokenizeAddress = function(csvPath, addressColName, prefix, lineLimit) {
  var limit = lineLimit || GdsGeocoding.Extractor.getCsvSize(csvPath);
  var arrAddress = GdsGeocoding.Extractor.getAddressArrayFromCsv(csvPath, limit);
  var arrAddressColName = addressColName.split(',')
  console.log("Total parsed address: ", arrAddress.length);
  // console.log("Parsed address: ", arrAddress);

  for(var i=0; i<arrAddress.length; i++){
    var address = arrAddress[i];
    var arrKeys = Object.keys(address);

    arrAddressColName.forEach(function(addressColName){
      var addressIndex = arrKeys.indexOf(addressColName);

      if(addressIndex >= 0){
        var addr = address[arrKeys[addressIndex]].trim();

        var tokenized = Remote.call("tokenize", addr);
        arrAddress[i][prefix + addressColName + "_Name"] = tokenized.name;
        arrAddress[i][prefix + addressColName + "_No"] = tokenized.apt;
        arrAddress[i][prefix + addressColName + "_Street"] = tokenized.street;
        arrAddress[i][prefix + addressColName + "_Postcode"] = tokenized.postcode;
        arrAddress[i][prefix + addressColName + "_Section"] = tokenized.section;
        arrAddress[i][prefix + addressColName + "_City"] = tokenized.city;
        arrAddress[i][prefix + addressColName + "_State"] = tokenized.state;

        // console.log(arrAddress[i]);
      }
    })
  }
  return arrAddress
}
var filterAddress = function(addr) {
  // console.log("before:", addr)
  // addr = (addr).replace(/[\\]+"+/g,"");
  // console.log("after:", addr)
    // var addr = (addr).replace(/"/g,"");
  // var addr = (addr).replace(" MALAYSIA","");
  var uniqueList=addr.split(',');

  for(var i=0; i<uniqueList.length; i++)
    uniqueList[i] = uniqueList[i].trim();

  return uniqueList.filter(function(item,i,allItems){
    return i==allItems.indexOf(item);
  }).join(',');
}
