const express = require('express');
const app = express();
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.use(express.static("public"));


var request = require('request');
var n =1000;
setInterval(()=>{
  request.get('https://www.cyclingdeal.com.au/export/rae/eBayDescription.csv', function (error, response, body) {
  if (!error && response.statusCode == 200) {

    var oldcsv = body;
    var allTextLines = oldcsv.split(/\r\n|\n/);
    var csv = [];

    for (var i = 1; i < allTextLines.length; i++) {
      // for (var i=1; i<12; i++) {

      if(!Boolean(allTextLines[i])){
        break;
      }
      
      var newData = [];
      var data = allTextLines[i].split(`","`);
      newData[0] = data[0].slice(1);
      newData[1] = data[1].slice(0, -1);
  

   
      newData[1] = newData[1].replace(/\"\"/g, "'");
      
      newData[2] = newData[1];
      // 1:find youtube VIDEO ID
      var prefix = "https://www.youtube.com/embed/";
      var res = newData[1].match(/(\<iframe)+.+(https:\/\/www.youtube.com\/embed\/)+\w{11}/);
     
     

        csv.push({ sku: newData[0], newdescription: newData[1],blank:'' })

   
 





    }

    // var pathName ="out"+n+".csv";
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: "./public/out.csv",
      header: [
        { id: 'sku', title: 'SKU' },
        // { id: 'description', title: 'oldDescription' },
        { id: 'newdescription', title: 'Ebay Description' },
        { id: 'blank', title: 'blank' }
      ]
    });



    csvWriter
      .writeRecords(csv)
      .then(() => console.log('The CSV file was written successfully'));
  }
});
},10000)
var port = 3002;
app.listen(port,()=>{
  console.log("This server is running on port"+port);
})