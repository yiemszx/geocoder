// console.log(Remote.call("tokenize", "12, Jalan Pandan 10/1"));

var filePath = '/home/yiemszx/work/Jab Statistik CSV/Stats_address_new_geocoding';
// var filePath = '/home/yiemszx/work/Napic CSV/kajang petrol station 20160222-clear.csv';
var arrFilePath = [
                    // '/home/yiemszx/work/Napic CSV/kajang landed lei 20160222-clear',
                    // '/home/yiemszx/work/Napic CSV/kajang petrol station 20160222-clear',
                    // '/home/yiemszx/work/Napic CSV/kajang landed ind 20160222-clear',
                    // '/home/yiemszx/work/Napic CSV/kajang shop 20160222-clear',
                    // '/home/yiemszx/work/Napic CSV/HafizTransactedNapic',
                    // '/home/yiemszx/work/Napic CSV/HafizInventoryNapic'

                    '/home/yiemszx/work/Jab Statistik CSV/Stats_address_new_geocoding 04032016'
                    // '/home/yiemszx/work/Jab Statistik CSV/Stats_address_new_geocoding 04032016(2)',
                    // '/home/yiemszx/work/Jab Statistik CSV/Stats_address_new_geocoding 04032016(3)',
                    // '/home/yiemszx/work/Jab Statistik CSV/Stats_address_new_geocoding 04032016(4)'
                  ];

for(var i=0; i<arrFilePath.length; i++){
  var arrAddress = GdsGeocoding.Extractor.extractCsv(arrFilePath[i] + ".csv");
  GdsGeocoding.Export.toCSV(arrAddress, arrFilePath[i] + "(geocoded).csv");
}
// var arrAddress = GdsGeocoding.Extractor.extractCsv(arrFilePath[0] + ".csv");
// GdsGeocoding.Export.toCSV(arrAddress, arrFilePath[0] + "(geocoded).csv");
// var arrAddress = GdsGeocoding.Extractor.extractCsv(filePath + ".csv", 23);
// GdsGeocoding.Export.toCSV(arrAddress, filePath + "(geocoded).csv");

// GdsGeocoding.Concatenator.concatAddress(filePath + ".csv", ["address"], ",", "Full_Address");
// filePath += " (concatenated)";
// var arrAddress = GdsGeocoding.Extractor.extractCsv(filePath + ".csv", 23);
// GdsGeocoding.Export.toCSV(arrAddress, filePath + " (geocoded).csv");
