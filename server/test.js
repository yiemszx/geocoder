const filesystem = Npm.require('fs');
const extension = '.csv';
// const dirPath = 'D:/Work/Geocode Thingies/Anida/Webe 1710 171120';
const dirPath = 'D:/Work/Geocode Thingies/Anida/Webe 1803 180308/test';
const addressColName = 'ADDRESS';
const proceed = true;
const concat = true;


const getAllFilesFromFolder = (dir) => {
  let results = [];

  filesystem.readdirSync(dir).forEach((preFile) => {
    const file = `${dir}/${preFile}`;
    const stat = filesystem.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFilesFromFolder(file));
    } else if (file.endsWith(extension)) {
      results.push(file);
    }
  });

  return results;
};

const splitDirFile = (dirFile) => {
  const arrSplit = dirFile.split('/');
  return [arrSplit.slice(0, arrSplit.length - 1).join('/'), arrSplit[arrSplit.length - 1].substring(0, arrSplit[arrSplit.length - 1].length - 4)];
};

const startTokenize = (tokenizeColName, tokenizedPrefix) => {
  const concatStr = '/';
  const tokenizeStr = '/Tokenized/(tokenized) ';
  const res = getAllFilesFromFolder(dirPath);
  console.log(`results [${res.length}]:`, res);

  for (let i = 0; i < res.length; i++) {
    const splitted = splitDirFile(res[i]);
    console.log(`results [${i}]:`);
    if (!filesystem.existsSync(`${splitted[0]}/Tokenized`)) {
      filesystem.mkdirSync(`${splitted[0]}/Tokenized`);
    }
    console.log('dir:', splitted[0]);
    console.log('file:', splitted[1]);
    const outputTarget = splitted[0] + concatStr + splitted[1] + extension;
    const arrAddress = GdsGeocoding.Extractor.tokenizeAddress(outputTarget, tokenizeColName, tokenizedPrefix);
    GdsGeocoding.Export.toCSV(arrAddress, splitted[0] + tokenizeStr + splitted[1] + extension);
  }
};

const startGeocode = () => {
  const concatenated = concat ? ' (concatenated)' : '';
  const arrAddressColName = [addressColName];

  // var concatStr = "Concatenated/(concatenated) "
  const concatStr = '/';
  const geocodeStr = '/Geocoded/(geocoded) ';
  const arrAddressFields = [
    // ["BUILDING_NAME", "FLOOR_NUMBER", "HOUSE_UNIT_LOT", "STREET_TYPE", "STREET_NAME", "SECTION", "POSTCODE", "CITY", "STATE"]
    // ["BUILDING_NAME", "LOT_NUM", "STREET_TYPE", "STREET_NAME", "SECTION_NAME", "POSTAL_CODE", "CITY_NAME", "STATE_NAME"]
    // ["ADDR_BLDG_NAME", "ADDR_FLOOR_LEVEL", "ADDR_LOT_APT_NO", "ADDR_STREET_TYPE", "ADDR_STREET_NAME", "ADDR_SECTION", "ADDR_POSTAL", "ADDR_CITY", "STATE"],
    // ["BuildingName", "Floor", "Unit Number", "Street Type", "Street Name", "Section", "City", "State"]
    ['ADDRESS_1', 'ADDRESS_2', 'ADDRESS_3', 'POST_CODE', 'CUST_CITY', 'CUST_STATE'],
    // ['ADDRESS_1', 'ADDRESS_2', 'ADDRESS_3', 'POST_CODE', 'CUST_CITY'],
    // ['TI_CUST_UNIT_NUM', 'TI_CUST_BUILDING_NAME', 'TI_CUST_STREET_TYPE', 'TI_CUST_STREET_NAME', 'TI_CUST_SECTION', 'TI_CUST_POSTAL_CODE', 'TI_CUST_CITY', 'TI_CUST_STATE']
    // ['ADDR_LOT_APT_NO', 'ADDR_BLDG_NAME', 'ADDR_STREET_TYPE', 'ADDR_STREET_NAME', 'ADDR_SECTION', 'ADDR_POSTAL', 'ADDR_CITY', 'STATE'],
  ];
  // for(var i=0; i<9; i++){
  //   arrAddressFields.push(arrAddressFields[0])
  // }

  // var arrAddressFields = [["HSE_NUM", "FLR_LVL", "BUILDING_NAME", "STREET_TYPE", "STREET_NAME", "SECTION_NAME", "POSTAL_CODE", "CITY_NAME", "STATE_CODE"]]


  if (proceed) {
    const res = getAllFilesFromFolder(dirPath);
    console.log(`results [${res.length}]:`, res);

    for (let i = 0; i < res.length; i++) {
      const splitted = splitDirFile(res[i]);
      console.log(`results [${i}]:`);
      if (!filesystem.existsSync(`${splitted[0]}/Geocoded`)) {
        filesystem.mkdirSync(`${splitted[0]}/Geocoded`);
      }
      console.log('dir:', splitted[0]);
      console.log('file:', splitted[1]);
      let outputTarget = '';
      if (concat) {
        outputTarget = splitted[0] + concatStr + splitted[1] + extension;
        console.log('outputTarget:', outputTarget);
        const arrConcat = GdsGeocoding.Concatenator.concatAddress(outputTarget, arrAddressFields[i], ',', addressColName);
        outputTarget = splitted[0] + concatStr + splitted[1] + concatenated + extension;
        console.log('concatinated outputTarget:', outputTarget);
        GdsGeocoding.Export.toCSV(arrConcat, outputTarget);

        while (!filesystem.existsSync(outputTarget)) {
          console.log('Waiting for the concatenated file...');
          Npm.require('deasync').sleep(500);
        }
      }
      /*
      for (let time = 3; time >= 1; time -= 1) {
        console.log('Resuming in: ', time);
        Npm.require('deasync').sleep(1000);
      }
      */
      // if(i>0) arrAddressColName = ["newaddress"]
      const arrAddress = GdsGeocoding.Extractor.extractCsv(outputTarget, arrAddressColName);
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
};
console.time('Elapsed time: ');
startGeocode();
// startTokenize('Address', 'tokenized_')
console.timeEnd('Elapsed time: ');
