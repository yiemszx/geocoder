// console.log(Remote.call("tokenize", "12, Jalan Pandan 10/1"));

// var filePath = '/home/isceapp2/Desktop/Copy of Sample Address & Phone';
var addressColName = 'Address'
var extension = '.csv'
// var concatStr = "Concatenated/(concatenated) "
var concatStr = "/"
var geocodeStr = "/Geocoded/(geocoded) "
// var arrAddressFields = ["Address1", "Address2", "Address3"]
// var dirPath = "/home/isceapp2/Desktop/Geocode Thingies/TNB/"
var arrDirPaths = [
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AffinBank/",
                      "fileName": [ "AffinBank_changed_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/BaskinRobbins/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/BrandsOutlet/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/Buraqoil/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/ClinicMedicare/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/Courts/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AffinBank/",
                      "fileName": [ "AffinBank_changed_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    },
                    {
                      "dirPath" : "/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014/AmBankGroup/",
                      "fileName": [ "AmBankgroup_added_20160418", "AmBankgroup_changed_20160418", "AmBankgroup_deleted_20160418"],
                    }

                  ];
// var filePath = '/home/yiemszx/work/Jab Statistik CSV/Stats_address_new_geocoding';
// var filePath = '/home/yiemszx/work/Napic CSV/kajang petrol station 20160222-clear.csv';
var arrFileName = [
                    "Copy of Copy of TNB by STATE ePay Johor",
                    "Copy of Copy of TNB by STATE ePay Kedah",
                    "Copy of Copy of TNB by STATE ePay Kelantan",
                    "Copy of Copy of TNB by STATE ePay Melaka",
                    "Copy of Copy of TNB by STATE ePay N9",
                    "Copy of Copy of TNB by STATE ePay Pahang",
                    "Copy of Copy of TNB by STATE ePay Penang",
                    "Copy of Copy of TNB by STATE ePay Perak",
                    "Copy of Copy of TNB by STATE ePay Perlis",
                    "Copy of Copy of TNB by STATE ePay Sabah",
                    "Copy of Copy of TNB by STATE ePay Sarawak",
                    "Copy of Copy of TNB by STATE ePay Selangor",
                    "Copy of Copy of TNB by STATE ePay Terengganu",
                    "Copy of Copy of TNB by STATE ePay WP",
                  ];

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



var filesystem = Npm.require("fs");
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

};

var splitDirFile = function(dirFile){
  arrSplit = dirFile.split("/")
  return [arrSplit.slice(0, arrSplit.length - 1).join("/"), arrSplit[arrSplit.length - 1].substring(0, arrSplit[arrSplit.length - 1].length - 4)]
}

var res = _getAllFilesFromFolder("/home/isceapp2/Desktop/Geocode Thingies/En Wan/April2014")
console.log("results [" + res.length + "]:", res);

for(var i=0; i<res.length; i++){
  splitted = splitDirFile(res[i])
  console.log("results [" + i + "]:");
  if (!filesystem.existsSync(splitted[0] + "/Geocoded")){
    filesystem.mkdirSync(splitted[0] + "/Geocoded");
  }
  console.log("dir:", splitted[0]);
  console.log("file:", splitted[1]);
  var arrAddress = GdsGeocoding.Extractor.extractCsv(splitted[0] + concatStr + splitted[1] + extension, addressColName);
  GdsGeocoding.Export.toCSV(arrAddress, splitted[0] + geocodeStr + splitted[1] + extension);

}
