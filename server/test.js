var filesystem = Npm.require("fs");
var extension = '.csv'
var addressColName = 'ADDRESS'
var dirPath = "/home/isce-map-dev1/Documents/Geocode Thingies/Dura/20170509/SB Central"

var startGeocode = function(addressColName,dirPath) {

  var proceed = true;
  var concat = true;

  var concatenated = concat ? " (concatenated)" : ""
  addressColName = addressColName || 'Address'
  var arrAddressColName = [addressColName]

  // var concatStr = "Concatenated/(concatenated) "
  var concatStr = "/"
  var geocodeStr = "/Geocoded/(geocoded) "
  var arrAddressFields = [
    ["BUILDING_NAME", "FLOOR_NUMBER", "HOUSE_UNIT_LOT", "STREET_TYPE", "STREET_NAME", "SECTION", "POSTCODE", "CITY", "STATE"]
    // ["BUILDING_NAME", "FLR_LVL", "HSE_NUM", "STREET_TYPE", "STREET_NAME", "SECTION_NAME", "POSTAL_CODE", "CITY_NAME", "STATE"]
    // ["ADDR_BLDG_NAME", "ADDR_FLOOR_LEVEL", "ADDR_LOT_APT_NO", "ADDR_STREET_TYPE", "ADDR_STREET_NAME", "ADDR_SECTION", "ADDR_POSTAL", "ADDR_CITY", "STATE"],
    // ["BuildingName", "Floor", "Unit Number", "Street Type", "Street Name", "Section", "City", "State"]
  ]
  for(var i=0; i<44; i++){
    arrAddressFields.push(arrAddressFields[0])
  }
  // var arrAddressFields = [["HOUSE_UNIT_LOT", "BUILDING_NAME", "STREET_TYPE", "STREET_NAME", "SECTION", "POSTCODE", "CITY", "STATE"]]
  // var arrAddressFields = [["HSE_NUM", "FLR_LVL", "BUILDING_NAME", "STREET_TYPE", "STREET_NAME", "SECTION_NAME", "POSTAL_CODE", "CITY_NAME", "STATE_CODE"]]
  dirPath = dirPath


  if(proceed){
    var res = _getAllFilesFromFolder(dirPath)
    console.log("results [" + res.length + "]:", res);

    for(var i=0; i<res.length; i++){
      splitted = splitDirFile(res[i])
      console.log("results [" + i + "]:");
      if (!filesystem.existsSync(splitted[0] + "/Geocoded")){
        filesystem.mkdirSync(splitted[0] + "/Geocoded");
      }
      console.log("dir:", splitted[0]);
      console.log("file:", splitted[1]);
      if(concat){
        var arrConcat = GdsGeocoding.Concatenator.concatAddress(splitted[0] + concatStr + splitted[1] + extension, arrAddressFields[i], ",", addressColName);
        GdsGeocoding.Export.toCSV(arrConcat, splitted[0] + concatStr + splitted[1] + concatenated + extension);
      }
      // if(i>0) arrAddressColName = ["newaddress"]
      var arrAddress = GdsGeocoding.Extractor.extractCsv(splitted[0] + concatStr + splitted[1] + concatenated + extension, arrAddressColName);
      GdsGeocoding.Export.toCSV(arrAddress, splitted[0] + geocodeStr + splitted[1] + extension);
    }
  }

  // for(var i=0; i<arrFileName.length; i++){
  //   var arrConcat = GdsGeocoding.Concatenator.concatAddress(dirPath + arrFileName[i] + extension, arrAddressFields, ",", addressColName);
  //   GdsGeocoding.Export.toCSV(arrConcat, dirPath + "Concatenated/(concatenated) " + arrFileName[i] + extension);
  //   var arrAddress = GdsGeocoding.Extractor.extractCsv(dirPath + "Concatenated/(concatenated) " + arrFileName[i] + extension, addressColName);
  //   GdsGeocoding.Export.toCSV(arrAddress, dirPath + "Geocoded/(geocoded) " + arrFileName[i] + extension);
  // }
  // var arrAddress = GdsGeocoding.Extractor.extractCsv(arrFileName[0] + extension);
  // GdsGeocoding.Export.toCSV(arrAddress, arrFileName[0] + "(geocoded).csv");
  // var arrAddress = GdsGeocoding.Extractor.extractCsv(filePath + extension, 23);
  // GdsGeocoding.Export.toCSV(arrAddress, filePath + "(geocoded).csv");

  // GdsGeocoding.Concatenator.concatAddress(filePath + extension, arrAddressFields, ",", addressColName);
  // filePath += " (concatenated)";
  // var arrAddress = GdsGeocoding.Extractor.extractCsv(filePath + extension, addressColName);
  // GdsGeocoding.Export.toCSV(arrAddress, filePath + " (geocoded).csv");
}



var startTokenize= function(dirPath, tokenizeColName, tokenizedPrefix){
  var concatStr = "/"
  var tokenizeStr = "/Tokenized/(tokenized) "
  var res = _getAllFilesFromFolder(dirPath)
  console.log("results [" + res.length + "]:", res);

  for(var i=0; i<res.length; i++){
    splitted = splitDirFile(res[i])
    console.log("results [" + i + "]:");
    if (!filesystem.existsSync(splitted[0] + "/Tokenized")){
      filesystem.mkdirSync(splitted[0] + "/Tokenized");
    }
    console.log("dir:", splitted[0]);
    console.log("file:", splitted[1]);

    var arrAddress = GdsGeocoding.Extractor.tokenizeAddress(splitted[0] + concatStr + splitted[1] + extension, tokenizeColName, tokenizedPrefix);
    GdsGeocoding.Export.toCSV(arrAddress, splitted[0] + tokenizeStr + splitted[1] + extension);
  }

}

var _getAllFilesFromFolder = function(dir) {
    var results = [];

    filesystem.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else if (file.endsWith(extension)) {
          results.push(file);
        }
    });

    return results;

}

var splitDirFile = function(dirFile){
  arrSplit = dirFile.split("/")
  return [arrSplit.slice(0, arrSplit.length - 1).join("/"), arrSplit[arrSplit.length - 1].substring(0, arrSplit[arrSplit.length - 1].length - 4)]
}
console.time("Elapsed time: ");
startGeocode('ADDRESS',dirPath)
// startTokenize(dirPath, 'RISK_ADDRESS', 'tokenized_')
console.timeEnd("Elapsed time: ");
