const express = require('express');
const app = express();
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.use(express.static("public"));


var request = require('request');
var n =1000*60*15;
setInterval(()=>{
  request.get('https://www.cyclingdeal.com.au/export/rae/eBayDescription.csv', function (error, response, body) {
  // request.get('./public/U-YC-100BH.csv', function (error, response, body) {

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

      if(newData[0]=='YC-100BH'){
        
        console.log(newData[1])
      }
      // newData[1] = 'Dimension:4.3" is a nice size';
      // newData[1] = newData[1].replace(/([\s|(|:|x]\d+(\.\d{1})?)'{1}/g, /$1@#/);
      // console.log(newData[1])
      // newData[1] = newData[1].replace(/\"\"/g, "'");
      
      newData[2] = newData[1];
      // 1:find youtube VIDEO ID
      var prefix = "https://www.youtube.com/embed/";
      var res = newData[1].match(/(https:\/\/www.youtube.com\/embed\/)+\w{11}/);

      // var res = newData[1].match(/(\<iframe)+.+(https:\/\/www.youtube.com\/embed\/)+\w{11}/);
      if(newData[0]=='YC-100BH'){
        console.log(res[0])
      }
      if (res != null) {
        // console.log(i,res[0]);
      
  
        var youtubeID = res[0].slice(-11);

        var plugin = `<div class="ytvideo"><a target="_blank" href="https://www.youtube.com/embed/${youtubeID}?rel=0"> <img src="https://img.youtube.com/vi/${youtubeID}/0.jpg"></a><p class="yt_ft">Video will open in a new window<br>Using the eBay App? Paste link into a browser window:</p><span class="yt_tag" style="display:none">[isdntekvideo]</span><input class="yt_inp" type="text" value="https://www.youtube.com/embed/${youtubeID}?rel=0"></div><style> .ytvideo * { box-sizing:border-box; } .ytvideo { margin:.5em auto 40px auto; max-width:480px; font-family:arial; text-align:center; position:relative; min-height:120px; background-color:#555; } .ytvideo p { position:absolute; margin:0; color:white; background-color:rgba(0,0,0,.5); } .ytvideo .yt_hd { font-size:16px; width:100%; height:28px; line-height:28px; text-align:left; top:0; left:0; padding-left:10px; overflow:hidden; } .ytvideo .yt_ft { font-size:12px; width:100%; bottom:0; left:0; } .ytvideo img { display:block; max-width:100%; border:0; } .ytvideo a:after { content:"\\A0\\25BA"; position:absolute; width:60px; height:50px; left:0; top:0; right:0; bottom:0; margin:auto; border:0; border-radius:10px; color:white; background:rgba(0,0,0,.6); font-size:24px; line-height:50px; cursor:pointer; } .ytvideo a:hover:after { background:#CC181E; } .ytvideo .yt_inp { position:absolute; top:100%; left:0; width:100%; text-align:center; padding:.5em .2em; xfont-size:18px; border:0; color:white; background: rgba(0,0,0,.7); } @media(max-device-width:960px){ .ytvideo { margin-bottom:60px; } .ytvideo .yt_inp { padding:1em .2em; } } </style>`;

        newData[1] = newData[1].replace(/(\<iframe).+(<\/iframe>)/g, '');
 
        // insert video in the beginning
        newData[1] = plugin + newData[1];
       newData[1] = newData[1].replace(/height: 600px;/g,'')
      // newData[1] = newData[1].replace(/\'/g, '"');

       
        csv.push({ sku: newData[0], newdescription: newData[1],blank:'' })

      }else{
      // newData[1] = newData[1].replace(/\'/g, '"');

        csv.push({ sku: newData[0], newdescription: newData[1],blank:'' })

      }
 





    }

    // var pathName ="out"+n+".csv";
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: "./public/ebay.csv",
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
},1000)

app.listen(3001)