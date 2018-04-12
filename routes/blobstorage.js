
const path = require('path');
const args = require('yargs').argv;
const storage = require('azure-storage');
const jsonpath = require('jsonpath');

const blobService = storage.createBlobService();
const containerName = 'allshipment';
const sourceFilePath = path.resolve('./example.txt');
const blobName = '0313fcaf-b590-4e7a-b18d-6e18ddbba262.json';


function StorageList() {
    
}

module.exports = StorageList;

StorageList.prototype = {
 downloadBlob: function() {
     const dowloadFilePath = sourceFilePath.replace('.txt', '.downloaded.json');
     return new Promise((resolve, reject) => {
         blobService.getBlobToLocalFile(containerName, blobName, dowloadFilePath, err => {
             if (err) {
                 reject(err);
             } else {
                 resolve({ message: `Download of '${blobName}' complete` });
             }
         });
     });
    },
 findJSONPath: function (req, res) {
     var payload = require("./example.downloaded.json");
     res1 = jsonPath.query(payload, "$.ShipmentPackage[?(@.Type=='Shipment')].Quantity[?@(.PackageType=='Pallet')].Amount");
     console.log(res1);
     res.render('index', {        
         payloadvalues: res1
     });
 }
 };