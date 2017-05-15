GdsGeocoding.Concatenator = {};

var concatFields = function (address, arrFields, seperator) {
  var str = "";
  for(var i=0; i<arrFields.length; i++){
    if(address[arrFields[i]] && address[arrFields[i]] !== "-" && address[arrFields[i]].toUpperCase() !== "NULL" && address[arrFields[i]].toUpperCase() !== "NIL"){
      // console.log("address[arrFields[i]]:", address[arrFields[i]]);
      if(arrFields[i].toUpperCase() === "ADDR_STREET_TYPE" || arrFields[i].toUpperCase() === "STREET TYPE" ||  arrFields[i].toUpperCase() === "STREET_TYPE")
        str += address[arrFields[i]] + " ";
      else
        str += address[arrFields[i]] + seperator + " ";
    }
  }
  str = str.slice(0,-2).toUpperCase().replace(/MALAYSIA$/, "")
  return str;
}

GdsGeocoding.Concatenator.getColumnName = function (csvPath) {
  var arrAddress = GdsGeocoding.Extractor.getAddressArrayFromCsv(csvPath, 1);
  var keysAtIndex = [];

  if(arrAddress.length > 0)
    keysAtIndex = Object.keys(arrAddress[0]);

  return keysAtIndex;
}

var getOrder = function (arrColumns) {
  var arrOrders = [];

  return arrOrders;
}

GdsGeocoding.Concatenator.concatAddress = function (csvPath, arrFields, seperator, name) {
  var arrConcat = [];
  var csvSize = GdsGeocoding.Extractor.getCsvSize(csvPath);
  var arrAddress = GdsGeocoding.Extractor.getAddressArrayFromCsv(csvPath, csvSize);
  var arrFields = /*["PROJECT_NAME", "DISTRICT_NAME", "TOWN_NAME", "STATE_NAME"] || */arrFields;
  var seperator = seperator || ",";

  for(var i=0; i<arrAddress.length; i++){
    var address = arrAddress[i];
    address[name] = concatFields(address, arrFields, seperator);
    arrConcat.push(address);
  }

  return arrConcat;
}
